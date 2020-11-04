'use strict'

const generateTwoFactorCode = async () => {
  const random = generateRandomNumbers(6)
  console.log('Two Factor Auth Code: ' + random)
  return random
}

function generateRandomNumbers (length) {
  const ran1 = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].sort((x, z) => {
    const ren = Math.random()
    if (ren === 0.5) return 0
    return ren > 0.5 ? 1 : -1
  })
  const ran2 = () => ran1().sort((x, z) => {
    const ren = Math.random()
    if (ren === 0.5) return 0
    return ren > 0.5 ? 1 : -1
  })

  return Array(length).fill(null).map(x => ran2()[(Math.random() * 9).toFixed()]).join('')
}

module.exports = {
  generateTwoFactorCode
}
