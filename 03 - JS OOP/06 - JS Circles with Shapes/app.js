//app.js orchestrator file
import { Circles, Rectangles, Stars } from './shapes.js';

class DrawingApp {
    #selectedColor = "#9cd39c"; // Default green
    #selectedShape = "circle";  // Default circle
    #canvas = document.getElementById("canvas");

    constructor() {
        this.initUI();
        this.bindEvents();
    }

    initUI() {
        this.updateShapeUI();
    }

    updateShapeUI() {
        const shapeBtns = document.querySelectorAll(".shape-btn");
        
        shapeBtns.forEach(btn => {
            const shapeType = btn.dataset.shape;

            if (shapeType === this.#selectedShape) {
                // Active shape gets filled with selected color
                if (shapeType === "star") {
                    btn.style.backgroundColor = this.#selectedColor;
                } else {
                    btn.style.backgroundColor = this.#selectedColor;
                }
            } else {
                // Inactive shapes get white background
                btn.style.backgroundColor = "white";
            }
        });
    }

    bindEvents() {
        // Color Selection
        document.querySelectorAll(".color-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                
                this.#selectedColor = btn.dataset.color;
                this.updateShapeUI(); // Recolor the active shape selector
            });
        });

        // Shape Selection
        document.querySelectorAll(".shape-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                this.#selectedShape = btn.dataset.shape;
                this.updateShapeUI();
            });
        });

        // Canvas Click -> Spawn Selected Shape
        this.#canvas.addEventListener("click", (e) => {
            switch (this.#selectedShape) {
                case "circle":
                    new Circles(e.clientX, e.clientY, this.#selectedColor, this.#canvas);
                    break;
                case "square":
                    new Rectangles(e.clientX, e.clientY, this.#selectedColor, this.#canvas);
                    break;
                case "star":
                    new Stars(e.clientX, e.clientY, this.#selectedColor, this.#canvas);
                    break;
            }
        });

        // Reset Button -> Clears Board
        document.getElementById("btn-reset").addEventListener("click", () => {
            this.#canvas.innerHTML = "";
        });
    }
}

// Start application on DOM load
window.addEventListener("DOMContentLoaded", () => {
    new DrawingApp();
});

//time spent: 1hr