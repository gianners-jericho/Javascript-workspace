function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
}


let ninja1 = {
    name: "Ninja Red",
    hp: 50,
    strength: 15,
    attack: function() {
        return getRandomInt(0, this.strength);
    }
}

let ninja2 = {
    name: "Ninja Blue",
    hp: 75,
    strength: 10,
    attack: function() {
        return getRandomInt(0, this.strength);
    }
}

function startTurn(actor, target){
    let damage = actor.attack();
    if(damage == 0){
        console.log(`${actor.name}'s attack missed! It dealt no damage!`)
    }
    else if(damage > (actor.strength - 3)){
        console.log(`${actor.name} critically strikes! It dealt ${damage} damage!`)
    }
    else {
        console.log(`${actor.name} strikes ${target.name} for ${damage} damage!`)
    }

    target.hp -= damage;
    console.log(`${actor.name}'s HP: ${actor.hp} | ${target.name}'s HP: ${target.hp}`)

    return target.hp;
}

for (let i = 0; i < 10; i++){
    console.log(`=== Round ${i + 1} ===`)

    // Ninja 1 Turn
    const ninja1Hp = startTurn(ninja1, ninja2);
    if(ninja1Hp <= 0){
        console.log(`${ninja1.name} wins!`)
        break;
    }

    // Ninja 2 Turn
    const ninja2Hp = startTurn(ninja2, ninja1);
    if(ninja2Hp  <= 0){
        console.log(`${ninja2.name} wins!`)
        break;
    }
}

if(ninja1.hp > 0 && ninja2.hp > 0){
    console.log("No one was defeated. Draw!")
}

// Made in 25-30 minutes.