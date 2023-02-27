const debounce = function (cb, ms = 700) {
  let timer;
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb.apply(this, arguments)
    }, ms)
  }
}
