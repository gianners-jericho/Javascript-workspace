//ES6 version of example.js
class Desk {

    //constructor to instantiate a Desk and its attributes
    constructor(name){
        this.name = name;
        this.x = 0;
        this.y = 0;
        this.color = "black";
    }

    //methods

    //method 1: mov(x, y) - updates x and y coordinates of Desk, to show the Desk moving to a new location
    mov(x,y){
        this.x = x;
        this.y = y;
    }

    //method 2: updateColor(new_color) - changes color of the Desk to a new color provided
    updateColor(new_color){
        this.color = new_color;
    }
}

//instance
let desk1 = new Desk("oak desk");
let desk2 = new Desk("maple desk");
console.log("name:", desk1.name, " color:", desk1.color);
desk1.updateColor("brown");
console.log("=== after update color ===", "\nname:", desk1.name, " color:", desk1.color);