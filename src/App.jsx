import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { randomNum, shuffleArray } from './helper'
let ac

import './App.css'
import { bubble, mergeSort, quick, selection } from './algorithms'

function App() {
  const [array, setArray] = useState([])
  const [arraySize, setArraySize] = useState(10)
  const [speed, setSpeed] = useState(10)
  const [runTime, setRunTime] = useState(0)
  const [runTimeTrue, setRunTimeTrue] = useState(0)
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
    setRunTime(0)
    setRunTimeTrue(0)
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
    setRunTimeTrue(0)
    setArray([...arr])
  }

  const bubbleSort = async () => {
    ac = new AbortController()
    const start = performance.now()
    setSorting(true)
    await bubble(array, speed, setArray, ac)
    setRunTime(Math.floor(performance.now() - start))

    const startNoAni = performance.now()
    await bubble(array, speed, setArray, ac, false)
    setRunTimeTrue((performance.now() - startNoAni).toFixed(4))

    setSorting(false)
    setSorted(true)
  }

  const mergeAlgo = async () => {
    ac = new AbortController()
    const start = performance.now()
    setSorting(true)
    await mergeSort(array, 0, Number(array.length) - 1, speed, setArray, ac)
    setSorting(false)
    setSorted(true)
    setRunTime(Math.floor(performance.now() - start))
  }

  const selectionSort = async () => {
    setSorting(true)
    ac = new AbortController()
    const start = performance.now()
    await selection(array, speed, setArray, ac)
    setRunTime(Math.floor(performance.now() - start))
    const startNoAni = performance.now()
    selection(array, speed, setArray, ac, false)
    setRunTimeTrue((performance.now() - startNoAni).toFixed(2))

    setSorting(false)
    setSorted(true)
  }

  const quickSort = async () => {
    ac = new AbortController()
    const start = performance.now()
    setSorting(true)
    await quick(array, 0, Number(array.length) - 1, speed, setArray, ac)
    setRunTime(Math.floor(performance.now() - start))
    const startNoAni = performance.now()
    await quick(array, 0, Number(array.length) - 1, speed, setArray, ac, false)
    setRunTimeTrue((performance.now() - startNoAni).toFixed(4))
    setSorting(false)
    setSorted(true)
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

        <button
          className="app__button shuffle"
          onClick={shuffle}
          disabled={sorting}
        >
          Shuffle
        </button>

        {/* sorting algos */}
        <div className="app__navbar-buttons">
          <button
            className="app__button"
            onClick={bubbleSort}
            disabled={sorting || sorted}
          >
            Bubble Sort
          </button>
          <button
            className="app__button"
            onClick={mergeAlgo}
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
        <div className="app__runTime">Animated time: {runTime}ms</div>
      )}
      {sorted && runTimeTrue !== 0 && (
        <div className="app__runTime">Run time: {runTimeTrue}ms</div>
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
