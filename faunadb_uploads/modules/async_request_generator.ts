async function* asyncRequestGenerator(object, request) {
  const result = await request(object)
  console.log('asyncRequestGenerator: ', result)
  yield result
}

module.exports = asyncRequestGenerator
