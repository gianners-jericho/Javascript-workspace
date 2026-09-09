# Feature Implementation Guide: `cLibrary` (Multi-Paradigm Circle Library)

## Overview & Architecture
This implementation guide provides complete, self-contained, copy-pasteable code and in-depth technical documentation for building `cLibrary`—an interactive Object-Oriented JavaScript circle library.

The library allows consumers to instantiate a batch of animated circles and mount them to any DOM container using the following API contract:
```javascript
let cLib = new Circles(100);
cLib.draw_circles("canvas");
```

This guide details three complete implementations:
1. **ES6 Class Implementation** (`03 - JS OOP/04 - cLibrary/es6/`)
2. **ES5 with Prototype Implementation** (`03 - JS OOP/04 - cLibrary/es5_with_proto/`)
3. **ES5 without Prototype Implementation** (`03 - JS OOP/04 - cLibrary/es5_no_proto/`)

---

## 1. ES6 Class Implementation

### 1.1 File: `03 - JS OOP/04 - cLibrary/es6/circle.js`
Create this new file with the following complete implementation:

```javascript
/**
 * Utility: Generate a random integer between min and max (inclusive)
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Utility: Generate a random glowing HSL color string with alpha transparency
 * @returns {string}
 */
function getRandomColor() {
    const hue = getRandomInt(0, 360);
    const saturation = getRandomInt(80, 100);
    const lightness = getRandomInt(55, 70);
    return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
}

/**
 * Class representing an individual animated Circle entity
 */
class Circle {
    /**
     * @param {number} x - Center X position in pixels
     * @param {number} y - Center Y position in pixels
     * @param {number} initialDiameter - Starting diameter in pixels
     * @param {number} maxDiameter - Target diameter threshold before destruction
     * @param {number} growthRate - Pixels added to diameter per tick
     * @param {string} color - CSS color string
     */
    constructor(x, y, initialDiameter, maxDiameter, growthRate, color) {
        this.x = x;
        this.y = y;
        this.diameter = initialDiameter;
        this.initialDiameter = initialDiameter;
        this.maxDiameter = maxDiameter;
        this.growthRate = growthRate;
        this.color = color;
        this.element = null;
        this.timerId = null;
    }

    /**
     * Getter checking if circle has not yet exceeded its maximum diameter
     * @returns {boolean}
     */
    get isAlive() {
        return this.diameter < this.maxDiameter;
    }

    /**
     * Getter returning the current circle radius
     * @returns {number}
     */
    get radius() {
        return this.diameter / 2;
    }

    /**
     * Mounts the circle DOM element into the target container
     * @param {HTMLElement} parentContainer 
     */
    render(parentContainer) {
        this.element = document.createElement("div");
        this.element.className = "circle";
        this.element.style.width = `${this.diameter}px`;
        this.element.style.height = `${this.diameter}px`;
        this.element.style.left = `${this.x - this.radius}px`;
        this.element.style.top = `${this.y - this.radius}px`;
        this.element.style.backgroundColor = this.color;
        this.element.style.boxShadow = `0 0 15px ${this.color}`;

        parentContainer.appendChild(this.element);
    }

    /**
     * Expands the circle diameter and updates visual dimensions and positioning
     */
    grow() {
        this.diameter += this.growthRate;

        if (this.element) {
            this.element.style.width = `${this.diameter}px`;
            this.element.style.height = `${this.diameter}px`;
            this.element.style.left = `${this.x - this.radius}px`;
            this.element.style.top = `${this.y - this.radius}px`;

            // Calculate opacity decay as circle nears max diameter
            const lifeProgress = (this.diameter - this.initialDiameter) / (this.maxDiameter - this.initialDiameter);
            const opacity = Math.max(0, 1 - lifeProgress);
            this.element.style.opacity = opacity.toString();
        }
    }

    /**
     * Clears interval timer and removes DOM element from tree
     */
    destroy() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }

        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
            this.element = null;
        }
    }

    /**
     * Starts the continuous growth animation loop
     * @param {number} intervalMs - Animation tick interval in milliseconds
     */
    startAnimation(intervalMs = 25) {
        this.timerId = setInterval(() => {
            if (this.isAlive) {
                this.grow();
            } else {
                this.destroy();
            }
        }, intervalMs);
    }
}

/**
 * Class representing the main Circle Library Orchestrator
 */
class Circles {
    /**
     * @param {number} count - Number of circles to generate
     */
    constructor(count = 100) {
        this.count = count;
        this.circles = [];
    }

    /**
     * Draws the configured number of circles inside the target element ID
     * @param {string} containerId - ID of DOM element container
     */
    draw_circles(containerId) {
        const container = document.getElementById(containerId);

        if (!container) {
            console.error(`Circles Library: Element with ID "${containerId}" was not found.`);
            return;
        }

        const containerWidth = container.clientWidth || window.innerWidth;
        const containerHeight = container.clientHeight || window.innerHeight;

        for (let i = 0; i < this.count; i++) {
            const x = getRandomInt(0, containerWidth);
            const y = getRandomInt(0, containerHeight);
            const initialDiameter = getRandomInt(8, 25);
            const maxDiameter = getRandomInt(90, 240);
            const growthRate = (getRandomInt(8, 20) / 10); // 0.8px to 2.0px per frame
            const color = getRandomColor();

            const circle = new Circle(x, y, initialDiameter, maxDiameter, growthRate, color);
            circle.render(container);
            circle.startAnimation(25);

            this.circles.push(circle);
        }
    }
}
```

