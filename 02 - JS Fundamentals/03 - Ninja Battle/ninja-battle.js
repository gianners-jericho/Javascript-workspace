var ninja1 = {
  hp: 100,
  strength: 15,
  attack: function() {
    return Math.floor(Math.random() * (this.strength + 1));
  }
}

var ninja2 = {
  hp: 150,
  strength: 10,
  attack: function() {
    return Math.floor(Math.random() * (this.strength + 1));
  }
}



for (let i = 1; i <= 10; i++){
    console.log(`=== Round: ${i} ===`);

    var ninja1_damage = ninja1.attack();
    ninja2.hp -= ninja1_damage;
    console.log(`Ninja1 attacks Ninja2 and does a damage of ${ninja1_damage}!  Ninja1 health: ${ninja1.hp}.   Ninja2 health: ${ninja2.hp}`);

    var ninja2_damage = ninja2.attack();
    ninja1.hp -= ninja2_damage;
    console.log(`Ninja2 attacks Ninja1 and does a damage of ${ninja2_damage}!  Ninja1 health: ${ninja1.hp}.   Ninja2 health: ${ninja2.hp}`);
}

if (ninja1.hp >= ninja2.hp){
    console.log("Ninja1 WINS!!!!")
} else {
    console.log("Ninja2 WINS!!!!")
}