-- Schema para Analytics do SoFlix
-- Execute este SQL no editor SQL do Supabase

-- Tabela principal de analytics
CREATE TABLE IF NOT EXISTS analytics (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_ip INET NOT NULL,
  user_agent TEXT,
  device_type TEXT,
  browser_name TEXT,
  operating_system TEXT,
  country TEXT,
  city TEXT,
  timezone TEXT,
  cf_ray TEXT,
  referrer TEXT,
  page_url TEXT,
  user_type TEXT DEFAULT 'visitor',
  page_views INTEGER DEFAULT 1,
  session_duration INTEGER DEFAULT 0, -- em segundos
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_user_ip ON analytics(user_ip);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_user_type ON analytics(user_type);
CREATE INDEX IF NOT EXISTS idx_analytics_country ON analytics(country);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_analytics_updated_at ON analytics;
CREATE TRIGGER update_analytics_updated_at
    BEFORE UPDATE ON analytics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- View para estatísticas resumidas
CREATE OR REPLACE VIEW analytics_summary AS
SELECT 
  DATE(timestamp) as date,
  COUNT(*) as total_visits,
  COUNT(DISTINCT user_ip) as unique_visitors,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(CASE WHEN user_type = 'visitor' THEN 1 END) as visitor_count,
  COUNT(CASE WHEN user_type = 'sofia' THEN 1 END) as sofia_count,
  COUNT(CASE WHEN user_type = 'marcelo' THEN 1 END) as marcelo_count,
  COUNT(CASE WHEN device_type = 'mobile' THEN 1 END) as mobile_count,
  COUNT(CASE WHEN device_type = 'desktop' THEN 1 END) as desktop_count,
  COUNT(CASE WHEN device_type = 'tablet' THEN 1 END) as tablet_count,
  COUNT(DISTINCT country) as countries_count,
  AVG(session_duration) as avg_session_duration
FROM analytics
GROUP BY DATE(timestamp)
ORDER BY date DESC;

-- View para top países
CREATE OR REPLACE VIEW top_countries AS
SELECT 
  country,
  COUNT(*) as visits,
  COUNT(DISTINCT user_ip) as unique_visitors,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM analytics
WHERE country IS NOT NULL AND country != 'Unknown'
GROUP BY country
ORDER BY visits DESC;

-- View para top dispositivos
CREATE OR REPLACE VIEW top_devices AS
SELECT 
  device_type,
  browser_name,
  operating_system,
  COUNT(*) as visits,
  COUNT(DISTINCT user_ip) as unique_visitors,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM analytics
GROUP BY device_type, browser_name, operating_system
ORDER BY visits DESC;

-- View para usuários recentes
CREATE OR REPLACE VIEW recent_users AS
SELECT 
  user_ip,
  user_type,
  device_type,
  browser_name,
  country,
  city,
  MAX(timestamp) as last_visit,
  COUNT(*) as total_visits,
  COUNT(DISTINCT session_id) as unique_sessions
FROM analytics
GROUP BY user_ip, user_type, device_type, browser_name, country, city
ORDER BY last_visit DESC;

-- Função para limpar dados antigos (manter apenas últimos 90 dias)
CREATE OR REPLACE FUNCTION cleanup_old_analytics()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM analytics 
  WHERE timestamp < NOW() - INTERVAL '90 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Política RLS (Row Level Security) - desabilitada para permitir acesso do worker
ALTER TABLE analytics DISABLE ROW LEVEL SECURITY;

-- Comentários para documentação
COMMENT ON TABLE analytics IS 'Tabela principal para armazenar dados de analytics dos usuários do SoFlix';
COMMENT ON COLUMN analytics.session_id IS 'ID único da sessão do usuário';
COMMENT ON COLUMN analytics.user_ip IS 'Endereço IP do usuário (anonimizado)';
COMMENT ON COLUMN analytics.user_type IS 'Tipo de usuário: visitor, sofia, marcelo';
COMMENT ON COLUMN analytics.device_type IS 'Tipo de dispositivo: mobile, desktop, tablet';
COMMENT ON COLUMN analytics.country IS 'País do usuário (via Cloudflare)';
COMMENT ON COLUMN analytics.cf_ray IS 'CF-Ray ID do Cloudflare para rastreamento';

-- Inserir dados de exemplo (opcional)
-- INSERT INTO analytics (session_id, user_ip, user_type, device_type, browser_name, operating_system, country) VALUES
-- ('demo_001', '192.168.1.100', 'visitor', 'desktop', 'Chrome', 'Windows', 'Brazil'),
-- ('demo_002', '192.168.1.101', 'sofia', 'mobile', 'Safari', 'iOS', 'Brazil'),
-- ('demo_003', '192.168.1.102', 'marcelo', 'desktop', 'Firefox', 'Linux', 'Brazil');