#### Technical Explanation:
- **`getRandomInt(min, max)` & `getRandomColor()`**: Pure utility helper functions that generate random coordinates, dimensional thresholds, and glowing semi-transparent `hsla()` strings.
- **`class Circle`**: Encapsulates all state (position, diameters, growth velocity, DOM element reference, interval ID) and lifecycle behaviors (`render`, `grow`, `destroy`, `startAnimation`) for a single particle.
- **Concentric Positioning (`x - radius`, `y - radius`)**: Offsets top and left style values by half the current diameter (`this.radius`) so expanding circles remain centered around their original origin point $(x, y)$.
- **Lexical Arrow Function in `setInterval`**: Automatically inherits `this` from the enclosing `Circle` instance, eliminating the need for `var self = this` or `.bind(this)`.
- **`class Circles`**: The primary library entry point. Its constructor stores the requested circle count, and `draw_circles(containerId)` locates the DOM container, calculates bounding dimensions, and spawns the full collection of animated circles.

---

### 1.2 File: `03 - JS OOP/04 - cLibrary/es6/styles.css`
Create this new file with the following styling:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #0b0f19;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

#canvas {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background: radial-gradient(ellipse at center, #151d30 0%, #070a10 100%);
    cursor: pointer;
}

.circle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    will-change: width, height, left, top, opacity;
    mix-blend-mode: screen;
}
```

#### Technical Explanation:
- **Full Viewport Canvas (`100vw`, `100vh`)**: Sets `#canvas` as a full-screen relative container so all absolute circle offsets are mapped accurately across the entire screen.
- **`mix-blend-mode: screen`**: Blends overlapping circles additively, giving overlapping intersections a bright, radiant visual glow.
- **`pointer-events: none`**: Ensures circles do not intercept mouse click events intended for the canvas element.
- **`will-change`**: Informs the browser's rendering engine of upcoming layout and composite alterations for hardware-accelerated performance.

---

### 1.3 File: `03 - JS OOP/04 - cLibrary/es6/page.html`
Create this new file with the following markup:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Circle Demo - ES6</title>
    <link rel="stylesheet" href="styles.css">
    <script src="circle.js"></script>
</head>
<body>
    <div id="canvas"></div>

    <script>
        // Initialize cLib (circleLibrary) with 100 circles
        let cLib = new Circles(100);

        // Draw 100 circles on #canvas
        cLib.draw_circles("canvas");

        // Interactive Feature: Spawn circles at click position
        document.getElementById("canvas").addEventListener("click", function(e) {
            for (let i = 0; i < 15; i++) {
                const initialDiameter = getRandomInt(6, 18);
                const maxDiameter = getRandomInt(80, 200);
                const growthRate = (getRandomInt(10, 25) / 10);
                const color = getRandomColor();
                
                // Add slight dispersion around click location
                const offsetX = e.clientX + getRandomInt(-20, 20);
                const offsetY = e.clientY + getRandomInt(-20, 20);

                const burstCircle = new Circle(offsetX, offsetY, initialDiameter, maxDiameter, growthRate, color);
                burstCircle.render(this);
                burstCircle.startAnimation(20);
            }
        });
    </script>
