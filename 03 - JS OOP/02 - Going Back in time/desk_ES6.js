class Desk{
    constructor(name){
        this.name = name;
        this.x = 0;
        this.y = 0;
        this.color = "black";
    }

    move(x, y){
        this.x = x;
        this.y = y;
    }

    updateColor(new_color){
        this.color = new_color;
    }
}

let desk1 = new Desk("oak desk");
let desk2 = new Desk("makple desk");
desk1.updateColor("brown");

console.log(desk1);
