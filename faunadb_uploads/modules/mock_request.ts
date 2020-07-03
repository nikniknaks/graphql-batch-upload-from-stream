const pause = delaySeconds => new Promise(r => setTimeout(r, delaySeconds*1000))

const mockRequestOne = async (data) => {
  await pause(1)
  return 'one complete'
}

const mockRequestTwo = async (data) => {
  await pause(2)
  return 'two complete'
}

const mockRequestThree = async (data) => {
  let totalString = ''
  for (const item of data) {
    totalString += JSON.stringify(item)
  }
  console.log(Buffer.byteLength(Buffer.from(totalString)))
  await pause(3)
  return 'three complete'
}

const requests = [mockRequestOne, mockRequestTwo, mockRequestThree]

module.exports = requests