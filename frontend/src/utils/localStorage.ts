export const safeLocalStorageSet = (key: string, value: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Erro ao salvar localStorage[${key}]:`, error);
    return false;
  }
};

export const safeLocalStorageGet = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Erro ao ler localStorage[${key}]:`, error);
    return null;
  }
};


export const safeLocalStorageRemove = (key: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Erro ao remover localStorage[${key}]:`, error);
    return false;
  }
};
