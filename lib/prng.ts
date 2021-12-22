/* eslint-disable */

/**
 * ES6/TS Implementation of the MurmurHash3 seed generator.
 *
 * @see {@link https://github.com/bryc/code/blob/master/jshash/PRNGs.md#addendum-a-seed-generating-functions}
 */
export function xmur3a(str: string) {
  for (var k, i = 0, h = 2166136261 >>> 0; i < str.length; i++) {
    k = Math.imul(str.charCodeAt(i), 3432918353);
    k = (k << 15) | (k >>> 17);
    h ^= Math.imul(k, 461845907);
    h = (h << 13) | (h >>> 19);
    h = (Math.imul(h, 5) + 3864292196) | 0;
  }
  h ^= str.length;
  return function generate() {
    h ^= h >>> 16;
    h = Math.imul(h, 2246822507);
    h ^= h >>> 13;
    h = Math.imul(h, 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

/**
 * ES6/TS Implementation of the Mulberry32 pseudorandom number generator (PRNG).
 *
 * @see {@link https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32}
 */
export function mulberry32(a: number) {
  return function generate() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
