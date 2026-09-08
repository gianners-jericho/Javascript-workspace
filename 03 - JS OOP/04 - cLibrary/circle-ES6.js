class Circles {
    constructor(count) {
        this.count = count;
    }

    // draw circles
    draw_circles(id) {
        const board = document.getElementById(id);
        const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

        for (let i = 0; i < this.count; i++) {
            const radius = Math.floor(Math.random() * 20) + 5;
            const x = Math.random() * board.clientWidth;
            const y = Math.random() * board.clientHeight;
            const color = colors[Math.floor(Math.random() * colors.length)];

            const circle = document.createElement("div");
            circle.className = "circle";
            circle.style.width = (radius * 2) + "px";
            circle.style.height = (radius * 2) + "px";
            circle.style.left = (x - radius) + "px";
            circle.style.top = (y - radius) + "px";
            circle.style.backgroundColor = color;

            board.appendChild(circle);

            this.grow(circle, radius * 2, x - radius, y - radius);
        }
    }

    // grow then remove
    grow(circle, size, left, top) {
        const timer = setInterval(() => {
            size += 2;
            left -= 1;
            top -= 1;

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
    }
}
