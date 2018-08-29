
const helper = require('./helper')

function loading(item){
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(item, 'are done')
      resolve()
    }, 2000)
  })
}

console.log('Wait for each')
helper.waitForEach(loading, [1, 2, 3])

console.log('Start all')
helper.startsAll(loading, [10, 10, 10])

console.log('Compare to forEach')
;[20, 20, 20].forEach((item, index) => {
  console.log(item, index)
})
