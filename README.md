# Batalion Barbershop

Website company profile modern-classic untuk Batalion Barbershop, Larangan, Tangerang.

## Menjalankan project

```bash
npm install
npm run dev
```

Buka `http://localhost:4321`.

## Validasi dan build

```bash
npm run check
npm run build
npm run preview
```

## Data penting

- Konten utama: `src/pages/index.astro`
- React UI/shadcn: `src/components/ui/`
- Utility shadcn: `src/lib/utils.ts`
- Styling + Tailwind: `src/styles/global.css`
- Konfigurasi shadcn: `components.json`
- Foto dan logo: `src/assets/images/`
- PRD: `docs/PRD.md`
- Konfigurasi situs: `astro.config.mjs`

## Sebelum deployment

1. Pilih dan beli domain.
2. Ganti `site` di `astro.config.mjs` dari `https://example.com` ke domain resmi.
3. Verifikasi URL Google Maps/Google Business Profile.
4. Tambahkan domain ke Google Business Profile dan Google Search Console.
