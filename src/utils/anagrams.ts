export function getAnagrams(source: string | string[]) {

  if (source.length < 2) {
    return [...source];
  }

  const anagrams: string[] = [];
  const letters = [...source];

  letters.forEach((letter, idx) => {
    const without = [...letters];
    without.splice(idx, 1);
    getAnagrams(without).forEach(anagram => {
      anagrams.push(letter + anagram);
    })
  })

  return anagrams;
}

export function getDistinct(anagrams: string[]) {
  return [...new Set(anagrams)];
}