</body>
</html>
```

#### Technical Explanation:
- **Script Linkage**: Imports `circle.js` in `<head>` so `Circles` is available in global scope when executing the inline script.
- **Library API Invocation**: Instantiates `Circles(100)` and invokes `.draw_circles("canvas")`.
- **Interactive Burst Event**: Implements a click listener on `#canvas` allowing users to click anywhere on the page to spawn instant bursts of concentric circles.

---

## 2. ES5 with Prototype Implementation

### 2.1 File: `03 - JS OOP/04 - cLibrary/es5_with_proto/circle.js`
Create this new file with the following complete ES5 Prototype implementation:

```javascript
/**
 * Utility: Generate random integer
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Utility: Generate random HSL color string
 */
function getRandomColor() {
    var hue = getRandomInt(0, 360);
    var saturation = getRandomInt(80, 100);
    var lightness = getRandomInt(55, 70);
    return "hsla(" + hue + ", " + saturation + "%, " + lightness + "%, 0.8)";
}

/**
 * ES5 Constructor Function for Circle
 */
function Circle(x, y, initialDiameter, maxDiameter, growthRate, color) {
    this.x = x;
    this.y = y;
    this.diameter = initialDiameter;
    this.initialDiameter = initialDiameter;
    this.maxDiameter = maxDiameter;
    this.growthRate = growthRate;
    this.color = color;
    this.element = null;
    this.timerId = null;
}

/**
 * Prototype method to compute radius
 */
Circle.prototype.getRadius = function() {
    return this.diameter / 2;
};

/**
 * Prototype method to check lifecycle status
 */
Circle.prototype.isAlive = function() {
    return this.diameter < this.maxDiameter;
};

/**
 * Prototype method to render DOM element
 */
Circle.prototype.render = function(parentContainer) {
    this.element = document.createElement("div");
    this.element.className = "circle";
    this.element.style.width = this.diameter + "px";
    this.element.style.height = this.diameter + "px";
    this.element.style.left = (this.x - this.getRadius()) + "px";
    this.element.style.top = (this.y - this.getRadius()) + "px";
    this.element.style.backgroundColor = this.color;
    this.element.style.boxShadow = "0 0 15px " + this.color;

    parentContainer.appendChild(this.element);
};

/**
 * Prototype method to increment diameter and reposition
 */
Circle.prototype.grow = function() {
    this.diameter += this.growthRate;

    if (this.element) {
        this.element.style.width = this.diameter + "px";
        this.element.style.height = this.diameter + "px";
        this.element.style.left = (this.x - this.getRadius()) + "px";
        this.element.style.top = (this.y - this.getRadius()) + "px";

        var lifeProgress = (this.diameter - this.initialDiameter) / (this.maxDiameter - this.initialDiameter);
        var opacity = Math.max(0, 1 - lifeProgress);
        this.element.style.opacity = opacity.toString();
    }
};

/**
 * Prototype method to clean up DOM and interval
 */
Circle.prototype.destroy = function() {
    if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
    }

    if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
        this.element = null;
    }
};

/**
 * Prototype method to start animation loop
 */
Circle.prototype.startAnimation = function(intervalMs) {
    var interval = intervalMs || 25;
    var self = this; // Lexical capture of instance context

    this.timerId = setInterval(function() {
        if (self.isAlive()) {
            self.grow();
        } else {
            self.destroy();
        }
    }, interval);
};

/**
 * ES5 Constructor Function for Circles Orchestrator
 */
function Circles(count) {
    this.count = count || 100;
    this.circles = [];
}

/**
 * Prototype method to instantiate and draw all circles
 */
Circles.prototype.draw_circles = function(containerId) {
    var container = document.getElementById(containerId);

    if (!container) {
        console.error('Circles Library: Element with ID "' + containerId + '" was not found.');
        return;
    }

    var containerWidth = container.clientWidth || window.innerWidth;
    var containerHeight = container.clientHeight || window.innerHeight;

    for (var i = 0; i < this.count; i++) {
        var x = getRandomInt(0, containerWidth);
        var y = getRandomInt(0, containerHeight);
        var initialDiameter = getRandomInt(8, 25);
        var maxDiameter = getRandomInt(90, 240);
        var growthRate = (getRandomInt(8, 20) / 10);
        var color = getRandomColor();

        var circle = new Circle(x, y, initialDiameter, maxDiameter, growthRate, color);
        circle.render(container);
        circle.startAnimation(25);

        this.circles.push(circle);
    }
};
```

