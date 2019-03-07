export default function shuffleArray<T>(arr: T[]): T[] {
  return arr.sort(() => Math.random() - 0.5)
}
