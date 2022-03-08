export const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

export const shuffleArray = (array) => {
  return array.sort(() => 0.5 - Math.random())
}
