export const OPTIMIZED_BLUR_DATA_URL = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5"%3E%3Cfilter id="b" color-interpolation-filters="sRGB"%3E%3CfeGaussianBlur stdDeviation="1"/%3E%3C/filter%3E%3Crect width="8" height="5" fill="%23f5f5f5" filter="url(%23b)"/%3E%3C/svg%3E';

export const generateBlurPlaceholder = (
  width: number = 800,
  height: number = 450,
  theme: 'light' | 'dark' = 'light'
): string => {
  const bgColor = theme === 'light' ? '%23f0f0f0' : '%23303030';
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>
    <rect fill='${bgColor}' width='${width}' height='${height}'/>
    <text x='50%' y='50%' font-size='24' fill='%23999' text-anchor='middle' dy='.3em' font-family='system-ui'>
      Carregando imagem...
    </text>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

export const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const allowedDomains = [
      'picsum.photos',
      'via.placeholder.com',
      'images.unsplash.com',
      'images.pexels.com',
    ];

    return allowedDomains.some(domain => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
};

export const optimizePicsumUrl = (
  seed: string | number,
  width: number = 800,
  height: number = 450
): string => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}?random=${Math.random()}`;
};

export const calculateAspectRatio = (
  width: number,
  height: number
): string => {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor} / ${height / divisor}`;
};

export const getOptimizedDimensions = (context: 'card' | 'detail' | 'thumbnail') => {
  const dimensions = {
    card: { width: 800, height: 450, aspectRatio: '16 / 9' },
    detail: { width: 1200, height: 630, aspectRatio: '21 / 9' },
    thumbnail: { width: 200, height: 200, aspectRatio: '1 / 1' },
  };

  return dimensions[context] || dimensions.card;
};

export const getImageFallbackUrl = (): string => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>
    <defs>
      <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' style='stop-color:%230056b3;stop-opacity:0.2' />
        <stop offset='100%' style='stop-color:%234da3ff;stop-opacity:0.2' />
      </linearGradient>
    </defs>
    <rect fill='%23f5f5f5' width='800' height='450'/>
    <rect fill='url(%23grad)' width='800' height='450'/>
    <text x='400' y='225' font-size='28' fill='%23888' text-anchor='middle' font-family='system-ui' font-weight='bold'>
      Imagem não disponível
    </text>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

export const getImageQuality = (): number => {
  if (typeof window !== 'undefined') {
    return window.devicePixelRatio > 1 ? 75 : 85;
  }
  return 85;
};
