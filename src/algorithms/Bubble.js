import { delay } from '../helper'

const Bubble = async (array, speed, setArray, ac) => {
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

        setArray([...array])
        await delay(speed, { signal: ac.signal })

        array[j].sorting = false
        array[j + 1].sorting = false
        setArray([...array])
      }
    }
    array[array.length - 1 - i].sorted = true
    setArray([...array])
  }
  array[0].sorted = true
  setArray([...array])
}

export default Bubble
