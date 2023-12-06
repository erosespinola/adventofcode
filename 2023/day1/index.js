const fs = require('node:fs')

try {
  const data = fs.readFileSync('data.txt', 'utf8').split('\n')
  const firstSum = data.reduce((totalSum, line) => {
    const match = line.match(/\d/g)
    let lineSum = 0
    if (match) {
      lineSum = parseInt(match.at(0) + match.at(-1))
    }
    return totalSum + lineSum
  }, 0)
  // 52974

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

  const secondSum = data.reduce((totalSum, line) => {
    const match = Array.from(
      line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)
    )

    const firstDigit = numbers[match.at(0)[1]] || match.at(0)[1]
    const secondDigit = numbers[match.at(-1)[1]] || match.at(-1)[1]
    const lineSum = parseInt(firstDigit + secondDigit)
    return totalSum + lineSum
  }, 0)
  // 53340

  console.log(firstSum, secondSum)
} catch (err) {
  console.error(err)
}
