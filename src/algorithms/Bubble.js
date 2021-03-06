import { delay } from '../helper'

const bubble = async (array, speed, setArray, ac, animate = true) => {
  for (let i = 0; i < array.length; i++) {
    // Last i elements are already in place
    for (let j = 0; j < array.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (array[j].value > array[j + 1].value) {
        // If the condition is true then swap them
        let temp = array[j].value
        array[j].value = array[j + 1].value
        array[j + 1].value = temp

        array[j].sorting = true
        array[j + 1].sorting = true

        if (animate) {
          setArray([...array])
          await delay(speed, { signal: ac.signal })
        }

        array[j].sorting = false
        array[j + 1].sorting = false
        if (animate) setArray([...array])
      }
    }
    array[array.length - 1 - i].sorted = true
    if (animate) setArray([...array])
  }
  array[0].sorted = true
  if (animate) setArray([...array])
  console.log('here')
}

export default bubble
