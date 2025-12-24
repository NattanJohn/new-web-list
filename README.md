# 📰 News Web List

Um agregador de notícias moderno, responsivo e altamente acessível, construído com as melhores práticas de desenvolvimento fullstack.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?style=flat-square&logo=jest)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)

---

## ✨ Features Principais

### 🎨 Tema Dinâmico (Light/Dark Mode)
- **Tema Claro**: Excelente para leitura durante o dia com cores suaves e alto contraste
- **Tema Escuro**: Modo noturno que reduz fadiga ocular em ambientes com pouca luz
- **Persistência**: Preferência de tema salva no `localStorage` e sincronizada entre abas
- **Transições Suaves**: Animações fluidas ao trocar entre temas

### ♿ Modo de Acessibilidade Avançado

O projeto implementa 4 recursos de acessibilidade essenciais em um modal intuitivo:

#### 1️⃣ **Tamanho do Texto** (Font Scale)
   - 4 níveis de escala: 1x (padrão), 1.3x, 1.6x, 2x
   - Redimensiona dinamicamente todos os componentes
   - Ideal para usuários com baixa visão

#### 2️⃣ **Espaçamento entre Linhas** (Line Height)
   - 4 opções: Padrão, 1.3x, 1.6x, 2x
   - Melhora significativamente a legibilidade para dislexia
   - Aplicado globalmente em todo o conteúdo

#### 3️⃣ **Alto Contraste** (High Contrast Mode)
   - Aumenta a saturação de cores
   - Reforça bordas e separações visuais
   - Essencial para usuários com baixa visão

#### 4️⃣ **Modo Escala de Cinza** (Grayscale)
   - Remove cores para facilitar leitura
   - Auxilia usuários com discromatopsia
   - Mantém clareza e hierarquia visual

**💾 Todas as preferências são persistidas no `localStorage`!**

### 📱 Design Responsivo
- Mobile-first approach
- Funciona perfeitamente em smartphones, tablets e desktops
- Imagens otimizadas com `next/image`
- Preconnect e preload de recursos críticos

### ⚡ Performance
- Carregamento lazy de imagens
- CSS Modules para estilos isolados
- Paginação de 6 artigos por página
- Preload automático da primeira imagem
- Mínimo de JavaScript no bundle

### 🧪 Testes Automatizados
- **Jest** com **React Testing Library**
- Mock Service Worker para testes da API
- Cobertura de componentes principais
- 6 testes passando em 3 suites diferentes

### 📚 Arquitetura Limpa
- Componentes organizados por padrão **Atomic Design**
  - **Atoms**: Componentes básicos (Button, Title, Icon)
  - **Molecules**: Combinações simples (PostCard)
  - **Organisms**: Componentes complexos (ArticleList, ArticleDetail)
  - **Templates**: Layouts de página (HomeTemplate)
- **Context API** para gerenciamento de estado global
- Separação clara de responsabilidades

---

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+ e npm/yarn
- Git

### Instalação

```bash
# Clone o repositório
git clone <seu-repo>
cd news-web-list

# Instale as dependências do frontend
cd frontend
npm install

# Instale as dependências do backend
cd ../backend
npm install
```

### Rodando o Projeto

**Terminal 1 - Backend (Express):**
```bash
cd backend
npm start
# Servidor rodando em http://localhost:3001
```

**Terminal 2 - Frontend (Next.js):**
```bash
cd frontend
npm run dev
# Aplicação disponível em http://localhost:3000
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador! 🎉

### Rodando os Testes

```bash
cd frontend
npm test              # Rodar testes uma vez
npm run test:watch   # Modo watch (reexecuta ao salvar)
```

---

## 📁 Estrutura do Projeto

```
news-web-list/
├── backend/
│   ├── server.js          # Express API
│   ├── package.json
│   └── data/
│       └── news.json      # Base de dados de notícias
│
└── frontend/
    ├── src/
    │   ├── app/                    # Next.js App Router
    │   │   ├── page.tsx            # Página inicial (home)
    │   │   ├── article/[slug]/     # Página de artigo individual
    │   │   ├── layout.tsx          # Layout raiz
    │   │   └── globals.css         # Estilos globais
    │   │
    │   ├── components/             # Componentes React
    │   │   ├── atoms/              # Botões, títulos, ícones
    │   │   │   ├── ThemeButton/
    │   │   │   ├── Title/
    │   │   │   ├── Pagination/
    │   │   │   ├── Skeleton/
    │   │   │   └── Icons/
    │   │   │
    │   │   ├── molecules/          # Componentes compostos
    │   │   │   └── PostCard/
    │   │   │
    │   │   └── organisms/          # Componentes complexos
    │   │       ├── ArticleList/
    │   │       ├── ArticleDetail/
    │   │       └── AccessibilityModal/
    │   │
    │   ├── context/                # State global
    │   │   └── ThemeContext.tsx    # Tema + Acessibilidade
    │   │
    │   ├── services/               # Chamadas de API
    │   │   └── api.ts
    │   │
    │   ├── types/                  # TypeScript types
    │   │   ├── article.ts
    │   │   └── error.ts
    │   │
    │   ├── utils/                  # Funções utilitárias
    │   │   └── formatDate.ts
    │   │
    │   └── styles/                 # Variáveis SCSS globais
    │       └── variables.scss
    │
    ├── jest.config.js              # Configuração do Jest
    ├── setupTests.ts               # Setup dos testes
    ├── tsconfig.json               # TypeScript config
    ├── next.config.ts              # Next.js config
    └── package.json