#### Technical Explanation:
- **`Circle.prototype.<method>` Assignment**: Attaches all methods to `Circle.prototype`. Instances of `Circle` share a single prototype memory reference for each method rather than creating duplicate function closures on every instance.
- **Context Preservation (`var self = this`)**: `setInterval` executes its callback in the global window context; capturing `var self = this` maintains access to the specific circle instance across ticks.
- **String Concatenation**: Replaces ES6 template literals with traditional ES5 string concatenations (`+`).

---

### 2.2 File: `03 - JS OOP/04 - cLibrary/es5_with_proto/styles.css`
Create this new file with identical styling to ES6:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #0b0f19;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

#canvas {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background: radial-gradient(ellipse at center, #151d30 0%, #070a10 100%);
    cursor: pointer;
}

.circle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    will-change: width, height, left, top, opacity;
    mix-blend-mode: screen;
}
```

---

### 2.3 File: `03 - JS OOP/04 - cLibrary/es5_with_proto/page.html`
Create this new file with the following markup:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Circle Demo - ES5 with Prototype</title>
    <link rel="stylesheet" href="styles.css">
    <script src="circle.js"></script>
</head>
<body>
    <div id="canvas"></div>

    <script>
        // Initialize cLib (circleLibrary) with 100 circles using ES5 Prototype
        var cLib = new Circles(100);

        // Draw 100 circles on #canvas
        cLib.draw_circles("canvas");
    </script>
</body>
</html>
```

---

## 3. ES5 without Prototype Implementation

### 3.1 File: `03 - JS OOP/04 - cLibrary/es5_no_proto/circle.js`
Create this new file with the following complete ES5 No-Prototype implementation:

```javascript
/**
 * Utility: Generate random integer
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Utility: Generate random HSL color string
 */
function getRandomColor() {
    var hue = getRandomInt(0, 360);
    var saturation = getRandomInt(80, 100);
    var lightness = getRandomInt(55, 70);
    return "hsla(" + hue + ", " + saturation + "%, " + lightness + "%, 0.8)";
}

/**
 * ES5 Constructor Function for Circle WITHOUT Prototypes
 * All methods are attached directly to 'this' inside constructor scope.
 */
function Circle(x, y, initialDiameter, maxDiameter, growthRate, color) {
    var self = this;

    // Instance Properties
    this.x = x;
    this.y = y;
    this.diameter = initialDiameter;
    this.initialDiameter = initialDiameter;
    this.maxDiameter = maxDiameter;
    this.growthRate = growthRate;
    this.color = color;
    this.element = null;
    this.timerId = null;

    // Instance Method: getRadius
    this.getRadius = function() {
        return self.diameter / 2;
    };

    // Instance Method: isAlive
    this.isAlive = function() {
        return self.diameter < self.maxDiameter;
    };

    // Instance Method: render
    this.render = function(parentContainer) {
        self.element = document.createElement("div");
        self.element.className = "circle";
        self.element.style.width = self.diameter + "px";
        self.element.style.height = self.diameter + "px";
        self.element.style.left = (self.x - self.getRadius()) + "px";
        self.element.style.top = (self.y - self.getRadius()) + "px";
        self.element.style.backgroundColor = self.color;
        self.element.style.boxShadow = "0 0 15px " + self.color;

        parentContainer.appendChild(self.element);
    };

    // Instance Method: grow
    this.grow = function() {
        self.diameter += self.growthRate;

        if (self.element) {
            self.element.style.width = self.diameter + "px";
            self.element.style.height = self.diameter + "px";
            self.element.style.left = (self.x - self.getRadius()) + "px";
            self.element.style.top = (self.y - self.getRadius()) + "px";

            var lifeProgress = (self.diameter - self.initialDiameter) / (self.maxDiameter - self.initialDiameter);
            var opacity = Math.max(0, 1 - lifeProgress);
            self.element.style.opacity = opacity.toString();
        }
    };

    // Instance Method: destroy
    this.destroy = function() {
        if (self.timerId) {
            clearInterval(self.timerId);
            self.timerId = null;
        }

        if (self.element && self.element.parentNode) {
            self.element.parentNode.removeChild(self.element);
            self.element = null;
        }
    };

    // Instance Method: startAnimation
    this.startAnimation = function(intervalMs) {
        var interval = intervalMs || 25;

        self.timerId = setInterval(function() {
            if (self.isAlive()) {
                self.grow();
            } else {
                self.destroy();
            }
        }, interval);
    };
}

/**
 * ES5 Constructor Function for Circles WITHOUT Prototypes
 */
function Circles(count) {
    var self = this;

    this.count = count || 100;
    this.circles = [];

    // Instance-bound draw_circles method
    this.draw_circles = function(containerId) {
        var container = document.getElementById(containerId);

        if (!container) {
            console.error('Circles Library: Element with ID "' + containerId + '" was not found.');
            return;
        }

        var containerWidth = container.clientWidth || window.innerWidth;
        var containerHeight = container.clientHeight || window.innerHeight;

        for (var i = 0; i < self.count; i++) {
            var x = getRandomInt(0, containerWidth);
            var y = getRandomInt(0, containerHeight);
            var initialDiameter = getRandomInt(8, 25);
            var maxDiameter = getRandomInt(90, 240);
            var growthRate = (getRandomInt(8, 20) / 10);
            var color = getRandomColor();

            var circle = new Circle(x, y, initialDiameter, maxDiameter, growthRate, color);
            circle.render(container);
            circle.startAnimation(25);

            self.circles.push(circle);
        }
    };
}
```

