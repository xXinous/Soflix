/**
 * Cloudflare Worker para Analytics do SoFlix
 * Coleta dados de usuários e envia para Supabase
 */

// Configurações do Supabase (substitua pelos seus valores)
const SUPABASE_URL = 'https://vwiumednzppcianfuynd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3aXVtZWRuenBwY2lhbmZ1eW5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzQ5MzQsImV4cCI6MjA1MDU1MDkzNH0.TgZJYqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq';

// Função para obter informações do dispositivo e localização
function getDeviceInfo(request) {
  const userAgent = request.headers.get('User-Agent') || '';
  const cfRay = request.headers.get('CF-Ray') || '';
  const country = request.cf?.country || 'Unknown';
  const city = request.cf?.city || 'Unknown';
  const timezone = request.cf?.timezone || 'Unknown';
  
  // Detectar tipo de dispositivo
  let deviceType = 'desktop';
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
    deviceType = 'mobile';
  } else if (/Tablet|iPad/.test(userAgent)) {
    deviceType = 'tablet';
  }
  
  // Detectar navegador
  let browserName = 'Unknown';
  if (userAgent.includes('Chrome')) browserName = 'Chrome';
  else if (userAgent.includes('Firefox')) browserName = 'Firefox';
  else if (userAgent.includes('Safari')) browserName = 'Safari';
  else if (userAgent.includes('Edge')) browserName = 'Edge';
  
  // Detectar OS
  let os = 'Unknown';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS')) os = 'iOS';
  
  return {
    deviceType,
    browserName,
    os,
    country,
    city,
    timezone,
    userAgent,
    cfRay
  };
}

// Função para enviar dados para Supabase
async function sendToSupabase(data) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'apikey': SUPABASE_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`Supabase error: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error sending to Supabase:', error);
    return false;
  }
}

// Função principal do worker
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Rota para analytics
    if (url.pathname === '/analytics') {
      // Obter dados da requisição
      const clientIP = request.headers.get('CF-Connecting-IP') || 
                      request.headers.get('X-Forwarded-For') || 
                      'unknown';
      
      const deviceInfo = getDeviceInfo(request);
      const timestamp = new Date().toISOString();
      
      // Dados do analytics
      const analyticsData = {
        session_id: `cf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp,
        user_ip: clientIP,
        user_agent: deviceInfo.userAgent,
        device_type: deviceInfo.deviceType,
        browser_name: deviceInfo.browserName,
        operating_system: deviceInfo.os,
        country: deviceInfo.country,
        city: deviceInfo.city,
        timezone: deviceInfo.timezone,
        cf_ray: deviceInfo.cfRay,
        referrer: request.headers.get('Referer') || null,
        page_url: url.searchParams.get('url') || request.headers.get('Referer') || 'unknown',
        user_type: url.searchParams.get('user_type') || 'visitor',
        page_views: 1
      };
      
      // Enviar para Supabase
      const success = await sendToSupabase(analyticsData);
      
      if (success) {
        return new Response(JSON.stringify({ success: true, message: 'Analytics data saved' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
        });
      } else {
        return new Response(JSON.stringify({ success: false, message: 'Failed to save analytics' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 500
        });
      }
    }
    
    // Rota para obter estatísticas (para dashboard)
    if (url.pathname === '/stats') {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/analytics?select=*&order=timestamp.desc&limit=1000`, {
          headers: {
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'apikey': SUPABASE_KEY
          }
        });
        
        if (!response.ok) {
          throw new Error(`Supabase error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Processar estatísticas
        const stats = {
          total_visits: data.length,
          unique_ips: new Set(data.map(d => d.user_ip)).size,
          unique_devices: new Set(data.map(d => d.device_type)).size,
          countries: [...new Set(data.map(d => d.country))],
          user_types: {
            visitor: data.filter(d => d.user_type === 'visitor').length,
            sofia: data.filter(d => d.user_type === 'sofia').length,
            marcelo: data.filter(d => d.user_type === 'marcelo').length
          },
          recent_visits: data.slice(0, 50),
          last_updated: new Date().toISOString()
        };
        
        return new Response(JSON.stringify(stats), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          },
          status: 200
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          headers: { 'Content-Type': 'application/json' },
          status: 500
        });
      }
    }
    
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        status: 200
      });
    }
    
    // Rota não encontrada
    return new Response('Not Found', { status: 404 });
  }
};
