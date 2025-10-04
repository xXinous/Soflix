/**
 * Armazenamento centralizado usando Supabase
 * Substitui o localStorage para dados compartilhados entre usuários
 */

import { createClient } from '@jsr/supabase__supabase-js';
import { STORAGE_CONFIG } from '@/constants';

// Configurações do Supabase
const supabaseUrl = STORAGE_CONFIG.SUPABASE_URL;
const supabaseKey = STORAGE_CONFIG.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Configurações do Supabase não encontradas');
}

const supabase = createClient(supabaseUrl, supabaseKey);

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

interface AdminStats {
  totalVisits: number;
  sofiaVisits: number;
  adminVisits: number;
  todayVisits: number;
  thisWeekVisits: number;
  averagePerDay: number;
  uniqueDevices: number;
  uniqueIPs: number;
  lastUpdated: string;
}

/**
 * Armazena dados de visita no Supabase
 */
export async function storeVisitSupabase(visit: SecureVisit): Promise<void> {
  try {
    const { error } = await supabase
      .from('admin_data')
      .insert({
        data_type: 'visit',
        visit_type: visit.type,
        data: visit,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Erro ao armazenar visita no Supabase:', error);
      throw new Error('Falha ao armazenar dados no servidor');
    }
  } catch (error) {
    console.error('Erro ao armazenar visita:', error);
    throw new Error('Falha ao armazenar dados de visita');
  }
}

/**
 * Carrega visitas do Supabase
 */
export async function loadVisitsSupabase(type: 'sofia_access' | 'admin_access'): Promise<SecureVisit[]> {
  try {
    const { data, error } = await supabase
      .from('admin_data')
      .select('data')
      .eq('data_type', 'visit')
      .eq('visit_type', type)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Erro ao carregar visitas do Supabase:', error);
      return [];
    }

    return data?.map(item => item.data) || [];
  } catch (error) {
    console.error('Erro ao carregar visitas:', error);
    return [];
  }
}

/**
 * Processa estatísticas de usuários do Supabase
 */
export async function processUserStatsSupabase(): Promise<SecureUserStats[]> {
  try {
    const { data, error } = await supabase
      .from('admin_data')
      .select('data')
      .eq('data_type', 'visit')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Erro ao carregar dados para estatísticas:', error);
      return [];
    }

    const allVisits = data?.map(item => item.data) || [];
    const userMap = new Map<string, SecureUserStats>();

    allVisits.forEach((visit: SecureVisit) => {
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
 * Salva estatísticas calculadas no Supabase
 */
export async function saveAdminStatsSupabase(stats: AdminStats): Promise<void> {
  try {
    const { error } = await supabase
      .from('admin_data')
      .upsert({
        data_type: 'stats',
        data: stats,
        created_at: new Date().toISOString()
      }, {
        onConflict: 'data_type'
      });

    if (error) {
      console.error('Erro ao salvar estatísticas no Supabase:', error);
      throw new Error('Falha ao salvar estatísticas no servidor');
    }
  } catch (error) {
    console.error('Erro ao salvar estatísticas:', error);
    throw new Error('Falha ao salvar estatísticas');
  }
}

/**
 * Carrega estatísticas do Supabase
 */
export async function loadAdminStatsSupabase(): Promise<AdminStats | null> {
  try {
    const { data, error } = await supabase
      .from('admin_data')
      .select('data')
      .eq('data_type', 'stats')
      .single();

    if (error) {
      console.error('Erro ao carregar estatísticas do Supabase:', error);
      return null;
    }

    return data?.data || null;
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error);
    return null;
  }
}

/**
 * Migra dados do localStorage para o Supabase
 */
export async function migrateToSupabase(): Promise<void> {
  try {
    // Carregar dados do localStorage
    const sofiaVisits = await loadVisitsFromLocalStorage('sofia_access');
    const adminVisits = await loadVisitsFromLocalStorage('admin_access');

    // Migrar visitas da Sofia
    for (const visit of sofiaVisits) {
      await storeVisitSupabase(visit);
    }

    // Migrar visitas do Admin
    for (const visit of adminVisits) {
      await storeVisitSupabase(visit);
    }

    console.log('Migração para Supabase concluída:', {
      sofiaVisits: sofiaVisits.length,
      adminVisits: adminVisits.length
    });
  } catch (error) {
    console.error('Erro na migração para Supabase:', error);
    throw new Error('Falha na migração de dados');
  }
}

/**
 * Carrega visitas do localStorage (função auxiliar para migração)
 */
async function loadVisitsFromLocalStorage(type: 'sofia_access' | 'admin_access'): Promise<SecureVisit[]> {
  try {
    const storageKey = type === 'sofia_access' ? 'soflix_sofia_visits_secure' : 'soflix_admin_visits_secure';
    const encryptedData = localStorage.getItem(storageKey);
    
    if (!encryptedData) {
      return [];
    }

    // Tentar descriptografar dados
    const { decryptData } = await import('./encryption');
    const decryptedData = await decryptData(encryptedData);
    return Array.isArray(decryptedData) ? decryptedData : [];
  } catch (error) {
    console.error('Erro ao carregar dados do localStorage:', error);
    return [];
  }
}

/**
 * Limpa dados do Supabase
 */
export async function clearSupabaseData(): Promise<void> {
  try {
    const { error } = await supabase
      .from('admin_data')
      .delete()
      .neq('id', 0); // Deleta todos os registros

    if (error) {
      console.error('Erro ao limpar dados do Supabase:', error);
      throw new Error('Falha ao limpar dados do servidor');
    }
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    throw new Error('Falha ao limpar dados');
  }
}

/**
 * Verifica se deve usar Supabase ou localStorage
 */
export function shouldUseSupabase(): boolean {
  return STORAGE_CONFIG.USE_SUPABASE;
}

/**
 * Sincroniza dados entre localStorage e Supabase
 */
export async function syncDataWithSupabase(): Promise<void> {
  if (!shouldUseSupabase()) {
    console.warn('Supabase não configurado, usando localStorage');
    return;
  }

  try {
    // Verificar se já existe dados no Supabase
    const { data: existingData } = await supabase
      .from('admin_data')
      .select('id')
      .limit(1);

    // Se não há dados no Supabase, migrar do localStorage
    if (!existingData || existingData.length === 0) {
      await migrateToSupabase();
    }
  } catch (error) {
    console.error('Erro na sincronização:', error);
    throw new Error('Falha na sincronização de dados');
  }
}
