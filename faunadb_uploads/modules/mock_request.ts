const pause = delaySeconds => new Promise(r => setTimeout(r, delaySeconds*1000))

const mockRequestOne = async () => {
  await pause(1)
  return 'one complete'
}

const mockRequestTwo = async () => {
  await pause(2)
  return 'two complete'
}

const mockRequestThree = async () => {
  await pause(3)
  return 'three complete'
}

const requests = [mockRequestOne, mockRequestTwo, mockRequestThree]

module.exports = requests