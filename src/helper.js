export const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

export const shuffleArray = (array) => {
  return array.sort(() => 0.5 - Math.random())
}

export function delay(ms, { signal } = {}) {
  return new Promise((resolve, reject) => {
    const listener = () => {
      clearTimeout(timer)
      // reject(new Error('Aborted'))
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', listener)
      resolve('')
    }, ms)
    if (signal?.aborted) {
      listener()
    }
    signal?.addEventListener('abort', listener)
  })
}
