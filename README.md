# 📰 News Web List

Agregador de notícias moderno e acessível construído com Next.js 16, TypeScript e Atomic Design. Demonstra boas práticas em performance, SEO, testes automatizados e acessibilidade WCAG.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Jest](https://img.shields.io/badge/Tests-31_passing-success?style=flat-square&logo=jest)
![Coverage](https://img.shields.io/badge/Coverage-50%25-yellow?style=flat-square)

---

## 🌐 Demo Online

**Acesse a aplicação em produção:**

- 🚀 **Frontend (Vercel)**: [https://new-web-list.vercel.app/](https://new-web-list.vercel.app/)
- 🔌 **API Backend (Render)**: [https://new-web-list.onrender.com/articles](https://new-web-list.onrender.com/articles)

> 💡 **Nota**: O primeiro acesso ao backend pode levar ~30s (cold start do Render free tier)

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
- 🖼️ **Otimização de Imagens** com next/image, blur placeholders minificados e preload SSR
- 🧪 **Testes Avançados** - Testes de Contexts, integração de páginas e coverage report
- 📄 **Paginação via URL** (/?page=2) - Compartilhável e SEO-friendly
- 🐳 **Docker** pronto para produção
- ⚡ **Performance Mobile Otimizada** - LCP < 2s

---

## 🌍 Variáveis de Ambiente

```bash
# Frontend (.env ou .env.example)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Backend (.env ou .env.example)
PORT=3001
```

**Por que são necessárias?**
- `NEXT_PUBLIC_API_URL`: o frontend roda em ambiente dinâmico e precisa saber em runtime onde está a API (localhost em dev, host real em deploy). Como é `NEXT_PUBLIC`, ela é lida no cliente e no servidor.
- `PORT`: define a porta do Express; útil para Docker e para não conflitar com outras apps locais.

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
cd news-web-list

# 2. Configure as variáveis de ambiente
# Frontend: crie .env na pasta frontend/
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > frontend/.env

# Backend: crie .env na pasta backend/ (opcional, padrão é 3001)
echo "PORT=3001" > backend/.env

# 3. Instale e inicie o BACKEND (Terminal 1)
cd backend
npm install
npm start
# ✅ Backend rodando em http://localhost:3001

# 4. Instale e inicie o FRONTEND (Terminal 2)
cd frontend
npm install
npm run dev
# ✅ Frontend rodando em http://localhost:3000
```

**Acesse:**
- 🌐 **Frontend**: http://localhost:3000
- 🔌 **API Backend**: http://localhost:3001/articles

### 🐳 Com Docker (Recomendado)

```bash
# 1. Clone o repositório (se ainda não clonou)
git clone https://github.com/NattanJohn/new-web-list.git
cd news-web-list

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
- 🌐 **Frontend**: http://localhost:3000 (startup: ~273ms ⚡)
- 🔌 **API Backend**: http://localhost:3001/articles

**Comandos úteis do Docker:**
```bash
docker compose up -d         # Inicia em background
docker compose stop          # Para sem remover
docker compose start         # Reinicia containers parados
docker compose down          # Para e remove tudo
docker compose logs backend  # Logs apenas do backend
docker compose logs frontend # Logs apenas do frontend
docker compose ps            # Status dos containers
```

---

## 🧪 Testes

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

---

## 📁 Arquitetura do Projeto

### 🏗️ Atomic Design Pattern

O projeto utiliza **Atomic Design**, um padrão de design que organiza componentes em níveis hierárquicos:

| Nível | Descrição | Exemplo |
|-------|-----------|---------|
| **Atoms** | Menores unidades indivísíveis | Button, Icon, Title, ScrollToTop |
| **Molecules** | Combinações de atoms com função específica | PostCard (Title + Date + Summary) |
| **Organisms** | Grupos de molecules complexos | ArticleList, ArticleDetail, Modal |
| **Templates** | Estrutura de layouts de página | HomeTemplate, ArticleTemplate |

**Benefícios:** Reutilização máxima, manutenção simplificada, consistência visual, facilita testes unitários.

### 📂 Estrutura de Diretórios

```
frontend/src/
├── app/
│   ├── page.tsx                  # Home com lista paginada
│   ├── layout.tsx                # Providers (Theme + Accessibility)
│   ├── error.tsx                 # Error boundaries
│   ├── not-found.tsx             # 404 customizado
│   ├── globals.css               # Estilos globais
│   └── article/
│       └── [slug]/
│           ├── page.tsx          # Página dinâmica de artigos
│           └── loading.tsx       # Skeleton loading
│
├── components/
│   ├── atoms/                    # Elementos básicos
│   │   ├── BackButton/
│   │   ├── EmptyState/
│   │   ├── Pagination/
│   │   ├── PostImage/
│   │   ├── ScrollToTop/
│   │   ├── Skeleton/
│   │   ├── ThemeButton/
│   │   └── Title/
│   │
│   ├── molecules/                # Combinações de atoms
│   │   ├── AccessibilityButton/
│   │   └── PostCard/
│   │
│   ├── organisms/                # Componentes complexos
│   │   ├── AccessibilityModal/
│   │   ├── ArticleDetail/
│   │   ├── ArticleList/
│   │   ├── Footer/
│   │   └── Header/
│   │
│   └── templates/                # Layouts de página
│       ├── ArticleTemplate/
│       ├── HomeTemplate/
│       └── StatusTemplate/
│
├── context/
│   ├── ThemeContext.tsx          # Light/Dark + 7 testes
│   └── AccessibilityContext.tsx  # 4 controles + 10 testes
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
└── styles/
    └── variables.scss
```

### 🔧 Decisões Técnicas

#### Por que Next.js 16?
- **Server-Side Rendering (SSR):** Melhor performance e SEO com renderização no servidor (ArticleDetail é 100% SSR)
- **App Router:** Roteamento file-based intuitivo e suporte a layouts aninhados
- **Metadata API:** SEO simplificado com `generateMetadata()` dinâmica
- **Image Optimization:** `next/image` com lazy loading, blur placeholders otimizados e preload no servidor
- **Menos setup:** Framework all-in-one elimina configuração complexa

#### Por que Atomic Design?
A estrutura de 4 níveis (atoms → molecules → organisms → templates) oferece:
- **Reusabilidade:** Componentes pequenos usados em múltiplos contextos sem duplicação
- **Manutenção:** Mudanças isoladas em um atom não afetam organisms ou templates
- **Escalabilidade:** Fácil adicionar novos componentes seguindo o padrão
- **Testes:** Componentes pequenos e isolados são mais simples de testar

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
- Usamos `dynamic = 'force-dynamic'`, `fetchCache = 'force-no-store'` e `revalidate = 0` na home ([frontend/src/app/page.tsx](frontend/src/app/page.tsx#L8-L10)).
- **Motivo:** a API é consultada em runtime e não pode ser cacheada ou pré-renderizada; precisamos sempre dos dados mais recentes do backend (que lê o JSON em tempo real).
- **É boa prática?** É **aceitável** quando os dados são mutáveis ou o backend não está disponível no build. Se os dados puderem ser cacheados, prefira `revalidate` > 0 para reduzir custo e latência.

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

### Stack Técnico

| Aspecto | Tecnologia |
|---------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript 5, SCSS Modules |
| **Testes** | Jest 30, React Testing Library 16, MSW 2 |
| **Backend** | Node.js, Express 5 |
| **Infra** | Docker, Docker Compose |

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

**Resultado esperado:**
- LCP: 7s → ~1-1.5s (⚡ **-5.5s**)
- Score: 77 → ~92-95 (📈 **+15-18 pontos**)
- Bundle JS: **-28 linhas** de código cliente
- HTML: **-58%** de blur placeholder data

---

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

### Páginas de Erro
- 404 personalizada com link home
- Error boundary global
- Empty states reutilizáveis

---

## 🌍 Variáveis de Ambiente

```bash
# Frontend (.env ou .env.example)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Backend (.env ou .env.example)
PORT=3001
```

**Por que são necessárias?**
- `NEXT_PUBLIC_API_URL`: o frontend roda em ambiente dinâmico e precisa saber em runtime onde está a API (localhost em dev, host real em deploy). Como é `NEXT_PUBLIC`, ela é lida no cliente e no servidor.
- `PORT`: define a porta do Express; útil para Docker e para não conflitar com outras apps locais.

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
- ✅ 31 testes automatizados (Jest + RTL + MSW)
- ✅ Loading states e error boundaries globais
- ✅ Imagens otimizadas (next/image com WebP/AVIF)
- ✅ Tema Dark/Light com persistência
- ✅ 4 controles de acessibilidade completos

### Destaques Diferenciais
- ✅ Atomic Design Pattern (raramente visto em JR)
- ✅ Schema.org microdata (NewsArticle + Person + ImageObject)
- ✅ Context API sincronizado entre abas
- ✅ SSR-safe localStorage (sem hydration mismatch)
- ✅ Docker para desenvolvimento e produção
- ✅ Coverage report configurado

---

## 📄 Scripts Disponíveis

```bash
# Frontend
npm run dev                 # Desenvolvimento (localhost:3000)
npm run build              # Build de produção
npm start                  # Produção (após build)
npm test                   # Roda todos os testes
npm run test:watch         # Testes em watch mode
npm run test:coverage      # Relatório de coverage
npm run lint               # ESLint

# Backend
npm start                  # Servidor Express (localhost:3001)
npm run dev                # Watch mode com nodemon
```

---

## 🏆 Destaques do Projeto

Este projeto demonstra expertise profissional com:

1. **Atomic Design** - Arquitetura escalável e reutilizável
2. **Acessibilidade Avançada** - 4 controles + WCAG compliance
3. **Testes Completos** - 31 testes cobrindo Contexts, integração, componentes, API
4. **SEO Profissional** - Schema.org microdata + metadata dinâmica
5. **Type Safety Estrito** - Zero `any`, interfaces robustas
6. **Performance** - Lazy loading, preload, cache strategies
7. **Deploy-Ready** - Docker + env vars + error handling robusto

---

## 📄 Licença

MIT License - Código aberto

---

## 👨‍💻 Desenvolvedor

Desenvolvido com foco em **acessibilidade**, **performance**, **boas práticas** e **testes automatizados**.

Demonstra expertise em: Atomic Design, Context API, Next.js Server Components, SEO, Type Safety, Testing e DevOps.

---

> 💡 **Nota**: Para documentação técnica detalhada, consulte os comentários no código.
