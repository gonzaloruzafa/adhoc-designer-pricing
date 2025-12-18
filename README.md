# ¿Cuánto cobrar? - Adhoc Designer Pricing

Una webapp mobile-first para diseñadoras argentinas que permite cotizar trabajos de diseño en segundos.

## 🚀 Features

- **Selección rápida**: Grid de tarjetas con tap para seleccionar servicios
- **Cantidades**: Botones +/- para packs de posts, banners, etc.
- **Ajustes simples**: Solo 3 controles (tipo de cliente, idas y vueltas, urgencia)
- **Precios en ARS**: Rangos orientativos con redondeo "humano"
- **Compartir**: WhatsApp, Web Share API, links únicos
- **Lead capture**: Email opcional para informe completo

## 📱 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (state management)
- **Supabase** (database)
- **Lucide React** (icons)

## 🛠️ Setup

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crear un proyecto en [Supabase](https://supabase.com)
2. Ejecutar el SQL de `supabase/schema.sql` en el SQL Editor
3. Copiar `.env.example` a `.env.local` y completar las variables:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

### 3. Correr en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 📊 Modelo de Precios

Los precios se calculan así:

```
precio_final = precio_base × multiplicador_cliente × multiplicador_idas_vueltas × multiplicador_urgencia
```

### Multiplicadores

| Factor | Opción | Multiplicador |
|--------|--------|--------------|
| Cliente | Particular | 0.85 |
| Cliente | PyME | 1.00 |
| Cliente | Grande | 1.35 |
| Idas y vueltas | Bajo | 0.95 |
| Idas y vueltas | Normal | 1.00 |
| Idas y vueltas | Alto | 1.25 |
| Urgencia | Normal | 1.00 |
| Urgencia | Express | 1.30 |

### Redondeo

- Hasta $50.000: redondea a $5.000
- Más de $50.000: redondea a $10.000

## 📁 Estructura

```
src/
├── app/
│   ├── page.tsx           # Página principal (cotizador)
│   ├── layout.tsx         # Layout global
│   ├── globals.css        # Estilos globales
│   └── q/[slug]/          # Página de cotización compartida
├── components/
│   ├── ServiceCard.tsx    # Tarjeta de servicio
│   ├── ChipSelector.tsx   # Selector de chips
│   ├── StickyCTA.tsx      # Botón sticky
│   ├── EmailModal.tsx     # Modal de email
│   ├── ResultTicket.tsx   # Ticket de resultado
│   ├── Recommendations.tsx # Tips para presupuesto
│   └── ShareButtons.tsx   # Botones de compartir
├── data/
│   └── catalogo.json      # Catálogo de servicios y precios
├── lib/
│   ├── pricing.ts         # Lógica de cálculo de precios
│   ├── supabase.ts        # Cliente Supabase
│   ├── db.ts              # Operaciones de base de datos
│   ├── device.ts          # Device ID y slugs
│   └── utils.ts           # Utilidades (cn, etc.)
├── store/
│   └── quote-store.ts     # Store Zustand
└── types/
    └── index.ts           # TypeScript types
```

## 🎨 Personalización

### Agregar/modificar servicios

Editar `src/data/catalogo.json`:

```json
{
  "key": "mi-servicio",
  "title": "Mi Servicio",
  "subtitle": "Descripción corta",
  "category": "identidad",
  "base_min_ars": 30000,
  "base_max_ars": 60000,
  "qty_enabled": true,
  "qty_step": 1
}
```

### Modificar multiplicadores

También en `catalogo.json`, sección `multipliers`.

## 📦 Deploy

### Vercel (recomendado)

1. Conectar el repo a Vercel
2. Agregar las variables de entorno de Supabase
3. Deploy automático

## 📝 License

MIT

---

Hecho con 💜 por [Adhoc](https://adhoc.ar)
