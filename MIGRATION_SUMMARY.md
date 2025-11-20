# Migration Summary: Dynamic Lang Routing

## ✅ Completed Migration

Semua halaman telah dipindahkan ke `src/pages/[lang]/` dan menggunakan dynamic routing.

### Struktur Baru

```
src/pages/
├── index.astro              # Redirect ke /id/
└── [lang]/
    ├── index.astro          # Homepage (ID & EN)
    ├── services.astro       # Services page (ID & EN)
    ├── about-us.astro       # About page (ID & EN)
    ├── cases.astro          # Cases page (ID & EN)
    ├── show-case.astro      # Case detail (ID & EN)
    └── contact-us.astro     # Contact page (ID & EN)
```

### Routing URLs

| Page | Indonesian | English |
|------|-----------|---------|
| Home | `/id/` | `/en/` |
| Services | `/id/services` | `/en/services` |
| About Us | `/id/about-us` | `/en/about-us` |
| Cases | `/id/cases` | `/en/cases` |
| Show Case | `/id/show-case` | `/en/show-case` |
| Contact | `/id/contact-us` | `/en/contact-us` |

### Perubahan Utama

#### 1. **Semua File di `[lang]` Folder**
Setiap file sekarang menggunakan dynamic `[lang]` parameter:

```astro
---
export function getStaticPaths() {
  return [
    { params: { lang: 'id' } },
    { params: { lang: 'en' } },
  ];
}

const { lang } = Astro.params;
const t = useTranslations(lang as 'id' | 'en');
---
```

#### 2. **Import Paths Updated**
Semua import sekarang menggunakan `../../` karena nested di `[lang]` folder:

```astro
import Layout from "../../layouts/Layout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
import { useTranslations } from '../../i18n/translations';
```

#### 3. **Astro Config Updated**
```js
i18n: {
  defaultLocale: 'id',
  locales: ['id', 'en'],
  routing: {
    prefixDefaultLocale: true, // Changed from false
  },
}
```

#### 4. **Header Component Updated**
```astro
const langPrefix = `/${lang}`; // Always prefix with lang
```

#### 5. **Language Switcher Updated**
```astro
href={`/${code}${pathWithoutLang}`} // Always include lang prefix
```

#### 6. **Root Redirect**
`src/pages/index.astro` redirects `/` to `/id/`

### Keuntungan Pendekatan Ini

✅ **Single Source of Truth**
- 1 file per halaman untuk semua bahasa
- Tidak ada duplikasi kode
- Mudah maintain

✅ **Scalable**
- Menambah bahasa baru hanya perlu update `getStaticPaths()`
- Tidak perlu copy file

✅ **Type Safe**
- TypeScript support dengan `lang as 'id' | 'en'`
- Compile-time checking

✅ **SEO Friendly**
- Clean URLs dengan lang prefix
- Easy untuk hreflang tags

### Cara Menambah Bahasa Baru

1. Update `src/i18n/translations.ts`:
```ts
export const languages = {
  id: 'Bahasa Indonesia',
  en: 'English',
  es: 'Español', // New language
};
```

2. Tambah translations di `ui` object

3. Update `astro.config.mjs`:
```js
locales: ['id', 'en', 'es'],
```

4. Update `getStaticPaths()` di setiap file:
```ts
export function getStaticPaths() {
  return [
    { params: { lang: 'id' } },
    { params: { lang: 'en' } },
    { params: { lang: 'es' } }, // New language
  ];
}
```

### Testing

Test semua routes:
- ✅ `/id/` - Homepage ID
- ✅ `/en/` - Homepage EN
- ✅ `/id/services` - Services ID
- ✅ `/en/services` - Services EN
- ✅ Language switcher works
- ✅ Navigation links work
- ✅ Root `/` redirects to `/id/`

### Next Steps (Optional)

1. **Centralize getStaticPaths**
   Buat helper function untuk avoid repetition:
   ```ts
   // src/utils/i18n.ts
   export function getI18nStaticPaths() {
     return [
       { params: { lang: 'id' } },
       { params: { lang: 'en' } },
     ];
   }
   ```

2. **Add hreflang tags**
   Untuk SEO, tambahkan di Layout:
   ```astro
   <link rel="alternate" hreflang="id" href={`/id${path}`} />
   <link rel="alternate" hreflang="en" href={`/en${path}`} />
   ```

3. **Add language detection**
   Redirect berdasarkan browser language di `index.astro`

## Kesimpulan

✅ Migration selesai!
✅ Semua halaman sekarang menggunakan dynamic routing
✅ 1 file per halaman untuk semua bahasa
✅ Lebih maintainable dan scalable
