const fs = require('node:fs')
const data = fs.readFileSync('data.txt', 'utf8').split('\n')

// Consider your entire calibration document.
// What is the sum of all of the calibration values?

const calibrationSum = data.reduce((totalSum, line) => {
  const match = line.match(/\d/g)
  let lineSum = 0
  if (match) {
    lineSum = parseInt(match.at(0) + match.at(-1))
  }
  return totalSum + lineSum
}, 0)

console.log(calibrationSum) // 52974

// What is the sum of all of the calibration values? (with written numbers)

const numbers = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

const secondCalibrationSum = data.reduce((totalSum, line) => {
  const match = Array.from(
    line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)
  )

  const firstDigit = numbers[match.at(0)[1]] || match.at(0)[1]
  const secondDigit = numbers[match.at(-1)[1]] || match.at(-1)[1]
  const lineSum = parseInt(firstDigit + secondDigit)
  return totalSum + lineSum
}, 0)

console.log(secondCalibrationSum) // 53340
