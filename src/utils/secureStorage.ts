/**
 * Armazenamento seguro para dados sensíveis
 * Implementa criptografia e validação de dados
 * Usa Supabase para dados compartilhados quando disponível
 */

import { encryptData, decryptData, sanitizeInput, validateDeviceInfo, validateIP } from './encryption';
import { STORAGE_CONFIG } from '@/constants';
import { 
  storeVisitSupabase, 
  loadVisitsSupabase, 
  processUserStatsSupabase,
  saveAdminStatsSupabase,
  loadAdminStatsSupabase,
  shouldUseSupabase,
  syncDataWithSupabase
} from './supabaseStorage';

interface SecureVisit {
  sessionId: string;
  timestamp: string;
  type: 'sofia_access' | 'admin_access';
  userIP: string;
  deviceInfo: any;
  userAgent?: string;
  location?: string;
}

interface SecureUserStats {
  ip: string;
  deviceName: string;
  totalAccesses: number;
  firstAccess: string;
  lastAccess: string;
  visits: SecureVisit[];
}

/**
 * Armazena dados de visita de forma segura
 * Usa Supabase quando disponível para dados compartilhados
 */
export async function storeVisit(visit: SecureVisit): Promise<void> {
  try {
    // Validar dados de entrada
    if (!visit.sessionId || !visit.timestamp || !visit.userIP) {
      throw new Error('Dados de visita inválidos');
    }

    if (!validateIP(visit.userIP)) {
      throw new Error('Endereço IP inválido');
    }

    if (visit.deviceInfo && !validateDeviceInfo(visit.deviceInfo)) {
      throw new Error('Informações de dispositivo inválidas');
    }

    // Sanitizar dados
    const sanitizedVisit: SecureVisit = {
      ...visit,
      userIP: sanitizeInput(visit.userIP),
      deviceInfo: visit.deviceInfo ? {
        ...visit.deviceInfo,
        deviceName: sanitizeInput(visit.deviceInfo.deviceName || ''),
        os: sanitizeInput(visit.deviceInfo.os || ''),
        browserName: sanitizeInput(visit.deviceInfo.browserName || ''),
        browserVersion: sanitizeInput(visit.deviceInfo.browserVersion || ''),
        screenResolution: sanitizeInput(visit.deviceInfo.screenResolution || ''),
        language: sanitizeInput(visit.deviceInfo.language || ''),
        timezone: sanitizeInput(visit.deviceInfo.timezone || ''),
        deviceType: sanitizeInput(visit.deviceInfo.deviceType || 'desktop')
      } : undefined,
      userAgent: visit.userAgent ? sanitizeInput(visit.userAgent) : undefined,
      location: visit.location ? sanitizeInput(visit.location) : undefined
    };

    // Usar Supabase se disponível
    if (shouldUseSupabase()) {
      await storeVisitSupabase(sanitizedVisit);
      return;
    }

    // Fallback para localStorage
    const existingData = await loadVisits(visit.type);
    const updatedData = [...existingData, sanitizedVisit];

    // Criptografar e armazenar
    const encryptedData = await encryptData(updatedData);
    const storageKey = visit.type === 'sofia_access' ? 'soflix_sofia_visits_secure' : 'soflix_admin_visits_secure';
    
    localStorage.setItem(storageKey, encryptedData);
  } catch (error) {
    console.error('Erro ao armazenar visita:', error);
    throw new Error('Falha ao armazenar dados de visita');
  }
}

/**
 * Carrega dados de visitas de forma segura
 * Usa Supabase quando disponível para dados compartilhados
 */
export async function loadVisits(type: 'sofia_access' | 'admin_access'): Promise<SecureVisit[]> {
  try {
    // Usar Supabase se disponível
    if (shouldUseSupabase()) {
      return await loadVisitsSupabase(type);
    }

    // Fallback para localStorage
    const storageKey = type === 'sofia_access' ? 'soflix_sofia_visits_secure' : 'soflix_admin_visits_secure';
    const encryptedData = localStorage.getItem(storageKey);
    
    if (!encryptedData) {
      return [];
    }

    const decryptedData = await decryptData(encryptedData);
    return Array.isArray(decryptedData) ? decryptedData : [];
  } catch (error) {
    console.error('Erro ao carregar visitas:', error);
    // Em caso de erro, tentar carregar dados não criptografados (migração)
    return loadLegacyVisits(type);
  }
}

/**
 * Carrega dados legados (não criptografados) para migração
 */
function loadLegacyVisits(type: 'sofia_access' | 'admin_access'): SecureVisit[] {
  try {
    const legacyKey = type === 'sofia_access' ? 'soflix_sofia_visits' : 'soflix_admin_visits';
    const legacyData = localStorage.getItem(legacyKey);
    
    if (!legacyData) {
      return [];
    }

    const parsedData = JSON.parse(legacyData);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error('Erro ao carregar dados legados:', error);
    return [];
  }
}

/**
 * Processa estatísticas de usuários de forma segura
 * Usa Supabase quando disponível para dados compartilhados
 */
