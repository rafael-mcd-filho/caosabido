# 🐕 Cão Sabido - Landing Page Completa

Landing page profissional para a **Cão Sabido**, a única creche educativa de João Pessoa. Desenvolvida em React 18 com design responsivo e otimizada para conversão.

## ✨ Funcionalidades Implementadas

### 🎨 **Design & UX**
- ✅ Paleta de cores baseada no logo (marrom couro, amarelo mostarda, azul brinquedo)
- ✅ Design responsivo mobile-first
- ✅ Animações suaves e micro-interações
- ✅ Layout profissional e moderno
- ✅ Navegação fixa com links para seções

### 📱 **Seções Completas**
1. **Header Navigation** - Links para todas as seções principais
2. **Hero Section** - Layout otimizado com texto à esquerda e vídeo à direita
3. **Sobre a Creche** - 6 cards de serviços + imagem mockada
4. **Nossos Serviços** - Lista completa de soluções oferecidas
5. **Conheça Nossos Ambientes** - 3 vídeos com capas profissionais
6. **Depoimentos** - Carrossel com 6 depoimentos, fotos e rotação automática
7. **FAQ** - 6 perguntas colapsáveis com respostas detalhadas
8. **Sobre o Adestrador** - Seção dedicada com foto, certificações e resultados
9. **Localização e Contato** - 3 colunas: info, foto da fachada e mapa
10. **Footer Profissional** - Completo com links e informações

### 💬 **WhatsApp Integração Completa**
- ✅ Todos os CTAs redirecionam para WhatsApp (+55 83 99827-6229)
- ✅ Botão flutuante que aparece após scroll da seção hero
- ✅ Tooltip inteligente após 7 segundos
- ✅ Mensagens pré-definidas para cada contexto
- ✅ Integração específica para falar com a adestradora

### 🎯 **Recursos Interativos**
- ✅ **Carrossel de Depoimentos**: 2 por vez, setas de navegação, rotação automática
- ✅ **FAQ Accordion**: 6 perguntas colapsáveis
- ✅ **Vídeos com Capas**: Layout profissional com thumbnails
- ✅ **Navegação Suave**: Links do header levam às seções correspondentes

### 🔍 **SEO Otimizado**
- ✅ Meta tags focadas em "creche para cães João Pessoa"
- ✅ Título e descrição otimizados para conversão
- ✅ Open Graph para redes sociais
- ✅ Estrutura semântica HTML5

### 🖼️ **Imagens e Assets**
- ✅ Logo da Cão Sabido integrado
- ✅ 3 vídeos dos ambientes (dogs-hotel.mp4, presentation.mp4, training.mp4)
- ✅ Imagens mockadas geradas por IA:
  - Ambiente da creche (about-daycare.jpg)
  - 3 capas de vídeos profissionais
  - 6 fotos de perfil para depoimentos
  - Foto da adestradora (trainer-photo.jpg)
  - Fachada do estabelecimento (building-facade.jpg)

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou pnpm

### Instalação
```bash
# 1. Extrair o projeto
unzip cao-sabido-landing-updated.zip
cd cao-sabido-landing

# 2. Instalar dependências
npm install
# ou
pnpm install

# 3. Executar em desenvolvimento
npm run dev
# ou
pnpm run dev

# 4. Acessar no navegador
http://localhost:5173
```

### Build para Produção
```bash
npm run build
# ou
pnpm run build
```

## 📱 Responsividade

O projeto foi desenvolvido com abordagem **mobile-first** e é totalmente responsivo:

- ✅ **Mobile** (320px+): Layout otimizado para smartphones
- ✅ **Tablet** (768px+): Adaptação para tablets
- ✅ **Desktop** (1024px+): Layout completo para desktops
- ✅ **Large Desktop** (1280px+): Aproveitamento total da tela

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Shadcn/UI** - Componentes de interface
- **Lucide React** - Ícones
- **Radix UI** - Componentes acessíveis (Accordion)

## 📞 Contato e WhatsApp

Todas as integrações do WhatsApp estão configuradas para:
- **Número**: +55 83 99827-6229
- **Mensagens contextuais** para cada seção
- **Botão flutuante** com tooltip inteligente

## 🎯 Otimizações de Conversão

- ✅ **CTAs estratégicos** em todas as seções
- ✅ **Depoimentos com fotos** para credibilidade
- ✅ **FAQ completo** para esclarecer dúvidas
- ✅ **Seção do adestrador** para autoridade
- ✅ **Múltiplas formas de contato**
- ✅ **Vídeos dos ambientes** para transparência

## 📋 Estrutura do Projeto

```
cao-sabido-landing/
├── public/
│   ├── cao-sabido.jpg          # Logo
│   ├── dogs-hotel.mp4          # Vídeo hotel
│   ├── presentation.mp4        # Vídeo apresentação
│   ├── training.mp4            # Vídeo treinamento
│   ├── about-daycare.jpg       # Imagem da creche
│   ├── video-cover-*.jpg       # Capas dos vídeos
│   ├── testimonial-*.jpg       # Fotos depoimentos
│   ├── trainer-photo.jpg       # Foto adestradora
│   └── building-facade.jpg     # Fachada
├── src/
│   ├── components/ui/          # Componentes Shadcn/UI
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos
│   └── main.jsx               # Entry point
└── README.md                   # Este arquivo
```

## 🎨 Paleta de Cores

- **Primária**: `#92400e` (Marrom couro)
- **Secundária**: `#f59e0b` (Amarelo mostarda)  
- **Accent**: `#3b82f6` (Azul brinquedo)
- **Backgrounds**: `#fffbeb`, `#fef3c7` (Tons de âmbar)

## 📈 Performance

- ✅ **Carregamento rápido** com Vite
- ✅ **Vídeos otimizados** com capas
- ✅ **Componentes modulares**
- ✅ **Código limpo** e bem estruturado
- ✅ **Lazy loading** de imagens

## 🚀 Deploy

O projeto está pronto para deploy em:
- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- Qualquer plataforma que suporte React/Vite

---

**Desenvolvido com ❤️ para a Cão Sabido - A única creche educativa de João Pessoa!**

