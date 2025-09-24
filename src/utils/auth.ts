import CryptoJS from 'crypto-js';

/**
 * Utilitário para autenticação segura do administrador
 * Usa hash SHA-256 com salt para proteger a senha
 */

// Função para gerar hash de uma senha
export function generatePasswordHash(password: string, salt: string = ''): string {
  const saltedPassword = password + salt;
  return CryptoJS.SHA256(saltedPassword).toString();
}

// Função para verificar se a senha está correta
export function verifyAdminPassword(inputPassword: string): boolean {
  try {
    // Obter hash e salt das variáveis de ambiente
    const storedHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH;
    const salt = import.meta.env.VITE_ADMIN_SALT || '';
    
    if (!storedHash) {
      console.error('Hash da senha do administrador não configurado');
      return false;
    }
    
    // Gerar hash da senha fornecida
    const inputHash = generatePasswordHash(inputPassword, salt);
    
    // Comparar hashes de forma segura (timing-safe)
    return CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(inputHash)) === 
           CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(storedHash));
  } catch (error) {
    console.error('Erro na verificação da senha:', error);
    return false;
  }
}

// Função para gerar uma nova senha hash (usar apenas para configuração inicial)
export function generateNewPasswordHash(password: string, salt?: string): {
  hash: string;
  salt: string;
  envConfig: string;
} {
  const usedSalt = salt || CryptoJS.lib.WordArray.random(32).toString();
  const hash = generatePasswordHash(password, usedSalt);
  
  const envConfig = `
# Configurações de Segurança - SOFLIX
# NUNCA commite este arquivo para o repositório!

# Hash da senha do administrador (gerado com SHA-256)
VITE_ADMIN_PASSWORD_HASH=${hash}

# Salt para aumentar a segurança
VITE_ADMIN_SALT=${usedSalt}
`;

  return {
    hash,
    salt: usedSalt,
    envConfig
  };
}

// Função para validar força da senha
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('A senha deve ter pelo menos 8 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra minúscula');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('A senha deve conter pelo menos um caractere especial');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
