function Circles(count) {
    this.count = count;
}

// draw circles
Circles.prototype.draw_circles = function(id) {
    var self = this;
    var board = document.getElementById(id);
    var colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

    for (var i = 0; i < self.count; i++) {
        var radius = Math.floor(Math.random() * 20) + 5;
        var x = Math.random() * board.clientWidth;
        var y = Math.random() * board.clientHeight;
        var color = colors[Math.floor(Math.random() * colors.length)];

        var circle = document.createElement("div");
        circle.className = "circle";
        circle.style.width = (radius * 2) + "px";
        circle.style.height = (radius * 2) + "px";
        circle.style.left = (x - radius) + "px";
        circle.style.top = (y - radius) + "px";
        circle.style.backgroundColor = color;

        board.appendChild(circle);

        self.grow(circle, radius * 2, x - radius, y - radius);
    }
};

// grow then remove
Circles.prototype.grow = function(circle, size, left, top) {
    var timer = setInterval(function() {
        size = size + 2;
        left = left - 1;
        top = top - 1;

        if (size >= 150) {
            clearInterval(timer);
            if (circle.parentNode != null) {
                circle.parentNode.removeChild(circle);
            }
        }
        else {
            circle.style.width = size + "px";
            circle.style.height = size + "px";
            circle.style.left = left + "px";
            circle.style.top = top + "px";
        }
    }, 50);
};
