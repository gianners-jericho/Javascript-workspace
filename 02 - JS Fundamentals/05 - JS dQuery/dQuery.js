class lib {
  constructor(target) {
    this.target = target
  }

  elements() {
    return document.querySelectorAll(this.target)
  }

  hide() {
    for (const element of this.elements()) {
      element.style.display = "none"
    }
    return this
  }

  show() {
    for (const element of this.elements()) {
      element.style.display = ""
    }
    return this
  }

  click(callback) {
    for (const element of this.elements()) {
      element.addEventListener('click', callback)
    }
    return this
  }

  on(eventName, callback) {
    for (const element of this.elements()) {
      element.addEventListener(eventName, callback)
    }
    return this
  }

  each(callback) {
    let index = 0
    for (const element of this.elements()) {
      callback.call(element, element, index)
      index++
    }
    return this
  }

  text(newText) {
    if (newText === undefined) {
      return this.elements()[0] ? this.elements()[0].textContent : ''
    }
    for (const element of this.elements()) {
      element.textContent = newText
    }
    return this
  }

  css(property, value) {
    for (const element of this.elements()) {
      element.style[property] = value
    }
    return this
  }
}

function $query(target) {
  return new lib(target)
}
