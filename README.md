# ConsultIT - Astro.js Project

Proyek website IT Consulting yang dibangun dengan Astro.js dan Tailwind CSS.

## Struktur Proyek

```
/
├── src/
│   ├── components/
│   │   ├── Header.astro          # Navbar dengan navigasi & active state
│   │   ├── Footer.astro          # Footer dengan links
│   │   ├── Hero.astro            # Hero section dengan props
│   │   ├── ServiceAccordion.astro # Accordion untuk services
│   │   ├── FeatureCard.astro     # Card untuk features
│   │   └── CTA.astro             # Call-to-action section
│   ├── layouts/
│   │   └── Layout.astro          # Layout utama dengan head & styles
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── services.astro        # Halaman layanan
│   │   ├── about-us.astro        # Halaman tentang kami
│   │   ├── cases.astro           # Halaman case studies
│   │   ├── show-case.astro       # Detail case study
│   │   └── contact-us.astro      # Halaman kontak
│   └── styles/
│       └── global.css            # Global styles & Tailwind directives
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

## Komponen Reusable

### Header
- Navbar sticky dengan backdrop blur
- Active state untuk current page
- Responsive mobile menu

### Hero
Props: `title`, `description`, `imageUrl`, `imageAlt`

### ServiceAccordion
Props: `services` (array of service objects)
- Expandable accordion items
- Hover effects

### FeatureCard
Props: `icon`, `title`, `description`
- Material icons support
- Hover animations

### CTA
Props: `title`, `description`, `buttonText`, `buttonHref`

### Footer
- Multi-column layout
- Social media links

## Instalasi

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Multi-Language Support (i18n)

Website ini mendukung 2 bahasa:
- **Bahasa Indonesia** (default): `/` 
- **English**: `/en/`

### Pendekatan Implementasi

Ada 2 cara implementasi multi-bahasa di Astro:

#### 1. **File Terpisah** (Saat ini digunakan untuk halaman statis)
```
src/pages/
├── index.astro          # ID: /
├── services.astro       # ID: /services
└── [lang]/
    └── index.astro      # EN: /en/
```

**Kelebihan:**
- Sederhana untuk halaman statis
- Tidak perlu `getStaticPaths()`
- Mudah di-maintain untuk konten yang berbeda per bahasa

**Kekurangan:**
- Duplikasi file jika konten sama
- Lebih banyak file untuk di-maintain

#### 2. **Dynamic Routes** (Alternatif - 1 file untuk semua bahasa)
```
src/pages/
└── [...slug].astro      # Handles all routes
```

**Kelebihan:**
- 1 file untuk semua bahasa
- Tidak ada duplikasi kode
- Lebih DRY (Don't Repeat Yourself)

**Kekurangan:**
- Lebih kompleks dengan `getStaticPaths()`
- Semua konten harus di translations file

### Struktur Routing Saat Ini (Dynamic Routes)
- **ID**: `/id/`, `/id/services`, `/id/about-us`, `/id/cases`, `/id/contact-us`
- **EN**: `/en/`, `/en/services`, `/en/about-us`, `/en/cases`, `/en/contact-us`

Semua halaman menggunakan dynamic `[lang]` parameter dengan `getStaticPaths()` untuk generate routes untuk kedua bahasa.

### Menambah Terjemahan
Edit file `src/i18n/translations.ts` untuk menambah atau mengubah terjemahan.

### Menambah Bahasa Baru
1. Tambahkan bahasa di `src/i18n/translations.ts`
2. Tambahkan translations di object `ui`
3. Update `astro.config.mjs` locales array
4. Buat folder baru di `src/pages/[lang-code]/`
