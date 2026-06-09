# Cao Sabido Landing Page

Landing page em React/Vite para a Cao Sabido, com foco em conversao via WhatsApp, SEO basico e assets otimizados em `public/`.

## Como rodar

```bash
npm install
npm run dev
```

Servidor local padrao do Vite:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

O build gera a pasta `dist/`. Ela nao deve ser versionada no Git para este projeto, porque plataformas como Vercel geram `dist/` automaticamente durante o deploy.

## Deploy na Vercel

Configuracao esperada:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Estrutura

```text
public/
  about-daycare.jpg
  cao-sabido.png
  favicon.ico
  frente_casa.png
  testimonial-*.png
  trainer-photo.jpg
  videos/
    dogs-hotel.mp4
    presentation.mp4
    presentation-720.mp4
    training.mp4
src/
  components/ui/
  lib/utils.js
  App.css
  App.jsx
  main.jsx
```

## Scripts

- `npm run dev`: inicia o servidor de desenvolvimento
- `npm run build`: gera os arquivos de producao em `dist/`
- `npm run lint`: roda o ESLint
- `npm run preview`: serve o build localmente
