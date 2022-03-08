import { delay } from '../helper'
const mergeSort = async (arr, l, r, speed, setArray, ac) => {
  if (l >= r) return

  const m = l + Math.floor((r - l) / 2)
  await mergeSort(arr, l, m, speed, setArray, ac)
  await mergeSort(arr, m + 1, r, speed, setArray, ac)
  await merge(arr, l, m, r, speed, setArray, ac, arr)
}

async function merge(ele, low, mid, high, speed, setArray, ac, array) {
  const n1 = mid - low + 1
  const n2 = high - mid
  let left = new Array(n1)
  let right = new Array(n2)

  for (let i = 0; i < n1; i++) {
    await delay(speed, { signal: ac.signal })
    // color
    const updatedColor = [...array]
    updatedColor[low + i].color = 'orange'
    setArray([...updatedColor])
    left[i] = ele[low + i].value
  }
  for (let i = 0; i < n2; i++) {
    await delay(speed, { signal: ac.signal })
    // color
    const updatedColor = [...array]
    updatedColor[mid + 1 + i].color = 'yellow'
    setArray([...updatedColor])
    right[i] = ele[mid + 1 + i].value
  }

  await delay(speed, { signal: ac.signal })

  let i = 0,
    j = 0,
    k = low
  while (i < n1 && j < n2) {
    await delay(speed, { signal: ac.signal })
    // To add color for which two r being compared for merging
    if (parseInt(left[i]) <= parseInt(right[j])) {
      // color
      if (n1 + n2 === ele.length) {
        const updatedColor = [...array]
        updatedColor[k].color = 'green'
        setArray([...updatedColor])
      } else {
        const updatedColor = [...array]
        updatedColor[k].color = 'lightgreen'
        setArray([...updatedColor])
      }

      ele[k].value = left[i]
      i++
      k++
    } else {
      // color
      if (n1 + n2 === ele.length) {
        const updatedColor = [...array]
        updatedColor[k].color = 'green'
        setArray([...updatedColor])
      } else {
        const updatedColor = [...array]
        updatedColor[k].color = 'lightgreen'
        setArray([...updatedColor])
      }
      ele[k].value = right[j]
      j++
      k++
    }
  }
  while (i < n1) {
    // color
    if (n1 + n2 === ele.length) {
      const updatedColor = [...array]
      updatedColor[k].color = 'green'
      setArray([...updatedColor])
    } else {
      const updatedColor = [...array]
      updatedColor[k].color = 'lightgreen'
      setArray([...updatedColor])
    }
    ele[k].value = left[i]
    i++
    k++
  }
  while (j < n2) {
    // color
    if (n1 + n2 === ele.length) {
      const updatedColor = [...array]
      updatedColor[k].color = 'green'
      setArray([...updatedColor])
      // setArray([...array, (array[k].color = 'green')])
    } else {
      const updatedColor = [...array]
      updatedColor[k].color = 'lightgreen'
      setArray([...updatedColor])
      // setArray([...array, (array[k].color = 'lightgreen')])
    }
    ele[k].value = right[j]
    j++
    k++
  }
}

export default mergeSort
