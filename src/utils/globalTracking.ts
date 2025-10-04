/**
 * Sistema de rastreamento global de usuários
 * Registra TODOS os acessos ao site, não apenas locais
 */

import { getDeviceInfo, getUserIP } from './deviceInfo';
import { storeVisit } from './secureStorage';
import { generateSessionToken } from './encryption';

interface GlobalAccess {
  sessionId: string;
  timestamp: string;
  userType: 'visitor' | 'sofia' | 'admin';
  userIP: string;
  deviceInfo: any;
  userAgent: string;
  location: string;
  referrer?: string;
  pageViews: number;
  sessionDuration?: number;
}

interface GlobalStats {
  totalAccesses: number;
  uniqueVisitors: number;
  sofiaAccesses: number;
  adminAccesses: number;
  visitorAccesses: number;
  todayAccesses: number;
  thisWeekAccesses: number;
  averageSessionDuration: number;
  topCountries: Array<{ country: string; count: number }>;
  topDevices: Array<{ device: string; count: number }>;
  lastUpdated: string;
}

/**
 * Registra acesso global de qualquer usuário
 */
export async function trackGlobalAccess(userType: 'visitor' | 'sofia' | 'admin' = 'visitor'): Promise<void> {
  try {
    const sessionId = generateSessionToken();
    const timestamp = new Date().toISOString();
    const userIP = await getUserIP();
    const deviceInfo = getDeviceInfo();
    const userAgent = navigator.userAgent;
    const location = window.location.href;
    const referrer = document.referrer || undefined;

    const globalAccess: GlobalAccess = {
      sessionId,
      timestamp,
      userType,
      userIP,
      deviceInfo,
      userAgent,
      location,
      referrer,
      pageViews: 1
    };

    // Armazenar no localStorage para acesso imediato
    await storeGlobalAccess(globalAccess);

    // Tentar sincronizar com Supabase se disponível
    await syncGlobalAccess(globalAccess);

    console.log('✅ Acesso global registrado:', {
      userType,
      timestamp,
      userIP: userIP.substring(0, 10) + '...'
    });
  } catch (error) {
    console.error('❌ Erro ao registrar acesso global:', error);
  }
}

/**
 * Armazena acesso global no localStorage
 */
async function storeGlobalAccess(access: GlobalAccess): Promise<void> {
  try {
    const existingAccesses = getGlobalAccesses();
    
    // Verificar se já existe uma sessão ativa
    const existingSession = existingAccesses.find(a => a.sessionId === access.sessionId);
    
    if (existingSession) {
      // Incrementar page views da sessão existente
      existingSession.pageViews++;
    } else {
      // Adicionar nova sessão
      existingAccesses.push(access);
    }

    // Manter apenas os últimos 1000 acessos para não sobrecarregar o localStorage
    if (existingAccesses.length > 1000) {
      existingAccesses.splice(0, existingAccesses.length - 1000);
    }

    localStorage.setItem('soflix_global_accesses', JSON.stringify(existingAccesses));
  } catch (error) {
    console.error('Erro ao armazenar acesso global:', error);
  }
}

/**
 * Obtém todos os acessos globais
 */
export function getGlobalAccesses(): GlobalAccess[] {
  try {
    const accesses = localStorage.getItem('soflix_global_accesses');
    return accesses ? JSON.parse(accesses) : [];
  } catch (error) {
    console.error('Erro ao obter acessos globais:', error);
    return [];
  }
}

/**
 * Sincroniza acesso global com Supabase
 */
