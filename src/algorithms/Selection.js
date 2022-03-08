import { delay } from '../helper'
const selection = async (array, speed, setArray, ac, animated = true) => {
  for (let i = 0; i < array.length; i++) {
    let indexOfMin = i
    //color
    if (animated) {
      array[i].color = 'blue'
      setArray([...array])
    }

    for (let j = i + 1; j < array.length; j++) {
      if (animated) {
        array[j].color = 'gray'
        setArray([...array])
        await delay(speed, { signal: ac.signal })
      }

      if (array[j].value < array[indexOfMin].value) {
        if (animated && indexOfMin !== i) {
          array[indexOfMin].color = '#56DDD2'
          setArray([...array])
        }
        indexOfMin = j
      } else if (animated) {
        array[j].color = '#56DDD2'
        setArray([...array])
      }
    }

    if (indexOfMin !== i) {
      if (animated) {
        array[indexOfMin].color = '#56DDD2'
        setArray([...array])
      }
      let lesser = array[indexOfMin]
      array[indexOfMin] = array[i]
      array[i] = lesser
    }
    if (animated) {
      array[indexOfMin].color = '#56DDD2'
      array[i].color = 'green'
      setArray([...array])
    }
  }

  if (animated) setArray([...array])
}

export default selection
