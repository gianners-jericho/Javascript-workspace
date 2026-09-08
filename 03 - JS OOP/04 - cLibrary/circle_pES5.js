function Circles(number){
    this.number = number; // For assigning how many times draw circles will loop
}

Circles.prototype.draw_circles = function(element_id){
    let screen = document.getElementById(element_id); // Making screen as a variable
    screen.style.overflow = "hidden";

    for (let i = 0; i < this.number; i++){
        let size = Math.floor(Math.random() * 191) + 10; // For randomizing the sizes of each circle between 200 and 10

        let colors = ["#A8D5BA", "#A8C7E8", "#C9B1E8"]; // Reused the same pastel colors from the circles activity
        let color = colors[Math.floor(Math.random() * colors.length)]; // Selecting a random index as color
    
        // For setting random x, y coordinates for the circles to spawn
        let x = Math.random() * (screen.clientWidth - size) + size / 2;
        let y = Math.random() * (screen.clientWidth - size) + size / 2;
   
        // Creating an element for circle and setting its styles
        let element = document.createElement("div");

        element.style.width = size + "px";
        element.style.height = size + "px";
        element.style.backgroundColor = color;
        element.style.borderRadius = "50%";
        element.style.position = "absolute";
        element.style.border = "2px solid black";
        element.style.left = x - size / 2 + "px";
        element.style.top = y - size / 2 + "px";

        screen.appendChild(element) // For adding circles to the screen

        let grow = setInterval(function() {
            size++;
            element.style.width = size + "px";
            element.style.height = size + "px";

            if (size >= 300){
                clearInterval(grow);
                element.remove();
            }
        }, 20);
    }
};    