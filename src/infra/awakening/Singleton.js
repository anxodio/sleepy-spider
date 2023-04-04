const Singleton = (function() {
  let instance

  function Singleton() {
    if (instance) {
      return instance
    }
    instance = this
    this.value = 0
    this.increment = function(newValue = 1) {
      this.value += Number(newValue)
    }
    this.update = function(newValue) {
      this.value = Number(newValue)
    }
  }

  return Singleton
})()

export { Singleton }
