const fs = require('node:fs')
const data = fs.readFileSync('data.txt', 'utf8').split('\n')

// The Elf would first like to know which games would have been
// possible if the bag contained only 12 red cubes, 13 green cubes,
// and 14 blue cubes?

const R = 12
const G = 13
const B = 14

const games = data.map((game) => {
  const sets = game.split(': ')[1].split('; ')
  const draws = sets.map((rawDraw) => {
    // keeping RGB as sequence in my arrays
    const draw = [0, 0, 0]
    const rgbDraws = rawDraw.split(', ')

    rgbDraws.forEach((e) => {
      let toInsetIndex = 0
      const [value, color] = e.split(' ')
      if (color === 'green') toInsetIndex = 1
      else if (color === 'blue') toInsetIndex = 2
      draw[toInsetIndex] = parseInt(value)
    })

    return draw
  })

  return draws
})

const possibleGamesIDSum = games.reduce((possibleGames, game, id) => {
  let isGamePosible = game.every((draw) => {
    return draw[0] <= R && draw[1] <= G && draw[2] <= B
  })

  return isGamePosible ? possibleGames + id + 1 : possibleGames
}, 0)

console.log(possibleGamesIDSum) // 2239

// For each game, find the minimum set of cubes that must
// have been present. What is the sum of the power of these sets?

const powerSum = games.reduce((powerSum, game) => {
  let minR = 0
  let minG = 0
  let minB = 0

  game.forEach((draw) => {
    if (draw[0] > minR) minR = draw[0]
    if (draw[1] > minG) minG = draw[1]
    if (draw[2] > minB) minB = draw[2]
  })

  return powerSum + minR * minG * minB
}, 0)

console.log(powerSum) // 83435
