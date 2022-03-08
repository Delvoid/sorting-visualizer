import { delay } from '../helper'

const quick = async (arr, l, r, speed, setArray, ac, animate = true) => {
  if (l < r) {
    let pivotIndex = await partition(
      arr,
      l,
      r,
      speed,
      setArray,
      ac,
      arr,
      animate
    )
    await quick(arr, l, pivotIndex - 1, speed, setArray, ac, animate)
    await quick(arr, pivotIndex + 1, r, speed, setArray, ac, animate)
    setArray([...arr])
  } else {
    if (animate && l >= 0 && r >= 0 && l < arr.length && r < arr.length) {
      const updateColor = [...arr]
      updateColor[r].color = 'green'
      updateColor[l].color = 'green'
      setArray([...updateColor])
    }
  }
}

async function partition(ele, l, r, speed, setArray, ac, array, animate) {
  let i = l - 1
  // color pivot element
  if (animate) {
    let updateColor = [...array]
    updateColor[r].color = 'red'
    setArray([...updateColor])
  }
  for (let j = l; j <= r - 1; j++) {
    // color current element
    if (animate) {
      const updateColor = [...array]
      updateColor[j].color = 'yellow'
      setArray([...updateColor])
      await delay(speed, { signal: ac.signal })
    }
    if (Number(ele[j].value) < Number(ele[r].value)) {
      i++

      let lesser = ele[j]
      ele[j] = ele[i]
      ele[i] = lesser

      // color
      if (animate) {
        let updateColor = [...array]
        updateColor[i].color = 'orange'
        setArray([...updateColor])
        if (i != j) {
          updateColor = [...array]
          updateColor[j].color = 'orange'
          setArray([...array])
        }
        await delay(speed, { signal: ac.signal })
      }
    } else if (animate) {
      // color if not less than pivot

      let updateColor = [...array]
      updateColor[j].color = 'pink'
      setArray([...updateColor])
    }
  }
  i++
  // pauseChamp
  if (animate) await delay(speed, { signal: ac.signal })
  let lesser = ele[r]
  ele[r] = ele[i]
  ele[i] = lesser
  // setArray([...array])
  // color

  if (animate) {
    let updateColor = [...array]
    updateColor = [...array]
    updateColor[r].color = 'pink'
    updateColor[i].color = 'green'
    setArray([...updateColor])

    // pauseChamp
    await delay(speed, { signal: ac.signal })
  }

  // color
  for (let k = 0; k < ele.length; k++) {
    if (ele[k].color != 'green') {
      // const updateColor = [...array]
      // updateColor[k].color = 'cyan'
      // setArray([...updateColor])
      array[k].color = '#56DDD2'
    }
  }

  return i
}

export default quick
