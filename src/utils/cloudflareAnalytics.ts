/**
 * Cliente para Analytics via Cloudflare Workers
 * Substitui o sistema de tracking local por uma solução mais robusta
 */

// URL do seu Cloudflare Worker (substitua pela sua URL)
const ANALYTICS_WORKER_URL = 'https://soflix-analytics.your-subdomain.workers.dev';

interface AnalyticsData {
  sessionId: string;
  timestamp: string;
  userType: 'visitor' | 'sofia' | 'marcelo';
  pageUrl: string;
  referrer?: string;
  pageViews?: number;
}

interface AnalyticsStats {
  totalVisits: number;
  uniqueIPs: number;
  uniqueDevices: number;
  countries: string[];
  userTypes: {
    visitor: number;
    sofia: number;
    marcelo: number;
  };
  recentVisits: any[];
  lastUpdated: string;
}

/**
 * Envia dados de analytics para o Cloudflare Worker
 */
export async function trackPageView(userType: 'visitor' | 'sofia' | 'marcelo' = 'visitor'): Promise<boolean> {
  try {
    // Gerar session ID único
    const sessionId = generateSessionId();
    
    const analyticsData: AnalyticsData = {
      sessionId,
      timestamp: new Date().toISOString(),
      userType,
      pageUrl: window.location.href,
      referrer: document.referrer || undefined,
      pageViews: 1
    };

    // Enviar para Cloudflare Worker
    const response = await fetch(`${ANALYTICS_WORKER_URL}/analytics?user_type=${userType}&url=${encodeURIComponent(window.location.href)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Analytics request failed: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Analytics data sent successfully');
      
      // Armazenar no localStorage como backup
      storeAnalyticsBackup(analyticsData);
      
      return true;
    } else {
      console.warn('⚠️ Analytics request failed:', result.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error sending analytics:', error);
    
    // Fallback: armazenar localmente
    const sessionId = generateSessionId();
    const analyticsData: AnalyticsData = {
      sessionId,
      timestamp: new Date().toISOString(),
      userType,
      pageUrl: window.location.href,
      referrer: document.referrer || undefined,
      pageViews: 1
    };
    
    storeAnalyticsBackup(analyticsData);
    return false;
  }
}

/**
 * Obtém estatísticas do Cloudflare Worker
 */
export async function getAnalyticsStats(): Promise<AnalyticsStats | null> {
  try {
    const response = await fetch(`${ANALYTICS_WORKER_URL}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Stats request failed: ${response.status}`);
    }

    const stats = await response.json();
    
    if (stats.error) {
      throw new Error(stats.error);
    }

    return {
      totalVisits: stats.total_visits,
      uniqueIPs: stats.unique_ips,
      uniqueDevices: stats.unique_devices,
      countries: stats.countries,
      userTypes: stats.user_types,
      recentVisits: stats.recent_visits,
      lastUpdated: stats.last_updated
    };
  } catch (error) {
    console.error('❌ Error getting analytics stats:', error);
    
    // Fallback: usar dados do localStorage
    return getAnalyticsBackup();
  }
}

/**
 * Gera um session ID único
 */
function generateSessionId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `cf_${timestamp}_${random}`;
}

/**
 * Armazena dados de analytics no localStorage como backup
 */
function storeAnalyticsBackup(data: AnalyticsData): void {
  try {
    const existingData = getAnalyticsBackupData();
    existingData.push(data);
    
    // Manter apenas os últimos 100 registros
    if (existingData.length > 100) {
      existingData.splice(0, existingData.length - 100);
    }
    
    localStorage.setItem('soflix_analytics_backup', JSON.stringify(existingData));
  } catch (error) {
    console.error('Error storing analytics backup:', error);
  }
}

/**
 * Obtém dados de backup do localStorage
 */
function getAnalyticsBackupData(): AnalyticsData[] {
  try {
    const data = localStorage.getItem('soflix_analytics_backup');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting analytics backup:', error);
    return [];
  }
}

/**
 * Obtém estatísticas do backup local
 */
function getAnalyticsBackup(): AnalyticsStats | null {
  try {
    const data = getAnalyticsBackupData();
    
    if (data.length === 0) {
      return null;
    }
    
    const uniqueIPs = new Set(data.map(d => d.sessionId)).size;
    const userTypes = {
      visitor: data.filter(d => d.userType === 'visitor').length,
      sofia: data.filter(d => d.userType === 'sofia').length,
      marcelo: data.filter(d => d.userType === 'marcelo').length
    };
    
    return {
      totalVisits: data.length,
      uniqueIPs,
      uniqueDevices: uniqueIPs, // Aproximação
      countries: ['Brazil'], // Aproximação
      userTypes,
      recentVisits: data.slice(-20),
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting analytics backup:', error);
    return null;
  }
}

/**
 * Inicializa o sistema de analytics
 */
export async function initializeAnalytics(): Promise<void> {
  try {
    // Registrar acesso inicial como visitante
    await trackPageView('visitor');
    
    console.log('🌍 Analytics system initialized with Cloudflare Workers');
  } catch (error) {
    console.error('Error initializing analytics:', error);
  }
}

/**
 * Atualiza o tipo de usuário para analytics
 */
export async function updateUserType(userType: 'visitor' | 'sofia' | 'marcelo'): Promise<void> {
  try {
    await trackPageView(userType);
    console.log(`👤 User type updated to: ${userType}`);
  } catch (error) {
    console.error('Error updating user type:', error);
  }
}

/**
 * Limpa dados de backup antigos
 */
export function cleanupAnalyticsBackup(): void {
  try {
    const data = getAnalyticsBackupData();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const recentData = data.filter(d => new Date(d.timestamp) >= thirtyDaysAgo);
    
    localStorage.setItem('soflix_analytics_backup', JSON.stringify(recentData));
    
    console.log('🧹 Analytics backup cleaned up:', {
      removed: data.length - recentData.length,
      kept: recentData.length
    });
  } catch (error) {
    console.error('Error cleaning up analytics backup:', error);
  }
}
