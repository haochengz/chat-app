
function waitForEach(processFunc, [head, ...tail]) {
  !head
    ? Promise.resolve()
    : processFunc(head).then(() => waitForEach(processFunc, tail))
}

function startsAll(processFunc, [head, ...tail]) {
  !head
    ? Promise.resolve()
    : processFunc(head).then(startsAll(processFunc, tail))
}

function afterAllWithWaitForEach(processFunc, [head, ...tail], cb) {
  !head
    ? cb()
    : processFunc(head).then(() => afterAllWithWaitForEach(processFunc, tail, cb))
}

module.exports = {
  waitForEach,
  startsAll,
  afterAllWithWaitForEach
}