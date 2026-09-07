var ninja1 = {
  hp: 100,
  strength: 15,
  attack: function() {
     return Math.round(Math.random() * this.strength);
  }
}
var ninja2 = {
  hp: 150,
  strength: 10,
  attack: function() {
    return Math.round(Math.random() * this.strength);
  }
}

for (var round = 1; round <= 10; round++)
{
    console.log("===Round " + round + "===")

    let damage1 = ninja1.attack();
    ninja2.hp = ninja2.hp - damage1;
    console.log("Ninja1 attacks Ninja2 and does a damage of " + damage1 + "! Ninja1 health: " + ninja1.hp + ". Ninja2 health: " + ninja2.hp);

    let damage2 = ninja2.attack();
    ninja1.hp = ninja1.hp - damage2;
    console.log("Ninja2 attacks Ninja1 and does a damage of " + damage2 + "! Ninja1 health: " + ninja1.hp + ". Ninja2 health: " + ninja2.hp);
}

if (ninja1.hp > ninja2.hp) {
  console.log("Ninja1 WINS!!!!!");
} else if (ninja2.hp > ninja1.hp) {
  console.log("Ninja2 WINS!!!!!");
} else {
  console.log("It's a TIE!!!!!");
}

//time spent: 10minutes
