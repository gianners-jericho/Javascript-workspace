function Desk(name) {
    self.name = name;
    self.x = 0;
    self.y = 0;
    self.color = "black";
}

Desk.prototype.mov = function(x, y) {
    self.x = x;
    self.y = y;
}

Desk.prototype.updateColor = function(new_color) {
    self.color = new_color;
}

var desk1 = new Desk("oak desk");
var desk2 = new Desk("maple desk");
desk1.updateColor("brown");