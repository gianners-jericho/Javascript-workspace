//ES5 prototype version of example.js
function Desk(name){
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.color = "black";
}

Desk.prototype.mov = function(x, y){
    this.x = x;
    this.y = y;
};

Desk.prototype.updateColor = function(new_color){
    this.color = new_color;
};

//instances of desk class
var desk1 = new Desk("oak desk");
var desk2 = new Desk("maple desk");
console.log("name:", desk1.name, " color:", desk1.color);
desk1.updateColor("brown");
console.log("=== after update color ===", "\nname:", desk1.name, " color:", desk1.color);

//time spent: 3mins