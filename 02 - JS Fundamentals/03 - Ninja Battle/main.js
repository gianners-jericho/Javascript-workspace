//took this random number generator straight from google
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var ninja1 = {
  hp: 100,
  strength: 15,
  attack: function(ninja) {
    const attackDmg = getRandomInt(1, this.strength);
    ninja.hp -= attackDmg;
    return attackDmg;
  }
}
var ninja2 = {
  hp: 150,
  strength: 10,
  attack: function(ninja) {
    const attackDmg = getRandomInt(1, this.strength);
    ninja.hp -= attackDmg;
    return attackDmg;
  }
}

//just incase one of the ninjas die before the rounds finish
function deathCheck(){
    if(ninja1.hp < 0){
        console.log("Ninja2 WINS!!!!!")
        process.exit(0)
    }
    else if(ninja2.hp < 0){
        console.log("Ninja1 WINS!!!!!")
        process.exit(0)
    }
}

function decideWinner(){
    if(ninja1.hp > ninja2.hp){
        console.log("Ninja1 WINS!!!!!")
    }
    else if(ninja1.hp === ninja2.hp){
        console.log("TIE!!!!!")
    }
    else{
        console.log("Ninja2 WINS!!!!!")
    }
}

function main(){
    for(let i = 0; i < 10; i++){

        console.log(`Round ${i+1}`);
        const ninja1Dmg = ninja1.attack(ninja2);
        console.log(`Ninja1 attacks Ninja2 and does a damage of ${ninja1Dmg}! Ninja1 health: ${ninja1.hp}. Ninja2 health: ${ninja2.hp}`);
        deathCheck();

        const ninja2Dmg = ninja2.attack(ninja1);
        console.log(`Ninja2 attacks Ninja2 and does a damage of ${ninja2Dmg}! Ninja1 health: ${ninja1.hp}. Ninja2 health: ${ninja2.hp}`);
        deathCheck();
    }

    decideWinner();
}   

main();