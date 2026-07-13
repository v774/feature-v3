export type Category = { slug: string; enabled: boolean; size: 'large' | 'small' | 'wide' }
export const categories: Category[] = [
  { slug: 'logo-animation', enabled: true, size: 'large' },
  { slug: 'icons', enabled: true, size: 'small' },
  { slug: 'lottie-ui', enabled: true, size: 'small' },
  { slug: 'posters', enabled: true, size: 'wide' },
]