```

---

## 🎯 Componentes Principais

### ThemeButton
Botão flutuante no canto superior direito que permite:
- ☀️ Alternar tema (light/dark)
- ♿ Acessar modo de acessibilidade (modal)

### AccessibilityModal
Modal interativo com 4 controles:
- Slider para tamanho de texto (1x - 2x)
- Slider para espaçamento (Normal - 2x)
- Toggle para alto contraste
- Toggle para modo grayscale

### ArticleList
- Exibe lista paginada de artigos (6 por página)
- Skeleton loading enquanto carrega
- Link para detalhes completos do artigo
- Responsivo em todas as resoluções

### ArticleDetail
- Exibe artigo completo com imagem de capa
- Data formatada
- Botão de voltar
- Rota dinâmica `/article/[slug]`

---

## 🔧 Stack Técnico

### Frontend
| Tecnologia | Versão | Propósito |
|---|---|---|
| **Next.js** | 16.1.1 | Framework React com SSR |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5 | Type safety |
| **Sass/SCSS** | CSS Modules | Estilos isolados |
| **Jest** | 30.2.0 | Testing framework |
| **React Testing Library** | 16.3.1 | Testes de componentes |
| **MSW** | 2.12.4 | Mock de API em testes |

### Backend
| Tecnologia | Propósito |
|---|---|
| **Node.js** | Runtime JavaScript |
| **Express.js** | Framework HTTP |
| **JSON** | Base de dados local |

---

## 📋 Testes

### Estrutura de Testes

```
src/
├── components/
│   ├── molecules/PostCard/PostCard.test.tsx
│   └── organisms/ArticleList/ArticleList.test.tsx
│
└── services/
    └── api.test.ts
```

### Exemplo de Teste

```typescript
describe('PostCard', () => {
  it('renders title and summary', () => {
    render(<PostCard article={mockArticle} />);
    expect(screen.getByText('Article Title')).toBeInTheDocument();
  });
});
```

### Rodando Testes

```bash
npm test                    # Rodar uma vez
npm test -- --watch       # Modo watch
npm test -- --coverage    # Com cobertura
```

---

## 🎨 Temas CSS

### Variáveis Globais

O projeto utiliza CSS variables para tema dinâmico:

```scss
// Light Mode
--bg-primary: #ffffff
--text-primary: #1a1a1a
--border-color: #dddddd

// Dark Mode
--bg-primary: #1a1a1a
--text-primary: #ffffff
--border-color: #333333

// Acessibilidade
--text-scale: 1               // 1x até 2x
--content-line-height: 1.5    // 1.5 até 2
--a11y-font-scale: 1          // Alias para --text-scale
```

### Aplicando Temas

Adicione o atributo `data-theme` ao `<html>`:

```tsx
<html data-theme="dark">
  {/* ... */}
</html>
```

---

## 🌍 Variáveis de Ambiente

**Frontend (`frontend/.env.local`):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend (`backend/.env`):**
```bash
PORT=3001
NODE_ENV=development
```

---

## 📱 Funcionalidades por Página

### Home (`/`)
- Lista paginada de todas as notícias
- Skeleton loading durante carregamento
- Paginação interativa
- Busca visual através de cards

### Artigo (`/article/[slug]`)
- Exibe artigo completo
- Imagem de capa otimizada
- Formatted date
- Data de publicação legível
- Botão de voltar à home

---

## ✅ Checklist de Features

- ✅ TypeScript em todo o projeto
- ✅ Componentes React funcionais
- ✅ Context API para state global
- ✅ CSS Modules para estilos isolados
- ✅ Responsivo (mobile/tablet/desktop)
- ✅ Tema dark/light mode
- ✅ Acessibilidade avançada (4 controles)
- ✅ Testes com Jest + RTL
- ✅ API service com error handling
- ✅ Performance otimizada
- ✅ SEO friendly (Next.js)
- ✅ Atomic Design pattern
- ✅ Error boundaries
- ✅ Loading states (skeletons)
- ✅ Roteamento dinâmico

---

## 🐛 Tratamento de Erros

O projeto implementa tratamento robusto de erros:

- **ApiError**: Classe customizada para erros de API
- **Error Boundary**: Fallback para erros não capturados
- **Empty State**: Mensagem quando não há artigos
- **Error Page**: Página 404 customizada

---

## 🚀 Próximos Passos (Ideias)

- [ ] Integração com banco de dados real (PostgreSQL)
- [ ] Sistema de busca e filtros
- [ ] Salvos/favoritos do usuário
- [ ] Sistema de comentários
- [ ] Notificações de novas notícias
- [ ] Dark mode automático (system preference)
- [ ] Análise de acessibilidade (Lighthouse)
- [ ] Deploy em Vercel/Railway

---

## 📄 Licença

Este projeto é de código aberto sob a licença MIT.

---

## 👨‍💻 Desenvolvido com ❤️

Desenvolvido como solução para desafio fullstack junior com foco em **acessibilidade**, **performance** e **boas práticas de código**.
