# Multi-Language Implementation Guide

## Pendekatan yang Digunakan: Hybrid Approach

Website ini menggunakan **hybrid approach** untuk multi-language:

### Current Structure

```
src/pages/
├── index.astro              # Bahasa Indonesia (default) - /
├── services.astro           # ID - /services
├── about-us.astro           # ID - /about-us
├── cases.astro              # ID - /cases
├── contact-us.astro         # ID - /contact-us
├── show-case.astro          # ID - /show-case
└── [lang]/
    └── index.astro          # English - /en/
```

## Kenapa Tidak Perlu File Terpisah?

**JAWABAN: Bisa pakai 1 file saja!**

Astro mendukung dynamic routing dengan `[param]` syntax. Kita bisa refactor menjadi:

### Option 1: Dynamic Lang Parameter (Recommended untuk scale)

```astro
---
// src/pages/[lang]/[...slug].astro
export function getStaticPaths() {
  const pages = ['', 'services', 'about-us', 'cases', 'contact-us', 'show-case'];
  const langs = ['id', 'en'];
  
  return langs.flatMap(lang => 
    pages.map(page => ({
      params: { 
        lang: lang === 'id' ? undefined : lang,
        slug: page || undefined 
      }
    }))
  );
}

const { lang = 'id', slug = '' } = Astro.params;
const t = useTranslations(lang);

// Render based on slug
---
```

**Kelebihan:**
- ✅ 1 file untuk semua halaman dan bahasa
- ✅ Sangat DRY
- ✅ Mudah menambah bahasa baru
- ✅ Centralized logic

**Kekurangan:**
- ❌ Kompleks untuk konten yang sangat berbeda per halaman
- ❌ Perlu conditional rendering untuk setiap halaman
- ❌ Sulit debug jika ada error

### Option 2: Separate Files per Page (Current - Recommended untuk simplicity)

```
src/pages/
├── index.astro              # ID
├── services.astro           # ID
└── [lang]/
    ├── index.astro          # EN
    └── services.astro       # EN
```

**Kelebihan:**
- ✅ Sederhana dan jelas
- ✅ Mudah di-maintain
- ✅ Mudah debug
- ✅ Bisa customize per halaman jika perlu

**Kekurangan:**
- ❌ Duplikasi file (tapi konten tetap dari translations)
- ❌ Lebih banyak file

## Rekomendasi

### Untuk Project Kecil-Menengah (< 20 halaman):
**Gunakan Option 2** - Separate files per page
- Lebih mudah di-maintain
- Lebih jelas struktur nya
- Tidak terlalu banyak duplikasi karena konten dari translations

### Untuk Project Besar (> 20 halaman):
**Gunakan Option 1** - Dynamic routing
- Lebih scalable
- Menambah bahasa baru hanya perlu update 1 file
- Lebih DRY

## Cara Refactor ke Dynamic Routing (Jika Diperlukan)

1. Buat file `src/pages/[...slug].astro`
2. Implement `getStaticPaths()` untuk generate semua routes
3. Conditional rendering berdasarkan slug
4. Hapus file-file individual

Contoh lengkap ada di file ini di bawah.

---

## Example: Full Dynamic Implementation

```astro
---
// src/pages/[...slug].astro
import Layout from "../layouts/Layout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import { useTranslations } from '../i18n/translations';

export function getStaticPaths() {
  const routes = [
    { slug: undefined, component: 'home' },
    { slug: 'services', component: 'services' },
    { slug: 'about-us', component: 'about' },
    { slug: 'cases', component: 'cases' },
    { slug: 'contact-us', component: 'contact' },
  ];
  
  const langs = ['id', 'en'];
  
  return langs.flatMap(lang => 
    routes.map(route => {
      const path = lang === 'id' 
        ? (route.slug || '')
        : `en/${route.slug || ''}`;
      
      return {
        params: { slug: path || undefined },
        props: { lang, component: route.component }
      };
    })
  );
}

const { lang, component } = Astro.props;
const t = useTranslations(lang);
---

<Layout title={`ConsultIT - ${t('nav.home')}`}>
  <Header />
  <main class="flex-1">
    {component === 'home' && (
      <!-- Home content -->
    )}
    {component === 'services' && (
      <!-- Services content -->
    )}
    {component === 'about' && (
      <!-- About content -->
    )}
    <!-- etc -->
  </main>
  <Footer />
</Layout>
```

## Kesimpulan

**Current approach (separate files) sudah bagus** untuk project ini karena:
1. Mudah di-maintain
2. Jelas strukturnya
3. Tidak terlalu banyak halaman
4. Konten tetap centralized di translations file

Jika nanti project berkembang dan ada 50+ halaman, baru pertimbangkan refactor ke dynamic routing.
