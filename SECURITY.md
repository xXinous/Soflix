# 🔒 Guia de Segurança - SOFLIX

## Autenticação do Administrador

O SOFLIX implementa um sistema de autenticação seguro para o painel de administrador que protege a senha usando hash SHA-256 com salt.

### ⚠️ IMPORTANTE: Segurança da Senha

**A senha do administrador NUNCA é armazenada em texto plano no código!**

- ✅ A senha é convertida em hash SHA-256 com salt
- ✅ O hash é armazenado em variáveis de ambiente
- ✅ O arquivo `.env` está no `.gitignore` e não é commitado
- ✅ A verificação usa comparação timing-safe

### 🔧 Como Configurar uma Nova Senha

#### Método 1: Usando o Script Automático (Recomendado)

```bash
# Gerar hash para uma nova senha
node scripts/generate-admin-password.cjs "SuaNovaSenh@123"
```

O script irá:
- Validar a força da senha
- Gerar o hash SHA-256 com salt
- Mostrar a configuração para o arquivo `.env`

#### Método 2: Manual

```bash
# Gerar hash manualmente
node -e "console.log(require('crypto').createHash('sha256').update('sua_senha_aqui' + 'soflix_secure_salt_2024').digest('hex'))"
```

### 📁 Estrutura de Arquivos de Segurança

```
Soflix.2/
├── .env                          # Variáveis de ambiente (NÃO COMMITAR)
├── .gitignore                    # Inclui .env para não commitar
├── src/utils/auth.ts             # Utilitários de autenticação
├── scripts/generate-admin-password.cjs  # Script para gerar senhas
└── SECURITY.md                   # Esta documentação
```

### 🔐 Arquivo .env

O arquivo `.env` deve conter:

```env
# Configurações de Segurança - SOFLIX
# NUNCA commite este arquivo para o repositório!

# Hash da senha do administrador (gerado com SHA-256)
VITE_ADMIN_PASSWORD_HASH=seu_hash_aqui

# Salt para aumentar a segurança
VITE_ADMIN_SALT=soflix_secure_salt_2024
```

### 🛡️ Medidas de Segurança Implementadas

1. **Hash SHA-256**: A senha é convertida em hash irreversível
2. **Salt**: Adiciona complexidade extra ao hash
3. **Variáveis de Ambiente**: Configuração separada do código
4. **Timing-Safe Comparison**: Previne ataques de timing
5. **Validação de Força**: Script valida critérios de senha forte
6. **Logs de Segurança**: Tentativas de acesso são registradas

### 📊 Critérios de Senha Forte

Uma senha segura deve conter:
- ✅ Pelo menos 8 caracteres
- ✅ Pelo menos uma letra maiúscula (A-Z)
- ✅ Pelo menos uma letra minúscula (a-z)
- ✅ Pelo menos um número (0-9)
- ✅ Pelo menos um caractere especial (!@#$%^&*...)

### 🚨 Procedimentos de Emergência

#### Se a Senha For Comprometida:

1. **Imediatamente** gere uma nova senha:
   ```bash
   node scripts/generate-admin-password.cjs "NovaSenh@SuperSegura123"
   ```

2. Atualize o arquivo `.env` com o novo hash

3. Reinicie o servidor de desenvolvimento

4. Verifique os logs de acesso no painel admin

#### Se o Arquivo .env For Comprometido:

1. Gere uma nova senha e salt
2. Atualize todas as instâncias do arquivo `.env`
3. Considere implementar rotação de salt

### 🔍 Monitoramento de Segurança

O sistema registra automaticamente:
- Tentativas de login (sucesso e falha)
- Informações do dispositivo
- Endereço IP
- Timestamp da tentativa
- User Agent

Acesse o painel admin para visualizar os logs de segurança.

### 📝 Boas Práticas

1. **Nunca** commite o arquivo `.env`
2. **Use** senhas fortes e únicas
3. **Altere** a senha periodicamente
4. **Monitore** os logs de acesso regularmente
5. **Mantenha** o salt em local seguro
6. **Backup** seguro das configurações

### 🆘 Suporte

Em caso de problemas de segurança:
1. Verifique se o arquivo `.env` existe e está configurado
2. Confirme que as variáveis `VITE_*` estão definidas
3. Reinicie o servidor após alterações
4. Verifique os logs do console para erros

---

**Lembre-se**: A segurança é responsabilidade de todos. Mantenha as credenciais seguras e monitore o acesso regularmente.
