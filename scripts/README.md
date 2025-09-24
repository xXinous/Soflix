# Scripts Utilitários - SOFLIX

## generate-admin-password.cjs

Script para gerar hash seguro para senha do administrador.

### Uso

```bash
node scripts/generate-admin-password.cjs "SuaNovaSenh@123"
```

### Funcionalidades

- ✅ Gera hash SHA-256 com salt
- ✅ Valida força da senha
- ✅ Mostra configuração para .env
- ✅ Fornece instruções de segurança

### Exemplo de Saída

```
🔐 Gerando hash seguro para senha do administrador...

✅ Hash gerado com sucesso!

📋 Configuração para o arquivo .env:
──────────────────────────────────────────────────
VITE_ADMIN_PASSWORD_HASH=fa810b85e442db61121b2f5275a3d0f9c276e7ad599d7486da5246f006b5eea4
VITE_ADMIN_SALT=soflix_secure_salt_2024
──────────────────────────────────────────────────

⚠️  IMPORTANTE:
1. Copie as linhas acima para o arquivo .env
2. NUNCA commite o arquivo .env para o repositório
3. Mantenha a senha em local seguro
4. Reinicie o servidor de desenvolvimento após a alteração

🔒 A senha original não é armazenada em lugar nenhum do código!
```

### Critérios de Senha Forte

- Pelo menos 8 caracteres
- Pelo menos uma letra maiúscula (A-Z)
- Pelo menos uma letra minúscula (a-z)
- Pelo menos um número (0-9)
- Pelo menos um caractere especial (!@#$%^&*...)

### Segurança

- A senha original nunca é armazenada
- Hash irreversível SHA-256
- Salt para aumentar complexidade
- Validação de força da senha
