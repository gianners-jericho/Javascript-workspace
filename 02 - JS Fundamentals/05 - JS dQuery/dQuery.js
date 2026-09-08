class lib {
  constructor(target) {
    self.target = target
  }

  elements() {
    return document.querySelectorAll(self.target)
  }

  hide() {
    for (const element of self.elements()) {
      element.style.display = "none"
    }
    return self
  }

  show() {
    for (const element of self.elements()) {
      element.style.display = ""
    }
    return self
  }

  click(callback) {
    for (const element of self.elements()) {
      element.addEventListener('click', callback)
    }
    return self
  }

  on(eventName, callback) {
    for (const element of self.elements()) {
      element.addEventListener(eventName, callback)
    }
    return self
  }

  each(callback) {
    let index = 0
    for (const element of self.elements()) {
      callback.call(element, element, index)
      index++
    }
    return self
  }

  text(newText) {
    if (newText === undefined) {
      return self.elements()[0] ? self.elements()[0].textContent : ''
    }
    for (const element of self.elements()) {
      element.textContent = newText
    }
    return self
  }

  css(property, value) {
    for (const element of self.elements()) {
      element.style[property] = value
    }
    return self
  }
}

function $query(target) {
  return new lib(target)
}
