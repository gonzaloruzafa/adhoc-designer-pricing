export interface Service {
  key: string;
  title: string;
  subtitle: string;
  category: string;
  base_min_ars: number;
  base_max_ars: number;
  qty_enabled: boolean;
  qty_step: number;
}

export interface Category {
  key: string;
  label: string;
  emoji: string;
}

export interface MultiplierOption {
  label: string;
  value: number;
}

export interface Multipliers {
  clientType: Record<string, MultiplierOption>;
  backAndForth: Record<string, MultiplierOption>;
  urgency: Record<string, MultiplierOption>;
}

export interface CatalogoData {
  services: Service[];
  categories: Category[];
  multipliers: Multipliers;
}

export interface SelectedItem {
  key: string;
  qty: number;
}

export interface CalculatedItem {
  key: string;
  title: string;
  subtitle: string;
  qty: number;
  min: number;
  max: number;
}

export interface QuoteSettings {
  clientType: string;
  backAndForth: string;
  urgency: string;
}

export interface QuoteResult {
  items: CalculatedItem[];
  totalMin: number;
  totalMax: number;
  settings: QuoteSettings;
  shareId?: string;
}

export interface Quote {
  id: string;
  created_at: string;
  device_id: string;
  email: string | null;
  client_type: string;
  back_and_forth: string;
  urgency: string;
  items: CalculatedItem[];
  total_min: number;
  total_max: number;
  share_slug: string;
}

export interface Lead {
  id: string;
  created_at: string;
  email: string;
  device_id: string;
  last_quote_id: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
}