#### Technical Explanation:
- **Instance-Bound Methods (`this.<method> = function() { ... }`)**: Rather than sharing methods via prototype inheritance, every instantiated `Circle` and `Circles` object creates unique closures for its methods.
- **Encapsulation & Scoping**: Each instance retains direct access to `self` within its constructor closure.
- **Absence of Prototype**: `Circle.prototype` remains unmodified, isolating method definitions strictly to individual object instances.

---

### 3.2 File: `03 - JS OOP/04 - cLibrary/es5_no_proto/styles.css`
Create this new file with identical styling:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #0b0f19;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

#canvas {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background: radial-gradient(ellipse at center, #151d30 0%, #070a10 100%);
    cursor: pointer;
}

.circle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    will-change: width, height, left, top, opacity;
    mix-blend-mode: screen;
}
```

---

### 3.3 File: `03 - JS OOP/04 - cLibrary/es5_no_proto/page.html`
Create this new file with the following markup:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Circle Demo - ES5 No Prototype</title>
    <link rel="stylesheet" href="styles.css">
    <script src="circle.js"></script>
</head>
<body>
    <div id="canvas"></div>

    <script>
        // Initialize cLib (circleLibrary) with 100 circles using ES5 No-Prototype
        var cLib = new Circles(100);

        // Draw 100 circles on #canvas
        cLib.draw_circles("canvas");
    </script>
</body>
</html>
```

---

## 4. Verification & Testing Matrix

### 4.1 Step-by-Step Validation Procedure
1. **File System Verification**:
   - Ensure all 9 files are created across the three target directories:
     - `04 - cLibrary/es6/` (`circle.js`, `page.html`, `styles.css`)
     - `04 - cLibrary/es5_with_proto/` (`circle.js`, `page.html`, `styles.css`)
     - `04 - cLibrary/es5_no_proto/` (`circle.js`, `page.html`, `styles.css`)
2. **Browser Rendering Test**:
   - Open each `page.html` in a web browser.
   - Confirm 100 multi-colored glowing circles render across the canvas.
   - Verify all circles expand outward from their centers.
   - Confirm circles fade as they expand and cleanly disappear upon reaching their maximum size.
3. **Console & DOM Inspection**:
   - Open Developer Tools (`F12`).
   - In the **Elements** panel: observe `.circle` `div` elements being removed from the DOM tree when their lifecycles finish (preventing DOM bloat).
   - In the **Console** tab: ensure zero errors or warnings occur during initialization, animation, or teardown.
   - For ES5 Prototype version: verify in console that `Circles.prototype.draw_circles` and `Circle.prototype.grow` exist.
   - For ES5 No-Prototype version: verify in console that `Circle.prototype` is empty and methods exist directly on instance objects.
