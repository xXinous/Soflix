/**
 * Utilitário para autenticação segura do administrador
 * Implementa hash de senha e controle de sessão
 */

import { verifyPassword, generateSessionToken, isValidSessionToken } from './encryption';

// Hash da senha do administrador (gerado com hashPassword)
const ADMIN_PASSWORD_HASH = '017cceae9c03f09b0f307954e6feea0b88799a13e37497f867eae91a2c6eaa6c';

// Chave para armazenar sessão
const SESSION_KEY = 'soflix_admin_session';

interface AdminSession {
  token: string;
  timestamp: number;
  expiresAt: number;
  ipAddress: string;
  userAgent: string;
}

/**
 * Verifica se a senha do administrador está correta
 */
export async function verifyAdminPassword(inputPassword: string): Promise<boolean> {
  try {
    console.log('🔐 Tentativa de verificação de senha:', {
      timestamp: new Date().toISOString(),
      hasInput: !!inputPassword,
      inputType: typeof inputPassword,
      inputLength: inputPassword?.length
    });

    if (!inputPassword || typeof inputPassword !== 'string') {
      console.warn('❌ Entrada inválida para verificação de senha');
      return false;
    }

    // Sanitizar entrada
    const sanitizedPassword = inputPassword.trim();
    if (sanitizedPassword.length === 0) {
      console.warn('❌ Senha vazia após sanitização');
      return false;
    }

    // Verificar se o hash está configurado
    if (!ADMIN_PASSWORD_HASH || ADMIN_PASSWORD_HASH.length === 0) {
      console.error('❌ Hash da senha não está configurado');
      return false;
    }

    console.log('🔍 Verificando senha com hash:', {
      sanitizedPassword: sanitizedPassword,
      hashLength: ADMIN_PASSWORD_HASH.length,
      hashPrefix: ADMIN_PASSWORD_HASH.substring(0, 8) + '...'
    });

    // Verificar hash da senha
    const isValid = await verifyPassword(sanitizedPassword, ADMIN_PASSWORD_HASH);
    
    console.log('✅ Resultado da verificação:', {
      isValid,
      timestamp: new Date().toISOString()
    });

    return isValid;
  } catch (error) {
    console.error('❌ Erro na verificação de senha:', error);
    return false;
  }
}

/**
 * Cria uma sessão de administrador segura
 */
export function createAdminSession(ipAddress: string, userAgent: string): string {
  try {
    const token = generateSessionToken();
    const now = Date.now();
    const expiresAt = now + (2 * 60 * 60 * 1000); // 2 horas

    const session: AdminSession = {
      token,
      timestamp: now,
      expiresAt,
      ipAddress: ipAddress || 'unknown',
      userAgent: userAgent || 'unknown'
    };

    // Armazenar sessão criptografada
    const encryptedSession = btoa(JSON.stringify(session));
    localStorage.setItem(SESSION_KEY, encryptedSession);

    return token;
  } catch (error) {
    console.error('Erro ao criar sessão:', error);
    throw new Error('Falha ao criar sessão de administrador');
  }
}

/**
 * Verifica se a sessão do administrador é válida
 */
export function verifyAdminSession(): boolean {
  try {
    const encryptedSession = localStorage.getItem(SESSION_KEY);
    if (!encryptedSession) {
      return false;
    }

    const session: AdminSession = JSON.parse(atob(encryptedSession));
    
    // Verificar se o token é válido
    if (!isValidSessionToken(session.token)) {
      return false;
    }

    // Verificar se a sessão não expirou
    if (Date.now() > session.expiresAt) {
      clearAdminSession();
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro na verificação de sessão:', error);
    clearAdminSession();
    return false;
  }
}

/**
 * Obtém informações da sessão atual
 */
export function getAdminSession(): AdminSession | null {
  try {
    const encryptedSession = localStorage.getItem(SESSION_KEY);
    if (!encryptedSession) {
      return null;
    }

    const session: AdminSession = JSON.parse(atob(encryptedSession));
    
    // Verificar se a sessão é válida
    if (!verifyAdminSession()) {
      return null;
    }

    return session;
  } catch (error) {
    console.error('Erro ao obter sessão:', error);
    return null;
  }
}

/**
 * Limpa a sessão do administrador
 */
export function clearAdminSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Erro ao limpar sessão:', error);
  }
}

/**
 * Renova a sessão do administrador
 */
export function renewAdminSession(): boolean {
  try {
    const session = getAdminSession();
    if (!session) {
      return false;
    }

    // Criar nova sessão com os mesmos dados
    return createAdminSession(session.ipAddress, session.userAgent) !== null;
  } catch (error) {
    console.error('Erro ao renovar sessão:', error);
    return false;
  }
}

/**
 * Registra tentativa de login
 */
export async function logLoginAttempt(
  success: boolean, 
  ipAddress: string, 
  userAgent: string, 
  timestamp: string
): Promise<void> {
  try {
    const logData = {
      success,
      ipAddress: ipAddress || 'unknown',
      userAgent: userAgent || 'unknown',
      timestamp,
      type: 'admin_login_attempt'
    };

    // Armazenar log de segurança
    const existingLogs = JSON.parse(localStorage.getItem('soflix_security_logs') || '[]');
    existingLogs.push(logData);
    
    // Manter apenas os últimos 100 logs
    if (existingLogs.length > 100) {
      existingLogs.splice(0, existingLogs.length - 100);
    }
    
    localStorage.setItem('soflix_security_logs', JSON.stringify(existingLogs));
  } catch (error) {
    console.error('Erro ao registrar tentativa de login:', error);
  }
}

/**
 * Obtém logs de segurança
 */
export function getSecurityLogs(): any[] {
  try {
    return JSON.parse(localStorage.getItem('soflix_security_logs') || '[]');
  } catch (error) {
    console.error('Erro ao obter logs de segurança:', error);
    return [];
  }
}

/**
 * Limpa logs de segurança
 */
export function clearSecurityLogs(): void {
  try {
    localStorage.removeItem('soflix_security_logs');
  } catch (error) {
    console.error('Erro ao limpar logs de segurança:', error);
  }
}
