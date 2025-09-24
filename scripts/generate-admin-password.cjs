#!/usr/bin/env node

/**
 * Script para gerar hash seguro para senha do administrador
 * Uso: node scripts/generate-admin-password.js [nova_senha]
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function generatePasswordHash(password, salt = 'soflix_secure_salt_2024') {
  return crypto.createHash('sha256').update(password + salt).digest('hex');
}

function validatePasswordStrength(password) {
  const errors = [];
  
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

function main() {
  const newPassword = process.argv[2];
  
  if (!newPassword) {
    console.log('❌ Uso: node scripts/generate-admin-password.js [nova_senha]');
    console.log('');
    console.log('Exemplo: node scripts/generate-admin-password.js "MinhaSenh@123"');
    process.exit(1);
  }
  
  console.log('🔐 Gerando hash seguro para senha do administrador...\n');
  
  // Validar força da senha
  const validation = validatePasswordStrength(newPassword);
  if (!validation.isValid) {
    console.log('⚠️  Aviso: A senha não atende aos critérios de segurança:');
    validation.errors.forEach(error => console.log(`   - ${error}`));
    console.log('');
    console.log('Recomendamos usar uma senha mais forte, mas continuando...\n');
  }
  
  const salt = 'soflix_secure_salt_2024';
  const hash = generatePasswordHash(newPassword, salt);
  
  console.log('✅ Hash gerado com sucesso!');
  console.log('');
  console.log('📋 Configuração para o arquivo .env:');
  console.log('─'.repeat(50));
  console.log(`VITE_ADMIN_PASSWORD_HASH=${hash}`);
  console.log(`VITE_ADMIN_SALT=${salt}`);
  console.log('─'.repeat(50));
  console.log('');
  console.log('⚠️  IMPORTANTE:');
  console.log('1. Copie as linhas acima para o arquivo .env');
  console.log('2. NUNCA commite o arquivo .env para o repositório');
  console.log('3. Mantenha a senha em local seguro');
  console.log('4. Reinicie o servidor de desenvolvimento após a alteração');
  console.log('');
  console.log('🔒 A senha original não é armazenada em lugar nenhum do código!');
}

if (require.main === module) {
  main();
}

module.exports = { generatePasswordHash, validatePasswordStrength };
