const debounce = function (cb, ms = 1000) {
  let timer;
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb.apply(this, arguments)
    }, ms)
  }
}
