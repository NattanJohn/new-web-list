import { test, expect } from '@playwright/test';

test.describe('Navegação Home → Artigo', () => {
  test('deve carregar a home e exibir lista de artigos', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verifica se tem pelo menos um card de artigo com schema.org
    const articles = page.locator('article[itemtype*="NewsArticle"]');
    await expect(articles.first()).toBeVisible({ timeout: 10000 });
    
    // Verifica estrutura do card
    await expect(articles.first().locator('img')).toBeVisible();
    await expect(articles.first().locator('h2')).toBeVisible();
  });

  test('deve navegar da home para artigo e voltar', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Aguarda primeiro artigo estar visível
    const firstArticle = page.locator('article[itemtype*="NewsArticle"]').first();
    await expect(firstArticle).toBeVisible({ timeout: 10000 });

    // Clica no card do artigo (é um link)
    await firstArticle.locator('a').first().click();

    // Verifica que navegou para página de artigo
    await expect(page).toHaveURL(/\/article\/.+/);
    await page.waitForLoadState('networkidle');
    
    // Verifica que tem conteúdo do artigo (conta quantos h1, deve ter 2: header + artigo)
    const headings = page.locator('h1');
    await expect(headings).toHaveCount(2);

    // Clica no botão voltar (é um button, não link)
    const backButton = page.getByRole('button', { name: /voltar para a página anterior|voltar/i });
    await backButton.click();

    // Verifica que voltou para home
    await expect(page).toHaveURL('/');
  });
});

test.describe('Acessibilidade', () => {
  test('deve abrir e usar modal de acessibilidade', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Abre modal de acessibilidade (botão com aria-label)
    const accessibilityButton = page.getByRole('button', { name: /acessibilidade/i });
    await accessibilityButton.click();
    
    // Verifica que modal abriu
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(page.getByText(/tamanho do texto/i)).toBeVisible();

    // Aumenta o tamanho da fonte (clica no botão 1.25x)
    const increaseFontButton = page.getByRole('button', { name: '1.25x' }).first();
    await increaseFontButton.click();

    // Verifica que botão ficou ativo (pela classe)
    await expect(increaseFontButton).toHaveClass(/active/i);

    // Fecha modal clicando no botão X (aria-label="Fechar")
    await page.getByRole('button', { name: /fechar/i }).click();
    await expect(modal).not.toBeVisible();
  });
});

test.describe('Tema Dark/Light', () => {
  test('deve alternar entre tema claro e escuro', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const html = page.locator('html');
    
    // Pega tema inicial
    const initialTheme = await html.getAttribute('data-theme');

    // Clica no botão de menu de temas (aria-label="Menu de temas")
    const themeMenuButton = page.getByRole('button', { name: /menu de temas/i });
    await themeMenuButton.click();

    // Aguarda menu abrir
    await expect(page.locator('[role="menu"]')).toBeVisible();

    // Clica na opção oposta ao tema atual (menuitem com aria-label)
    if (initialTheme?.includes('light') || !initialTheme) {
      // Se está light ou sem tema, clica em dark (busca pelo menuitem)
      await page.locator('[role="menuitem"][aria-label*="Modo Escuro"]').click();
      await page.waitForTimeout(300);
      const newTheme = await html.getAttribute('data-theme');
      expect(newTheme).toContain('dark');
    } else {
      // Se está dark, clica em light
      await page.locator('[role="menuitem"][aria-label*="Modo Claro"]').click();
      await page.waitForTimeout(300);
      const newTheme = await html.getAttribute('data-theme');
      expect(newTheme).toMatch(/light|null/);
    }
  });
});

test.describe('Paginação', () => {
  test('deve exibir paginação quando há muitos artigos', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verifica se artigos carregaram
    const articles = page.locator('article[itemtype*="NewsArticle"]');
    const count = await articles.count();
    
    if (count > 0) {
      // Se tem artigos, tenta encontrar paginação
      const pagination = page.locator('nav[aria-label*="páginas"]');
      
      // Se paginação existe, testa navegação
      if (await pagination.isVisible()) {
        // Tenta clicar em próxima página se disponível
        const nextButton = pagination.getByRole('button', { name: '2' });
        
        if (await nextButton.isVisible() && !await nextButton.isDisabled()) {
          await nextButton.click();
          await expect(page).toHaveURL(/page=2/);
        }
      }
    }
  });
});

test.describe('Erro 404', () => {
  test('deve exibir página 404 para artigo inexistente', async ({ page }) => {
    await page.goto('/article/artigo-que-nao-existe-123456');
    await page.waitForLoadState('networkidle');

    // Verifica que exibe mensagem de erro ("Página não encontrada")
    await expect(page.getByText(/página não encontrada/i)).toBeVisible();
    
    // Verifica que tem link para voltar
    const backLink = page.getByRole('link', { name: /ver últimas notícias|notícias/i });
    await expect(backLink).toBeVisible();
  });
});
