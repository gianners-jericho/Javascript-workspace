var ninja1 = {
  hp: 100,
  strength: 15,
  attack: function() {
     //your code
     return Math.floor(Math.random() * (self.strength + 1));
  }
}
var ninja2 = {
  hp: 150,
  strength: 10,
  attack: function() {
    //your code
    return Math.floor(Math.random() * (self.strength + 1));
  }
}

//ROUND's
for (let i = 1; i <= 10; i++) {
    console.log("===" + i + "===");

    var damage1 = ninja1.attack();
    ninja2.hp -= damage1;
    console.log("Ninja1 attacks Ninja2 and does a damage of " + damage1 + "!   Ninja1 health: " + ninja1.hp + ".  Ninja2 health: " + ninja2.hp);

    var damage2 = ninja2.attack();
    ninja1.hp -= damage2;
    console.log("Ninja2 attacks Ninja1 and does a damage of " + damage2 + "!   Ninja2 health: " + ninja2.hp + ".  Ninja1 health: " + ninja1.hp);
}

if(ninja1.hp > ninja2.hp) {
    console.log("Ninja1 WINS!!!!!");
}else if(ninja2.hp > ninja1.hp) {
    console.log("Ninja2 WINS!!!!!");
}else{
    console.log("TIE");
}