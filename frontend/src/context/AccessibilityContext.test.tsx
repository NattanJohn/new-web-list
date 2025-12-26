import { render, screen, waitFor, act } from '@testing-library/react';
import { AccessibilityProvider, useAccessibility, ACCESSIBILITY_LEVELS } from './AccessibilityContext';
import { ThemeProvider } from './ThemeContext';
import { safeLocalStorageGet, safeLocalStorageSet } from '@/utils/localStorage';

// Mock localStorage utils
jest.mock('@/utils/localStorage', () => ({
  safeLocalStorageGet: jest.fn(),
  safeLocalStorageSet: jest.fn(),
}));

const TestComponent = () => {
  const { fontSize, lineHeight, highContrast, grayscale, updateConfig, resetConfig } = useAccessibility();
  
  return (
    <div>
      <span data-testid="font-size">{fontSize}</span>
      <span data-testid="line-height">{lineHeight}</span>
      <span data-testid="high-contrast">{highContrast.toString()}</span>
      <span data-testid="grayscale">{grayscale.toString()}</span>
      
      <button onClick={() => updateConfig('fontSize', 1.5)}>Increase Font</button>
      <button onClick={() => updateConfig('lineHeight', 1.6)}>Increase Line Height</button>
      <button onClick={() => updateConfig('highContrast', true)}>Enable High Contrast</button>
      <button onClick={() => updateConfig('grayscale', true)}>Enable Grayscale</button>
      <button onClick={resetConfig}>Reset</button>
    </div>
  );
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <AccessibilityProvider>
        {component}
      </AccessibilityProvider>
    </ThemeProvider>
  );
};

describe('AccessibilityContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (safeLocalStorageGet as jest.Mock).mockReturnValue(null);
    // Limpar filtros e estilos do document
    document.documentElement.style.filter = '';
    document.documentElement.style.removeProperty('--text-scale');
    document.documentElement.style.removeProperty('--content-line-height');
  });

  it('should render with default config', async () => {
    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('font-size')).toHaveTextContent('1');
      expect(screen.getByTestId('line-height')).toHaveTextContent('normal');
      expect(screen.getByTestId('high-contrast')).toHaveTextContent('false');
      expect(screen.getByTestId('grayscale')).toHaveTextContent('false');
    });
  });

  it('should load saved config from localStorage', async () => {
    const savedConfig = {
      fontSize: 1.5,
      lineHeight: 1.6,
      highContrast: true,
      grayscale: false,
    };
    (safeLocalStorageGet as jest.Mock).mockReturnValue(JSON.stringify(savedConfig));

    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('font-size')).toHaveTextContent('1.5');
      expect(screen.getByTestId('line-height')).toHaveTextContent('1.6');
      expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
    });
  });

  it('should update font size', async () => {
    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('font-size')).toHaveTextContent('1');
    });

    act(() => {
      screen.getByText('Increase Font').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('font-size')).toHaveTextContent('1.5');
      expect(document.documentElement.style.getPropertyValue('--text-scale')).toBe('1.5');
    });
  });

  it('should update line height', async () => {
    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('line-height')).toHaveTextContent('normal');
    });

    act(() => {
      screen.getByText('Increase Line Height').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('line-height')).toHaveTextContent('1.6');
      expect(document.documentElement.style.getPropertyValue('--content-line-height')).toBe('1.6');
    });
  });

  it('should enable high contrast mode', async () => {
    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('high-contrast')).toHaveTextContent('false');
    });

    act(() => {
      screen.getByText('Enable High Contrast').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
      expect(document.documentElement.getAttribute('data-theme')).toContain('-high-contrast');
    });
  });

  it('should enable grayscale mode', async () => {
    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('grayscale')).toHaveTextContent('false');
    });

    act(() => {
      screen.getByText('Enable Grayscale').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('grayscale')).toHaveTextContent('true');
      expect(document.documentElement.style.filter).toBe('grayscale(1)');
    });
  });

  it('should reset all configs to default', async () => {
    renderWithProviders(<TestComponent />);

    // Mudar algumas configurações
    act(() => {
      screen.getByText('Increase Font').click();
      screen.getByText('Enable High Contrast').click();
      screen.getByText('Enable Grayscale').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('font-size')).toHaveTextContent('1.5');
      expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
      expect(screen.getByTestId('grayscale')).toHaveTextContent('true');
    });

    // Reset
    act(() => {
      screen.getByText('Reset').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('font-size')).toHaveTextContent('1');
      expect(screen.getByTestId('line-height')).toHaveTextContent('normal');
      expect(screen.getByTestId('high-contrast')).toHaveTextContent('false');
      expect(screen.getByTestId('grayscale')).toHaveTextContent('false');
    });
  });

  it('should persist config to localStorage on change', async () => {
    renderWithProviders(<TestComponent />);

    act(() => {
      screen.getByText('Increase Font').click();
    });

    await waitFor(() => {
      expect(safeLocalStorageSet).toHaveBeenCalledWith(
        'gazeta-news-acc',
        expect.stringContaining('"fontSize":1.5')
      );
    });
  });

  it('should sync with storage events', async () => {
    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('font-size')).toHaveTextContent('1');
    });

    const newConfig = {
      fontSize: 2,
      lineHeight: 2,
      highContrast: true,
      grayscale: true,
    };

    // Simular evento de storage (outra aba mudou)
    act(() => {
      const event = new StorageEvent('storage', {
        key: 'gazeta-news-acc',
        newValue: JSON.stringify(newConfig),
      });
      window.dispatchEvent(event);
    });

    await waitFor(() => {
      expect(screen.getByTestId('font-size')).toHaveTextContent('2');
      expect(screen.getByTestId('line-height')).toHaveTextContent('2');
      expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
      expect(screen.getByTestId('grayscale')).toHaveTextContent('true');
    });
  });

  it('should throw error when used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAccessibility deve ser usado dentro de um AccessibilityProvider');

    consoleError.mockRestore();
  });

  it('should have correct accessibility levels', () => {
    expect(ACCESSIBILITY_LEVELS.fontSize).toEqual([1, 1.25, 1.5, 1.75, 2]);
    expect(ACCESSIBILITY_LEVELS.lineHeight).toEqual(['normal', 1.3, 1.6, 2]);
  });
});
