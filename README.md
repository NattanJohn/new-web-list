# 📰 News Web List

Portal de notícias moderno e acessível construído com Next.js 16, TypeScript e Atomic Design. Demonstra boas práticas em performance, SEO, testes automatizados e acessibilidade WCAG.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Jest](https://img.shields.io/badge/Unit_Tests-31_passing-success?style=flat-square&logo=jest)
![Playwright](https://img.shields.io/badge/E2E_Tests-6_passing-success?style=flat-square&logo=playwright)
![Coverage](https://img.shields.io/badge/Coverage-50%25-yellow?style=flat-square)

---

## 🌐 Demo Online

- 🚀 **Frontend (Vercel)**: <a href="https://new-web-list.vercel.app/" target="_blank">https://new-web-list.vercel.app/</a>
- 🔌 **Backend API (Render)**: <a href="https://new-web-list.onrender.com/articles" target="_blank">https://new-web-list.onrender.com/articles</a>

> ⏳ **Atenção:** a primeira chamada do backend (Render free) pode levar até ~60s por cold start.

---

## ✨ Destaques do Projeto

### 🎯 Funcionalidades Principais
- ✅ **Lista e detalhes de artigos** - Renderização dinâmica com Next.js
- ✅ **Componentes funcionais** com React Hooks e TypeScript
- ✅ **Layout responsivo** mobile-first com SCSS Modules
- ✅ **API RESTful** com Express servindo dados de JSON local
- ✅ **Testes automatizados** - 31 testes passando (Jest + RTL)
- ✅ **Atomic Design** - Arquitetura escalável e reutilizável

### ⭐ Funcionalidades Avançadas
- 🎨 **Tema Dark/Light** com persistência e transições suaves
- ♿ **4 Controles de Acessibilidade** (fonte, espaçamento, contraste, escala de cinza)
- 🔍 **SEO Profissional** com Schema.org microdata (NewsArticle, Person, ImageObject)
- 🖼️ **Otimização de Imagens** com next/image, WebP automático, blur placeholders minificados e preload SSR
- 🧪 **Testes Completos** - 31 testes unitários (Jest + RTL) + 6 testes E2E (Playwright)
- 📄 **Paginação via URL** (/?page=2) - Compartilhável e SEO-friendly
- 🐳 **Docker** pronto para produção com multi-stage builds
- ⚡ **Performance Mobile Otimizada** - LCP ~1.5s, Score ~95
- 📤 **Compartilhamento mobile integrado**: Os botões de compartilhar abrem diretamente o app correspondente (WhatsApp, LinkedIn, Twitter, etc.) se instalado, proporcionando uma experiência rápida e fluida no mobile.

---

## 🌍 Variáveis de Ambiente

> ⚠️ **Atenção:** As variáveis de ambiente abaixo **não são obrigatórias** para rodar o projeto (local ou Docker), pois o código já possui valores padrão e o Docker Compose injeta as variáveis necessárias. Use-as apenas se ocorrer erro relacionado a variável de ambiente.

```bash
# Frontend (.env)
NEXT_PUBLIC_API_URL=http://localhost:3001
INTERNAL_API_URL=http://127.0.0.1:3001

# Backend (.env)
PORT=3001
```

**Sobre as variáveis:**
- `NEXT_PUBLIC_API_URL`: URL da API para o frontend (SSR/CSR). Se não definida, usa `http://localhost:3001`.
- `INTERNAL_API_URL`: Usada pelo SSR do Next.js. Se não definida, usa `http://127.0.0.1:3001`.
- `PORT`: Porta do backend. Se não definida, usa `3001`.

---

## 🚀 Como Rodar o Projeto

### ⚙️ Pré-requisitos

- **Node.js** 18+ (backend) e 20+ (frontend)
- **npm** ou **yarn**
- **Docker** e **Docker Compose** (opcional, para rodar em containers)

### 📦 Desenvolvimento Local (sem Docker)

```bash
# 1. Clone o repositório
git clone https://github.com/NattanJohn/new-web-list.git
cd new-web-list

# 2. Instale e inicie o BACKEND (Terminal 1)
cd backend
npm install
npm start
# ✅ Backend rodando em http://localhost:3001

# 3. Instale e inicie o FRONTEND (Terminal 2)
cd frontend
npm install
npm run dev
# ✅ Frontend rodando em http://localhost:3000
```

**Acesse:**
- 🌐 **Frontend**: <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>
- 🔌 **API Backend**: <a href="http://localhost:3001/articles" target="_blank">http://localhost:3001/articles</a>

### 🐳 Com Docker (Recomendado)

```bash
# 1. Clone o repositório (se ainda não clonou)
git clone https://github.com/NattanJohn/new-web-list.git
cd new-web-list

# 2. Build e inicie os containers
docker compose build    # Primeira vez: ~80 segundos
docker compose up -d    # Inicia em modo detached (background)

# 3. Verifique os containers
docker compose ps       # Status: healthy ✅

# 4. Veja os logs (opcional)
docker compose logs -f  # Acompanhe em tempo real

# 5. Pare os containers quando terminar
docker compose down     # Para e remove containers
```

**Acesse:**
- 🌐 **Frontend**: <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> (startup: ~273ms ⚡)
- 🔌 **API Backend**: <a href="http://localhost:3001/articles" target="_blank">http://localhost:3001/articles</a>

---

## 🧪 Testes

### Testes Unitários e de Integração (Jest)

```bash
cd frontend

npm test                    # Roda 31 testes
npm run test:watch         # Watch mode
npm run test:coverage      # Relatório de coverage
```

**Cobertura Atual:**
- ✅ 6 suites de teste
- ✅ 31 testes passando
- ✅ Testes de Contexts (Theme + Accessibility)
- ✅ Testes de integração (HomePage completa)
- ✅ Testes de componentes (PostCard, ArticleList)
- ✅ Testes de API (error handling, fetching)

### Testes E2E (Playwright)

**Pré-requisito:** Backend deve estar rodando em `localhost:3001`

```bash
# Terminal 1: Inicie o backend
cd backend
npm start

# Terminal 2: Rode os testes E2E
cd frontend
npm run test:e2e              # Headless (CI/CD)
npm run test:e2e:ui           # Modo UI interativo (recomendado)
npm run test:e2e:headed       # Ver browser executando
```

**Cenários E2E (6 testes):**
1. ✅ Carregar home e exibir lista de artigos
2. ✅ Navegar home → artigo → voltar
3. ✅ Abrir modal de acessibilidade e aumentar fonte
4. ✅ Alternar tema dark/light
5. ✅ Exibir paginação quando há artigos
6. ✅ Exibir 404 para artigo inexistente

**Primeira vez?** Instale o browser Chromium:
```bash
npm run playwright:install
```

**Estrutura dos testes:**
```
frontend/
├── e2e/
│   └── app.spec.ts              # 6 cenários E2E completos
├── playwright.config.ts          # Configuração do Playwright
├── jest.config.js                # Configuração do Jest
├── setupTests.ts                 # Setup dos testes unitários
```

---

## 📁 Arquitetura do Projeto
### 🏗️ Atomic Design Pattern

O projeto utiliza **Atomic Design**, um padrão de design que organiza componentes em níveis hierárquicos:

| Nível | Descrição | Exemplo |
|-------|-----------|---------|
| **Atoms** | Menores unidades indivisíveis | Button, AccessibilityButton, Title, ScrollToTop |
| **Molecules** | Combinações de atoms com função específica | PostCard (Title + Date + Summary) |
| **Organisms** | Grupos de molecules complexos | ArticleList, ArticleDetail, Modal |
| **Templates** | Estrutura de layouts de página | HomeTemplate, ArticleTemplate |

**Benefícios:** Reutilização máxima, manutenção simplificada, consistência visual, facilita testes unitários.

<details>
<summary><h3>📂 Estrutura de Diretórios</h3></summary>

```
frontend/src/
├── app/
│   ├── page.tsx                  # Home com lista paginada
│   ├── page.test.tsx             # Testes da home page
│   ├── layout.tsx                # Providers (Theme + Accessibility)
│   ├── error.tsx                 # Error boundaries
│   ├── not-found.tsx             # 404 customizado
│   ├── globals.scss              # Estilos globais
│   ├── favicon.ico               # Ícone do site
│   └── article/
│       └── [slug]/
│           └── page.tsx          # Página dinâmica de artigos
│
├── components/
│   ├── atoms/                    # Elementos básicos
│   │   ├── AccessibilityButton/
│   │   ├── BackButton/
│   │   ├── CategoryTag/
│   │   ├── EmptyState/
│   │   ├── Pagination/
│   │   ├── PostImage/
│   │   ├── ScrollToTop/
│   │   ├── ShareButtons/
│   │   ├── Skeleton/
│   │   ├── ThemeButton/
│   │   ├── Title/
│   │   └── index.ts
│   │
│   ├── molecules/                # Combinações de atoms
│   │   ├── PostCard/
│   │   └── index.ts
│   │
│   ├── organisms/                # Componentes complexos
│   │   ├── AccessibilityModal/
│   │   ├── ArticleDetail/
│   │   ├── ArticleList/
│   │   └── index.ts
│   │
│   └── templates/                # Layouts de página
│       ├── ArticleTemplate/
│       ├── HomeTemplate/
│       ├── StatusTemplate/
│       └── index.ts
│
├── context/
│   ├── ThemeContext.tsx          # Light/Dark + 7 testes
│   ├── ThemeContext.test.tsx
│   ├── AccessibilityContext.tsx  # 4 controles + 10 testes
│   └── AccessibilityContext.test.tsx
│
├── lib/                          # Utilitários e infraestrutura
│   ├── index.ts                  # Barrel (ErrorBoundary + metadata)
│   ├── ErrorBoundary.tsx         # Error boundary reutilizável
│   ├── metadata.ts               # Constantes de SEO centralizadas
│   └── getApiUrl.ts              # Centraliza lógica de URL da API
│
├── services/
│   ├── api.ts                    # HTTP service + 7 testes
│   └── api.test.ts
│
├── hooks/
│   └── useLocalStorage.ts
│
├── utils/
│   ├── errorHandler.ts
│   ├── formatDate.ts
│   ├── imageOptimization.ts
│   └── localStorage.ts
│
├── types/
│   ├── article.ts
│   ├── error.ts
│   └── index.ts
│
├── styles/
│   └── variables.scss
│
└── setupTests.ts                 # Configuração do Jest
```
</details>

### 🔧 Decisões Técnicas

#### Por que Next.js 16?
- **Server-Side Rendering (SSR):** Melhor performance e SEO com renderização no servidor (ArticleDetail é 100% SSR)
- **App Router:** Roteamento file-based intuitivo e suporte a layouts aninhados
- **Metadata API:** SEO simplificado com `generateMetadata()` dinâmica
- **Image Optimization:** `next/image` com lazy loading, WebP automático, blur placeholders otimizados e preload no servidor
- **Menos setup:** Framework all-in-one elimina configuração complexa

#### Por que Atomic Design?
A estrutura de 4 níveis (atoms → molecules → organisms → templates) oferece:
- **Reusabilidade:** Componentes pequenos usados em múltiplos contextos sem duplicação
- **Manutenção:** Mudanças isoladas em um atom não afetam organisms ou templates
- **Escalabilidade:** Fácil adicionar novos componentes seguindo o padrão
- **Testes:** Componentes pequenos e isolados são mais simples de testar
- **Acessibilidade sempre disponível:** Botão flutuante de acessibilidade em atoms garante presença em todas as telas

#### Por que Context API + localStorage?
- **Context API:** Simplicidade com apenas 2 contextos (Theme + Accessibility) sem overhead
- **localStorage:** Persistência de preferências do usuário entre sessões
- **SSR-safe:** Hooks customizados (`useLocalStorage`) evitam hydration mismatches
- **Sem Redux:** Desnecessário para estado simples e sincronizado

#### Por que SCSS Modules?
- **Scoped Styling:** CSS classes automáticamente namespaceadas evita conflitos globais
- **CSS Variables:** Sistema de tokens (cores, spacing, tipografia) centralizado em `variables.scss`
- **Performance:** Apenas CSS usado é enviado ao cliente (no tree-shaking)
- **Manutenção:** Alterações em um componente não afetam outros

#### Por que Express para o Backend?
- **Simplicidade:** Servidor leve e direto ao ponto para servir JSON
- **JSON File Storage:** Dados mockados em arquivo facilita deploy, testes e prototipagem
- **Sem overhead:** Sem ORM, migrations ou complexidade de banco de dados
- **Prototipagem rápida:** Perfeito para MVP e portfolios

#### ⚡ Renderização Dinâmica (Next.js App Router)
- Configurei a Home com `dynamic = 'force-dynamic'` e `revalidate = 0` ([frontend/src/app/page.tsx](frontend/src/app/page.tsx#L8-L10)).
>  Como nosso "banco de dados" é um arquivo JSON local que pode mudar a qualquer momento, priorizei a consistência imediata. Queria garantir que, se você editar o JSON, a mudança apareça na hora.
 
> Em produção,  eu certamente usaria **ISR (Incremental Static Regeneration)** com um tempo de revalidação maior (ex: `revalidate = 60`), para aproveitar o cache do Next.js, reduzir carga no servidor e entregar páginas estáticas instantâneas. Mas para o escopo deste teste, desativar o cache foi a escolha mais segura.

#### 💡 Nota sobre Hydration Warnings (React Error #418)
> O projeto pode apresentar um aviso de hidratação no console. Isso ocorre devido à persistência de preferências de acessibilidade (Tema Dark/Light e escala de fonte) via `localStorage`. Como o servidor não tem acesso ao armazenamento local do navegador durante o SSR, ocorre uma breve divergência na renderização inicial. Isso foi mantido para garantir que o usuário não sofra com "flashes" de luz branca ao carregar a página, priorizando a experiência de acessibilidade.

#### 🌐 Estratégia de Resolução de URL (Ambiente Híbrido)

A lógica abaixo garante que o frontend consiga se comunicar com a API corretamente em diferentes cenários: **dev local, SSR, Docker e produção**.

```ts
// src/lib/getApiUrl.ts
export function getApiUrl() {
  // No navegador (CSR)
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }
  // No servidor (SSR)
  if (process.env.INTERNAL_API_URL) {
    return process.env.INTERNAL_API_URL;
  }
  return 'http://127.0.0.1:3001';
}
```

> 💡 **Por que usar `localhost` e `127.0.0.1`?**
> - `localhost` funciona para o browser local, mas em Docker cada container tem seu próprio localhost. Por isso, para SSR (servidor), usamos `INTERNAL_API_URL` (ex: `http://backend:3001` no compose) e fallback para `127.0.0.1` para garantir que o SSR local funcione mesmo sem variáveis.

### 📊 Estrutura de Dados

**Backend (`backend/data/news.json`)**

```json
[
  {
    "id": "uuid-string",
    "title": "Título do Artigo",
    "slug": "titulo-do-artigo",
    "summary": "Resumo breve do conteúdo...",
    "content": "Conteúdo completo em markdown...",
    "image": "https://example.com/image.jpg",
    "author": "Nome do Autor",
    "date": "2024-01-15T10:30:00Z",
    "category": "Categoria"
  }
]
```

**API Endpoints:**
- `GET /articles?page=1` → Lista paginada (10 artigos por página)
- `GET /articles/:slug` → Detalhe completo de um artigo

**Fluxo de Dados:**
```
Backend (Express)
    ↓
JSON File (news.json)
    ↓
Frontend API Service (fetchWithTimeout)
    ↓
React Components (via props)
    ↓
UI Rendering
```

---

## 🎨 Features Principais

### 1. Tema Dark/Light Mode
- Persistência em `localStorage`
- Transições suaves entre temas
- SSR-safe (evita hydration mismatch)
- Preserva alto contraste ao trocar tema

### 2. Sistema de Acessibilidade Completo
- **Tamanho do Texto**: 5 níveis (1x até 2x)
- **Espaçamento de Linhas**: 4 opções (normal, 1.3x, 1.6x, 2x)
- **Alto Contraste**: Aumenta saturação e reforça bordas
- **Escala de Cinza**: Remove cores para melhor legibilidade
- Botão flutuante de acessibilidade (sempre disponível)
- Todas as configurações persistidas e sincronizadas entre abas

### 3. SEO e Schema.org
- Microdata completo (NewsArticle, Person, ImageObject)
- OpenGraph e Twitter Cards dinâmicos
- HTML semântico (`<article>`, `<time>`, `<figure>`)
- URLs amigáveis e paginação via query params

### 4. Performance
- Next/Image com WebP automático e qualities otimizados [75, 85]
- Lazy loading de imagens fora do viewport
- Blur placeholders minificados (86 bytes) com Gaussian blur
- Preload da primeira imagem no servidor (SSR)
- Fonte Inter com display: swap (previne FOIT)
- CSS Modules para estilos isolados
- Server Components para menor bundle JS

---

## ⚡ Otimizações de Performance Aplicadas

### 1. Server Components Maximizados
- **ArticleDetail como Server Component**: Todo o conteúdo renderizado no servidor
- **ScrollToTop isolado**: Único Client Component necessário para scroll
- **Benefício**: Bundle JS ~28 linhas menor, LCP -2.5s

### 2. Next/Image Otimizado
```javascript
// next.config.mjs
images: {
  deviceSizes: [640, 750, 828, 1080, 1200], // Removido 1920+
  formats: ['image/webp'], // Removido AVIF (lento)
  qualities: [75, 85], // Configurado corretamente
}
```

### 3. Blur Placeholder Minificado
```typescript
// De 200+ bytes para 86 bytes (-57%)
export const OPTIMIZED_BLUR_DATA_URL = 
  'data:image/svg+xml,%3Csvg...' // URL-encoded com Gaussian blur
```

### 4. Preload Inteligente no Servidor
```tsx
// app/page.tsx - Preload antes do hydration
{firstImage && (
  <link
    rel="preload"
    as="image"
    href={firstImage}
    imageSrcSet="...responsivo..."
    fetchPriority="high"
  />
)}
```

### 5. Fonte Otimizada
```typescript
const inter = Inter({ 
  display: 'swap', // Previne FOIT (Flash of Invisible Text)
  preload: true,
});
```

## 🎯 Boas Práticas Implementadas

### Type Safety
```typescript
// API com error handling robusto
export class ApiError extends Error {
  status?: number;
  constructor(shape: { message: string; status?: number }) {
    super(shape.message);
    this.status = shape.status;
  }
}

// Uso seguro com tratamento de erro unificado
try {
  const articles = await api.getArticles();
} catch (err) {
  setErrorMessage(handleApiError(err)); // Handler centralizado
}
```

### Paginação SEO-Friendly
```typescript
// Lê página da URL (?page=2)
const currentPage = Number(searchParams.get('page')) || 1;

// Atualiza URL mantendo histórico do navegador
const handlePageChange = (page: number) => {
  const params = new URLSearchParams();
  if (page > 1) params.set('page', String(page));
  
  router.push(params.toString() ? `/?${params}` : '/', { scroll: false });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

### Safe localStorage (SSR-Safe)
```typescript
// Não quebra durante renderização servidor
export const safeLocalStorageGet = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
```

---

## 📱 Funcionalidades

### Home (`/` ou `/?page=2`)
- Lista paginada de notícias (6 por página)
- Skeleton loading durante carregamento
- Cards com Schema.org microdata
- Paginação compartilhável via URL
- Empty state se não houver artigos

### Artigo (`/article/[slug]`)
- Artigo completo com microdata
- Metadata dinâmica (OG, Twitter)
- Imagem otimizada com next/image
- Botão de voltar com histórico
- 404 automático se não existir
- Botão para compartilhar artigo ( Whatsapp / Twitter / Linkedin )

### Páginas de Erro
- 404 personalizada com link home
- Error boundary global
- Empty states reutilizáveis

---

## 📊 Checklist Completo

### Funcionalidades Principais
- ✅ React/Next.js 16 com TypeScript 5
- ✅ Componentes funcionais com hooks
- ✅ Layout responsivo com SCSS Modules
- ✅ Consumo de API com tratamento de erro
- ✅ Estado gerenciado com Context + localStorage
- ✅ Organização Atomic Design (4 níveis)

### Funcionalidades Avançadas
- ✅ TypeScript em 100% do código (strict mode)
- ✅ 31 testes unitários (Jest + RTL) + 6 testes E2E (Playwright)
- ✅ Loading states e error boundaries globais
- ✅ Imagens otimizadas (next/image com WebP automático)
- ✅ Tema Dark/Light com persistência
- ✅ 4 controles de acessibilidade completos

---

## 🤖 Uso de Inteligência Artificial

Para o desenvolvimento deste desafio, utilizei ferramentas de IA (Gemini e GitHub Copilot) como auxiliares de produtividade. Abaixo, descrevo como elas foram aplicadas conforme solicitado nas diretrizes:

### Ferramentas Utilizadas

**IA de Chat (Gemini)**: Utilizada para discussões arquiteturais, planejamento de deploy e estratégias de acessibilidade.

**IA no Editor (GitHub Copilot/VS Code)**: Utilizada para auxílio no preenchimento de código repetitivo (boilerplate) e refatoração rápida.

### Principais Prompts e Contextos

**Arquitetura e UX:**
> "Como implementar um contexto de acessibilidade no React que persista as preferências do usuário no LocalStorage?"

> "Como configurar a comunicação entre um frontend Next.js (SSR) e um backend Express dentro de uma rede Docker Bridge, garantindo que o fetch funcione tanto no servidor quanto no cliente?"

**Refatoração:**
> "Refatore este componente de Context para usar as melhores práticas de performance (useMemo/useCallback) e resolver erros de lint de variáveis não utilizadas."

**Estilização:**
> "Crie um SCSS para um botão de tema fixo que seja resiliente ao aumento de escala de fonte (zoom de texto) do navegador."

**DevOps:**
> "Crie um Dockerfile e um docker-compose.yml para um monorepo com pastas separadas de frontend (Next.js) e backend (Node.js)."

**Performance:**
> "Como otimizar o LCP de uma listagem de notícias com Next.js Image optimization e preload de recursos críticos?"

**Qualidade e Testes:**
> "Crie um teste de integração para a listagem de notícias verificando se o loading state é exibido antes dos dados"

> "Escreva um script de teste E2E (End-to-End) que simule o usuário alterando o tamanho da fonte e verificando se a alteração persiste após o reload"

**Análise de código:**
> "Analise este projeto e identifique más práticas em HTML semântico, TypeScript, SCSS, SEO e código duplicado."

---

## 📄 Licença

MIT License - Código aberto

---

Desenvolvido com foco em **acessibilidade**, **performance**, **boas práticas** e **testes automatizados**.
