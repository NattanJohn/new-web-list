import { render, screen, waitFor, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { safeLocalStorageGet, safeLocalStorageSet } from '@/utils/localStorage';

// Mock localStorage utils
jest.mock('@/utils/localStorage', () => ({
  safeLocalStorageGet: jest.fn(),
  safeLocalStorageSet: jest.fn(),
}));

const TestComponent = () => {
  const { theme, setTheme, toggleTheme } = useTheme();
  
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}>Toggle</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (safeLocalStorageGet as jest.Mock).mockReturnValue(null);
  });

  it('should render with default light theme', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    });
  });

  it('should load saved theme from localStorage', async () => {
    (safeLocalStorageGet as jest.Mock).mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });
  });

  it('should change theme when setTheme is called', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    });

    act(() => {
      screen.getByText('Set Dark').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
      expect(safeLocalStorageSet).toHaveBeenCalledWith('gazeta-theme', 'dark');
    });
  });

  it('should toggle theme', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    });

    act(() => {
      screen.getByText('Toggle').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });

    act(() => {
      screen.getByText('Toggle').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    });
  });

  it('should update data-theme attribute on document', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    });

    act(() => {
      screen.getByText('Set Dark').click();
    });

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  it('should preserve high-contrast suffix when changing theme', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toBeDefined();
    });

    // Simular alto contraste ativo
    act(() => {
      document.documentElement.setAttribute('data-theme', 'light-high-contrast');
    });

    act(() => {
      screen.getByText('Set Dark').click();
    });

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark-high-contrast');
    });
  });

  it('should throw error when useTheme is used outside provider', () => {
    // Suprimir console.error para o teste
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme deve ser usado dentro de ThemeProvider');

    consoleError.mockRestore();
  });
});
