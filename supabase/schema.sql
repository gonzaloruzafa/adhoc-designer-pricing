-- Crear tabla de cotizaciones
CREATE TABLE IF NOT EXISTS "designer-pricing-quotes" (
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
CREATE TABLE IF NOT EXISTS "designer-pricing-leads" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  device_id UUID NOT NULL,
  last_quote_id UUID REFERENCES "designer-pricing-quotes"(id),
  utm_source TEXT,
  utm_campaign TEXT
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_designer_pricing_quotes_share_slug ON "designer-pricing-quotes"(share_slug);
CREATE INDEX IF NOT EXISTS idx_designer_pricing_quotes_device_id ON "designer-pricing-quotes"(device_id);
CREATE INDEX IF NOT EXISTS idx_designer_pricing_quotes_email ON "designer-pricing-quotes"(email);
CREATE INDEX IF NOT EXISTS idx_designer_pricing_leads_email ON "designer-pricing-leads"(email);
CREATE INDEX IF NOT EXISTS idx_designer_pricing_leads_device_id ON "designer-pricing-leads"(device_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE "designer-pricing-quotes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "designer-pricing-leads" ENABLE ROW LEVEL SECURITY;

-- Políticas para quotes: permitir insert anónimo y select público por share_slug
CREATE POLICY "Allow anonymous insert" ON "designer-pricing-quotes"
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public select by share_slug" ON "designer-pricing-quotes"
  FOR SELECT
  USING (true);

-- Políticas para leads: permitir insert/update anónimo
CREATE POLICY "Allow anonymous insert on leads" ON "designer-pricing-leads"
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update on leads" ON "designer-pricing-leads"
  FOR UPDATE
  USING (true);

-- Comentarios para documentación
COMMENT ON TABLE "designer-pricing-quotes" IS 'Cotizaciones de diseño generadas por usuarios';
COMMENT ON TABLE "designer-pricing-leads" IS 'Emails capturados para marketing';
COMMENT ON COLUMN "designer-pricing-quotes".items IS 'Array de items cotizados con key, title, qty, min, max';
COMMENT ON COLUMN "designer-pricing-quotes".share_slug IS 'Slug corto para compartir la cotización';