async function syncGlobalAccess(access: GlobalAccess): Promise<void> {
  try {
    // Usar o sistema existente do Supabase
    const { shouldUseSupabase } = await import('./supabaseStorage');
    
    if (shouldUseSupabase()) {
      const { createClient } = await import('@jsr/supabase__supabase-js');
      const { STORAGE_CONFIG } = await import('@/constants');
      
      const supabase = createClient(STORAGE_CONFIG.SUPABASE_URL, STORAGE_CONFIG.SUPABASE_KEY);
      
      const { error } = await supabase
        .from('admin_data')
        .insert({
          data_type: 'global_access',
          visit_type: access.userType,
          data: access,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.warn('Erro ao sincronizar acesso global com Supabase:', error);
      }
    }
  } catch (error) {
    console.warn('Erro na sincronização global:', error);
  }
}

/**
 * Processa estatísticas globais
 */
export function processGlobalStats(): GlobalStats {
  try {
    const accesses = getGlobalAccesses();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todayAccesses = accesses.filter(a => new Date(a.timestamp) >= today).length;
    const thisWeekAccesses = accesses.filter(a => new Date(a.timestamp) >= thisWeek).length;

    // Contar tipos de usuário
    const sofiaAccesses = accesses.filter(a => a.userType === 'sofia').length;
    const adminAccesses = accesses.filter(a => a.userType === 'admin').length;
    const visitorAccesses = accesses.filter(a => a.userType === 'visitor').length;

    // Usuários únicos por IP
    const uniqueIPs = new Set(accesses.map(a => a.userIP));
    const uniqueVisitors = uniqueIPs.size;

    // Duração média de sessão
    const sessionsWithDuration = accesses.filter(a => a.sessionDuration);
    const averageSessionDuration = sessionsWithDuration.length > 0 
      ? sessionsWithDuration.reduce((sum, a) => sum + (a.sessionDuration || 0), 0) / sessionsWithDuration.length
      : 0;

    // Top países (simulado baseado em IP)
    const countryCounts: Record<string, number> = {};
    accesses.forEach(a => {
      const country = getCountryFromIP(a.userIP);
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });
    
    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top dispositivos
    const deviceCounts: Record<string, number> = {};
    accesses.forEach(a => {
      const device = a.deviceInfo?.deviceType || 'desktop';
      deviceCounts[device] = (deviceCounts[device] || 0) + 1;
    });
    
    const topDevices = Object.entries(deviceCounts)
      .map(([device, count]) => ({ device, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalAccesses: accesses.length,
      uniqueVisitors,
      sofiaAccesses,
      adminAccesses,
      visitorAccesses,
      todayAccesses,
      thisWeekAccesses,
      averageSessionDuration,
      topCountries,
      topDevices,
      lastUpdated: now.toISOString()
    };
  } catch (error) {
    console.error('Erro ao processar estatísticas globais:', error);
    return {
      totalAccesses: 0,
      uniqueVisitors: 0,
      sofiaAccesses: 0,
      adminAccesses: 0,
      visitorAccesses: 0,
      todayAccesses: 0,
      thisWeekAccesses: 0,
      averageSessionDuration: 0,
      topCountries: [],
      topDevices: [],
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Simula país baseado em IP (para demonstração)
 */
function getCountryFromIP(ip: string): string {
  // Simulação simples baseada nos primeiros números do IP
  const firstOctet = parseInt(ip.split('.')[0] || '0');
  
  if (firstOctet >= 1 && firstOctet <= 50) return 'Brasil';
  if (firstOctet >= 51 && firstOctet <= 100) return 'Estados Unidos';
  if (firstOctet >= 101 && firstOctet <= 150) return 'Europa';
  if (firstOctet >= 151 && firstOctet <= 200) return 'Ásia';
  
  return 'Outros';
}

/**
 * Limpa dados globais antigos (manter apenas últimos 30 dias)
 */
export function cleanupOldGlobalData(): void {
  try {
    const accesses = getGlobalAccesses();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const recentAccesses = accesses.filter(a => new Date(a.timestamp) >= thirtyDaysAgo);
    
    localStorage.setItem('soflix_global_accesses', JSON.stringify(recentAccesses));
    
    console.log('🧹 Dados globais antigos removidos:', {
      removidos: accesses.length - recentAccesses.length,
      mantidos: recentAccesses.length
    });
  } catch (error) {
    console.error('Erro ao limpar dados globais antigos:', error);
  }
}

/**
 * Inicializa rastreamento global na entrada do site
 */
export async function initializeGlobalTracking(): Promise<void> {
  try {
    // Registrar acesso de visitante inicial IMEDIATAMENTE
    await trackGlobalAccess('visitor');
    
    // Registrar acesso básico no sistema legado para compatibilidade
    await trackBasicAccess();
    
    // Limpar dados antigos
    cleanupOldGlobalData();
    
    console.log('🌍 Rastreamento global inicializado - TODOS os acessos serão registrados');
  } catch (error) {
    console.error('Erro ao inicializar rastreamento global:', error);
  }
}

/**
 * Registra acesso básico no sistema legado para compatibilidade com admin dashboard
 */
async function trackBasicAccess(): Promise<void> {
  try {
    const deviceInfo = await import('./deviceInfo').then(m => m.getDeviceInfo());
    const userIP = await import('./deviceInfo').then(m => m.getUserIP());
    const { generateSessionId } = await import('./encryption');
    const { storeVisit } = await import('./secureStorage');
    
    const sessionId = generateSessionId();
    const timestamp = new Date().toISOString();
    
    // Registrar como acesso de visitante no sistema legado
    await storeVisit({
      sessionId,
      timestamp,
      type: 'sofia_access', // Usar sofia_access para visitantes normais
      userIP,
      deviceInfo,
      userAgent: navigator.userAgent,
      location: window.location.href
    });
    
    console.log('✅ Acesso básico registrado para compatibilidade');
  } catch (error) {
    console.error('Erro ao registrar acesso básico:', error);
  }
}
