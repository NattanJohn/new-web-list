import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração do Playwright para testes E2E
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  
  /* Executa testes em paralelo */
  fullyParallel: true,
  
  /* Falha CI se deixou test.only no código */
  forbidOnly: !!process.env.CI,
  
  /* Retry em CI, sem retry local */
  retries: process.env.CI ? 2 : 0,
  
  /* Workers otimizados */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter: HTML para local, GitHub Actions para CI */
  reporter: 'html',
  
  /* Configuração compartilhada entre testes */
  use: {
    /* URL base para testes */
    baseURL: 'http://localhost:3000',
    
    /* Captura screenshot apenas em falhas */
    screenshot: 'only-on-failure',
    
    /* Captura vídeo apenas em retry */
    video: 'retain-on-failure',
    
    /* Trace apenas em CI ou primeira falha */
    trace: 'on-first-retry',
  },

  /* Configura servidor de dev local para testes */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  /* Apenas Chromium para economizar tempo/espaço */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
