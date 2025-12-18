-- Crear tabla de cotizaciones
CREATE TABLE IF NOT EXISTS quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  device_id UUID NOT NULL,
  email TEXT,
  client_type TEXT NOT NULL,
  back_and_forth TEXT NOT NULL,
  urgency TEXT NOT NULL,
  items JSONB NOT NULL,
  total_min INTEGER NOT NULL,
  total_max INTEGER NOT NULL,
  share_slug TEXT UNIQUE NOT NULL
);

-- Crear tabla de leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  device_id UUID NOT NULL,
  last_quote_id UUID REFERENCES quotes(id),
  utm_source TEXT,
  utm_campaign TEXT
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_quotes_share_slug ON quotes(share_slug);
CREATE INDEX IF NOT EXISTS idx_quotes_device_id ON quotes(device_id);
CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes(email);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_device_id ON leads(device_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Políticas para quotes: permitir insert anónimo y select público por share_slug
CREATE POLICY "Allow anonymous insert" ON quotes
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public select by share_slug" ON quotes
  FOR SELECT
  USING (true);

-- Políticas para leads: permitir insert/update anónimo
CREATE POLICY "Allow anonymous insert on leads" ON leads
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update on leads" ON leads
  FOR UPDATE
  USING (true);

-- Comentarios para documentación
COMMENT ON TABLE quotes IS 'Cotizaciones de diseño generadas por usuarios';
COMMENT ON TABLE leads IS 'Emails capturados para marketing';
COMMENT ON COLUMN quotes.items IS 'Array de items cotizados con key, title, qty, min, max';
COMMENT ON COLUMN quotes.share_slug IS 'Slug corto para compartir la cotización';
