# 🔒 Guia de Segurança - SOFLIX

## Sistema de Segurança Avançado

O SOFLIX implementa um sistema de segurança robusto com criptografia AES-256-GCM, controle de sessão e validação de dados para proteger informações sensíveis dos usuários.

### 🔑 Configurações Sensíveis

**Todas as configurações sensíveis estão no arquivo `.env`:**

```env
# Configurações do Supabase
VITE_SUPABASE_URL=https://vwiumednzppcianfuynd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_PROJECT_ID=vwiumednzppcianfuynd

# Senha do Administrador (hasheada com SHA-256)
VITE_ADMIN_PASSWORD=179598

# Chave de Criptografia para Dados Sensíveis (IMPORTANTE: Mude em produção!)
VITE_ENCRYPTION_KEY=soflix-secure-key-2024-change-in-production

# Configurações do Cloudflare
CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
CLOUDFLARE_ZONE_ID=your-cloudflare-zone-id
CLOUDFLARE_EMAIL=your-cloudflare-email

# Configurações de Desenvolvimento
VITE_DEV_MODE=true
```

### 📁 Estrutura de Arquivos de Segurança

```
Soflix/
├── .env                          # Variáveis de ambiente (NÃO COMMITAR)
├── .env.example                  # Template de configuração
├── .gitignore                    # Inclui .env para não commitar
├── src/utils/
│   ├── auth.ts                   # Autenticação e controle de sessão
│   ├── encryption.ts             # Criptografia AES-256-GCM
│   ├── secureStorage.ts          # Armazenamento seguro de dados
│   └── deviceInfo.tsx            # Coleta segura de informações
└── SECURITY.md                   # Esta documentação
```

### 🛡️ Medidas de Segurança Implementadas

#### 🔐 Criptografia e Proteção de Dados
1. **Criptografia AES-256-GCM**: Todos os dados sensíveis são criptografados
2. **Hash de Senhas**: Senhas armazenadas com SHA-256 + salt
3. **Validação de Integridade**: Verificação automática da integridade dos dados
4. **Sanitização de Entrada**: Prevenção contra XSS e injeção de código
5. **Validação de IP**: Verificação de endereços IP válidos

#### 🔑 Autenticação e Controle de Acesso
6. **Controle de Sessão**: Tokens seguros com expiração automática
7. **Logs de Segurança**: Registro de todas as tentativas de acesso
8. **Verificação de Sessão**: Validação contínua da autenticação
9. **Acesso Restrito**: Apenas usuários autorizados têm acesso ao painel

#### 🛡️ Armazenamento Seguro
10. **Dados Criptografados**: Informações sensíveis nunca em texto plano
11. **Migração Automática**: Conversão de dados legados para formato seguro
12. **Limpeza Segura**: Remoção completa de dados sensíveis
13. **Validação de Dados**: Verificação de integridade antes do armazenamento

#### 🔒 Configuração e Monitoramento
14. **Variáveis de Ambiente**: Todas as configurações sensíveis no `.env`
15. **Chave de Criptografia**: Configurável via `VITE_ENCRYPTION_KEY`
16. **Arquivo .env no .gitignore**: Configurações sensíveis não são commitadas
17. **Template .env.example**: Arquivo de exemplo para configuração
18. **Monitoramento em Tempo Real**: Indicadores de segurança no painel

### 🔍 Monitoramento de Segurança

O sistema registra automaticamente:
- **Tentativas de Login**: Sucesso e falha com timestamp
- **Informações do Dispositivo**: Tipo, SO, navegador (sanitizadas)
- **Endereço IP**: Validado e sanitizado
- **User Agent**: Sanitizado para prevenir XSS
- **Localização**: URL de acesso
- **Sessões Ativas**: Tokens e expiração
- **Integridade dos Dados**: Verificação contínua

**Acesse o painel admin para visualizar:**
- Logs de segurança em tempo real
- Status de integridade dos dados
- Indicadores de segurança
- Estatísticas de acesso

### 📝 Boas Práticas de Segurança

#### 🔐 Configuração e Manutenção
1. **Mantenha** todas as configurações sensíveis no `.env` em local seguro
2. **Nunca commite** o arquivo `.env` no repositório
3. **Use** o arquivo `.env.example` como template para novos ambientes
4. **Altere** a chave de criptografia em produção (`VITE_ENCRYPTION_KEY`)
5. **Rotacione** as chaves do Supabase e Cloudflare periodicamente
6. **Mantenha** as dependências atualizadas

#### 🔍 Monitoramento e Auditoria
7. **Monitore** os logs de acesso regularmente
8. **Verifique** a integridade dos dados periodicamente
9. **Teste** regularmente o sistema de autenticação
10. **Audite** tentativas de acesso suspeitas
11. **Monitore** o uso das APIs do Cloudflare

#### 🛡️ Proteção de Dados
12. **Backup** seguro das configurações e dados criptografados
13. **Use** tokens com permissões mínimas necessárias
14. **Valide** sempre os dados de entrada
15. **Sanitize** informações antes do armazenamento
16. **Implemente** limpeza automática de dados antigos

### 🆘 Suporte e Resolução de Problemas

#### Problemas de Acesso
1. **Senha Incorreta**: Verifique se a senha está correta: `179598`
2. **Sessão Expirada**: Faça logout e login novamente
3. **Dados Corrompidos**: Use a função de limpeza no painel admin
4. **Erro de Criptografia**: Verifique a chave `VITE_ENCRYPTION_KEY`

#### Verificações de Segurança
5. **Logs de Console**: Verifique erros no console do navegador
6. **Integridade dos Dados**: Monitore indicadores no painel admin
7. **Tentativas Suspeitas**: Revise logs de segurança
8. **Configuração**: Confirme variáveis de ambiente

#### Contatos de Emergência
- **Desenvolvedor**: Verifique logs de segurança no painel
- **Backup**: Dados criptografados podem ser restaurados
- **Reset**: Use função de limpeza para reiniciar dados

---

**⚠️ IMPORTANTE**: A segurança é responsabilidade de todos. Mantenha as credenciais seguras, monitore o acesso regularmente e reporte qualquer atividade suspeita imediatamente.