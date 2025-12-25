export const safeLocalStorageSet = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Erro ao salvar localStorage[${key}]:`, error);
    return false;
  }
};

export const safeLocalStorageGet = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Erro ao ler localStorage[${key}]:`, error);
    return null;
  }
};


export const safeLocalStorageRemove = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Erro ao remover localStorage[${key}]:`, error);
    return false;
  }
};