export async function processUserStats(): Promise<SecureUserStats[]> {
  try {
    // Usar Supabase se disponível
    if (shouldUseSupabase()) {
      return await processUserStatsSupabase();
    }

    // Fallback para localStorage
    const sofiaVisits = await loadVisits('sofia_access');
    const adminVisits = await loadVisits('admin_access');
    const allVisits = [...sofiaVisits, ...adminVisits];

    const userMap = new Map<string, SecureUserStats>();

    allVisits.forEach(visit => {
      const key = `${visit.userIP}-${visit.deviceInfo?.deviceName || 'Unknown'}`;
      
      if (!userMap.has(key)) {
        userMap.set(key, {
          ip: visit.userIP,
          deviceName: visit.deviceInfo?.deviceName || 'Dispositivo Desconhecido',
          totalAccesses: 0,
          firstAccess: visit.timestamp,
          lastAccess: visit.timestamp,
          visits: []
        });
      }

      const user = userMap.get(key)!;
      user.totalAccesses++;
      user.visits.push(visit);
      
      if (new Date(visit.timestamp) < new Date(user.firstAccess)) {
        user.firstAccess = visit.timestamp;
      }
      if (new Date(visit.timestamp) > new Date(user.lastAccess)) {
        user.lastAccess = visit.timestamp;
      }
    });

    return Array.from(userMap.values()).sort((a, b) => b.totalAccesses - a.totalAccesses);
  } catch (error) {
    console.error('Erro ao processar estatísticas:', error);
    return [];
  }
}

/**
 * Salva estatísticas calculadas
 */
export async function saveAdminStats(stats: any): Promise<void> {
  try {
    if (shouldUseSupabase()) {
      await saveAdminStatsSupabase(stats);
    } else {
      // Fallback para localStorage se necessário
      localStorage.setItem('soflix_admin_stats', JSON.stringify(stats));
    }
  } catch (error) {
    console.error('Erro ao salvar estatísticas:', error);
    throw new Error('Falha ao salvar estatísticas');
  }
}

/**
 * Carrega estatísticas calculadas
 */
export async function loadAdminStats(): Promise<any | null> {
  try {
    if (shouldUseSupabase()) {
      return await loadAdminStatsSupabase();
    } else {
      // Fallback para localStorage se necessário
      const stats = localStorage.getItem('soflix_admin_stats');
      return stats ? JSON.parse(stats) : null;
    }
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error);
    return null;
  }
}

/**
 * Sincroniza dados com Supabase
 */
export async function syncWithSupabase(): Promise<void> {
  try {
    if (shouldUseSupabase()) {
      await syncDataWithSupabase();
    }
  } catch (error) {
    console.error('Erro na sincronização:', error);
    throw new Error('Falha na sincronização de dados');
  }
}

/**
 * Limpa todos os dados de forma segura
 */
export async function clearAllData(): Promise<void> {
  try {
    if (shouldUseSupabase()) {
      const { clearSupabaseData } = await import('./supabaseStorage');
      await clearSupabaseData();
    } else {
      // Limpar dados criptografados
      localStorage.removeItem('soflix_sofia_visits_secure');
      localStorage.removeItem('soflix_admin_visits_secure');
      
      // Limpar dados legados
      localStorage.removeItem('soflix_sofia_visits');
      localStorage.removeItem('soflix_admin_visits');
      localStorage.removeItem('soflix_admin_stats');
    }
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    throw new Error('Falha ao limpar dados');
  }
}

/**
 * Migra dados legados para formato seguro
 */
export async function migrateLegacyData(): Promise<void> {
  try {
    const sofiaLegacy = loadLegacyVisits('sofia_access');
    const adminLegacy = loadLegacyVisits('admin_access');

    if (sofiaLegacy.length > 0) {
      const encryptedSofia = await encryptData(sofiaLegacy);
      localStorage.setItem('soflix_sofia_visits_secure', encryptedSofia);
    }

    if (adminLegacy.length > 0) {
      const encryptedAdmin = await encryptData(adminLegacy);
      localStorage.setItem('soflix_admin_visits_secure', encryptedAdmin);
    }

    // Remover dados legados após migração
    localStorage.removeItem('soflix_sofia_visits');
    localStorage.removeItem('soflix_admin_visits');
  } catch (error) {
    console.error('Erro na migração de dados:', error);
    throw new Error('Falha na migração de dados');
  }
}

/**
 * Verifica integridade dos dados
 */
export async function verifyDataIntegrity(): Promise<boolean> {
  try {
    const sofiaVisits = await loadVisits('sofia_access');
    const adminVisits = await loadVisits('admin_access');
    
    // Verificar se os dados são válidos
    const allVisits = [...sofiaVisits, ...adminVisits];
    
    for (const visit of allVisits) {
      if (!visit.sessionId || !visit.timestamp || !visit.userIP) {
        return false;
      }
      
      if (visit.deviceInfo && !validateDeviceInfo(visit.deviceInfo)) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Erro na verificação de integridade:', error);
    return false;
  }
}
