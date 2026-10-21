import { sfc32, xmur3a } from './prng';

const variants = ['blue', 'magenta', 'orange', 'purple', 'red', 'turquoise', 'ultramarine'];

/**
 * Gets Chungking color scheme code based on a seed value.
 *
 * @param seedrandom The seed used to feed the pseudorandom number generator
 * @returns The final variant string.
 */
export function getColorSchemeBySeed(seedrandom: string) {
  const seed = xmur3a(seedrandom);
  const rand = sfc32(seed(), seed(), seed(), seed());

  return variants[Math.floor(rand() * variants.length)];
}
