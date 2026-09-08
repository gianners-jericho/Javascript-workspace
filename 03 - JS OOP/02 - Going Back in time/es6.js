class Desk {
    constructor(name){
        //attributes
        this.name = name;
        this.x = 0;
        this.y = 0;
        this.color = "black";
    }

    //methods
    mov(x, y){
        this.x = x;
        this.y = y;
    }

    updateColor(new_color){
        this.color = new_color;
    }
}

var desk1 = new Desk("oak desk");
var desk2 = new Desk("maple desk");
desk1.updateColor("brown");

