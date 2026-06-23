/**
 * Generates a stable, friendly illustrated avatar for a given seed string.
 * Using a seed-based generator (rather than stock photos) keeps every
 * friend's picture consistent across reloads with zero licensing concerns.
 */
export function avatarUrl(seed, size = 160) {
  const encoded = encodeURIComponent(seed || 'KeenKeeper')
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encoded}&size=${size}&backgroundType=gradientLinear&backgroundColor=244d3f,2f6650`
}
