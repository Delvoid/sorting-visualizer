import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { randomNum, shuffleArray } from './helper'
let ac

import './App.css'
function App() {
  const [array, setArray] = useState([])
  const [arraySize, setArraySize] = useState(10)
  const [speed, setSpeed] = useState(10)
  const [runTime, setRunTime] = useState(0)
  const [sorting, setSorting] = useState(false)
  const [sorted, setSorted] = useState(false)
  const size = useWindowSize()

  const maxSpeed = array.length > 20 ? 100 : array.length <= 10 ? 400 : 200

  useEffect(() => {
    generateArray()
    if (speed > maxSpeed) {
      setSpeed(maxSpeed)
    }
  }, [arraySize])

  const numWidth = Math.floor(size.width / (array.length * 2))

  const generateArray = () => {
    setSorted(false)
    setSorting(false)
    if (ac) ac.abort()
    const arr = []
    for (let i = 0; i < arraySize; i++) {
      arr.push({
        value: randomNum(20, 320),
        sorting: false,
        sorted: false,
        unsorted: false,
        color: '#56DDD2',
      })
    }
    setArray(arr)
  }

  const shuffle = () => {
    setSorted(false)
    const arr = shuffleArray(array)
    arr.forEach((bar) => {
      bar.sorting = false
      bar.sorted = false
      bar.unsorted = false
      bar.color = '#56DDD2'
    })
    setRunTime(0)
    setArray([...arr])
  }

  const bubbleSort = async () => {
    const start = performance.now()
    setSorting(true)
    ac = new AbortController()
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
    setSorting(false)
    setSorted(true)
    setRunTime(Math.floor(performance.now() - start))
  }

  const mergeAlgo = async () => {
    const start = performance.now()
    setSorting(true)
    await mergeSort(array, 0, Number(array.length) - 1)
    setSorting(false)
    setSorted(true)
    setRunTime(Math.floor(performance.now() - start))
  }

  const mergeSort = async (arr, l, r) => {
    if (l >= r) return

    const m = l + Math.floor((r - l) / 2)
    await mergeSort(arr, l, m)
    await mergeSort(arr, m + 1, r)
    await merge(arr, l, m, r)
    // setArray([...arr])
  }

  async function merge(ele, low, mid, high) {
    ac = new AbortController()
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

  const selectionSort = async () => {
    const start = performance.now()
    setSorting(true)
    ac = new AbortController()
    for (let i = 0; i < array.length; i++) {
      let indexOfMin = i
      //color
      array[i].color = 'blue'
      setArray([...array])

      for (let j = i + 1; j < array.length; j++) {
        array[j].color = 'gray'
        setArray([...array])

        await delay(speed, { signal: ac.signal })

        if (array[j].value < array[indexOfMin].value) {
          if (indexOfMin !== i) {
            array[indexOfMin].color = '#56DDD2'
            setArray([...array])
          }
          indexOfMin = j
        } else {
          array[j].color = '#56DDD2'
          setArray([...array])
        }
      }

      if (indexOfMin !== i) {
        array[indexOfMin].color = '#56DDD2'
        setArray([...array])
        let lesser = array[indexOfMin]
        array[indexOfMin] = array[i]
        array[i] = lesser
      }

      array[indexOfMin].color = '#56DDD2'
      array[i].color = 'green'
      setArray([...array])
    }

    setArray([...array])
    setSorting(false)
    setSorted(true)
    setRunTime(Math.floor(performance.now() - start))
  }

  const quickSort = async () => {
    const start = performance.now()
    setSorting(true)
    await _quickSort(array, 0, Number(array.length) - 1)
    setSorting(false)
    setSorted(true)
    setRunTime(Math.floor(performance.now() - start))
  }

  const _quickSort = async (ele, l, r) => {
    if (l < r) {
      let pivotIndex = await partition(ele, l, r)
      await _quickSort(ele, l, pivotIndex - 1)
      await _quickSort(ele, pivotIndex + 1, r)
      setArray([...ele])
    } else {
      if (l >= 0 && r >= 0 && l < ele.length && r < ele.length) {
        const updateColor = [...array]
        updateColor[r].color = 'green'
        updateColor[l].color = 'green'
        setArray([...updateColor])
      }
    }

    async function partition(ele, l, r) {
      ac = new AbortController()
      let i = l - 1
      // color pivot element
      let updateColor = [...array]
      updateColor[r].color = 'red'
      setArray([...updateColor])
      for (let j = l; j <= r - 1; j++) {
        // color current element
        const updateColor = [...array]
        updateColor[j].color = 'yellow'
        setArray([...updateColor])
        await delay(speed, { signal: ac.signal })
        if (Number(ele[j].value) < Number(ele[r].value)) {
          i++

          let lesser = ele[j]
          ele[j] = ele[i]
          ele[i] = lesser

          // color
          let updateColor = [...array]
          updateColor[i].color = 'orange'
          setArray([...updateColor])
          if (i != j) {
            updateColor = [...array]
            updateColor[j].color = 'orange'
            setArray([...array])
          }

          await delay(speed, { signal: ac.signal })
        } else {
          // color if not less than pivot
          let updateColor = [...array]
          updateColor[j].color = 'pink'
          setArray([...updateColor])
        }
      }
      i++
      // pauseChamp
      await delay(speed, { signal: ac.signal })
      let lesser = ele[r]
      ele[r] = ele[i]
      ele[i] = lesser
      // setArray([...array])
      // color

      updateColor = [...array]
      updateColor[r].color = 'pink'
      updateColor[i].color = 'green'

      setArray([...updateColor])

      // pauseChamp
      await delay(speed, { signal: ac.signal })

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
  }
  return (
    <div className="App">
      <header>
        <h1>Sorting Visualizer</h1>
      </header>
      <nav className="app__navbar">
        {/* new array */}
        <button className="app__button new" onClick={generateArray}>
          New Array
        </button>
        {/* sliders */}
        <div className="app__navbar-sliders">
          <div className="range">
            <label>Array {arraySize}</label>
            <div className="field">
              <div className="value left">5</div>
              <input
                min={5}
                max={60}
                step={1}
                type="range"
                value={arraySize}
                disabled={sorting}
                className={`slider`}
                id="arrayLength"
                onChange={(e) => setArraySize(e.target.value)}
              />
              <div className="value right">60</div>
            </div>
          </div>
          <div className="range">
            <label>Delay {speed}</label>
            <div className="field">
              <div className="value left">0</div>
              <input
                min={0}
                max={maxSpeed}
                step={20}
                type="range"
                value={speed}
                disabled={sorting}
                className={`slider`}
                id="arrayLength"
                onChange={(e) => setSpeed(e.target.value)}
              />
              <div className="value right">{maxSpeed}</div>
            </div>
          </div>
        </div>

        {/* sorting algos */}
        <div className="app__navbar-buttons">
          <button className="app__button" onClick={shuffle} disabled={sorting}>
            Shuffle
          </button>
          <button
            className="app__button"
            onClick={bubbleSort}
            disabled={sorting || sorted}
          >
            Bubble Sort
          </button>
          <button
            className="app__button"
            onClick={() => mergeAlgo()}
            disabled={sorting || sorted}
          >
            Merge Sort
          </button>
          <button
            className="app__button"
            onClick={selectionSort}
            disabled={sorting || sorted}
          >
            Selection Sort
          </button>
          <button
            className="app__button"
            onClick={quickSort}
            disabled={sorting || sorted}
          >
            Quick Sort
          </button>
        </div>
      </nav>
      <div className="app__array app__flex">
        {array.length &&
          array.map((bar, index) => (
            <motion.div
              layout
              transition={{ type: 'spring', damping: 18, stiffness: 150 }}
              className="app__array-bar"
              key={index}
              style={{
                width: `${numWidth}px`,
                height: `${bar.value}px`,
                backgroundColor: bar.sorted
                  ? 'green'
                  : bar.sorting
                  ? '#fff'
                  : `${bar.color}`,
              }}
            >
              <span>{array.length > 20 ? '' : bar.value}</span>
            </motion.div>
          ))}
      </div>
      {sorted && runTime && (
        <div className="app__runTime">Run time: {runTime}ms</div>
      )}
    </div>
  )
}

export default App

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

function delay(ms, { signal } = {}) {
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
