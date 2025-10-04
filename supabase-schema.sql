-- Schema para armazenamento centralizado de dados do painel de administrador
-- Execute este script no Supabase SQL Editor

-- Criar tabela para dados do painel de administrador
CREATE TABLE IF NOT EXISTS admin_data (
  id BIGSERIAL PRIMARY KEY,
  data_type TEXT NOT NULL,
  visit_type TEXT,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_admin_data_type ON admin_data(data_type);
CREATE INDEX IF NOT EXISTS idx_admin_data_visit_type ON admin_data(visit_type);
CREATE INDEX IF NOT EXISTS idx_admin_data_created_at ON admin_data(created_at);

-- Criar índice único para estatísticas (apenas uma entrada por tipo)
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_data_stats_unique ON admin_data(data_type) WHERE data_type = 'stats';

-- Habilitar Row Level Security (RLS)
ALTER TABLE admin_data ENABLE ROW LEVEL SECURITY;

-- Política de segurança: permitir leitura e escrita para usuários autenticados
-- (Ajuste conforme necessário para seu caso de uso)
CREATE POLICY "Allow authenticated users to read admin data" ON admin_data
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert admin data" ON admin_data
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update admin data" ON admin_data
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete admin data" ON admin_data
  FOR DELETE USING (auth.role() = 'authenticated');

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_admin_data_updated_at 
  BEFORE UPDATE ON admin_data 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Comentários para documentação
COMMENT ON TABLE admin_data IS 'Armazena dados centralizados do painel de administrador do SOFLIX';
COMMENT ON COLUMN admin_data.data_type IS 'Tipo de dados: visit, stats, etc.';
COMMENT ON COLUMN admin_data.visit_type IS 'Tipo de visita: sofia_access, admin_access';
COMMENT ON COLUMN admin_data.data IS 'Dados JSON do evento ou estatística';
