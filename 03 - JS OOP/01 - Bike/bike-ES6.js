class Bike {

    //constructor to instantiate a Bike and its attributes
    constructor(price, max_speed){
        this.price = price;
        this.max_speed = max_speed;
        this.miles = 0;
    }

    //methods

    //method 1: displayInfo() - displays the full information of the bike
    displayInfo(){
        console.log('price: ', this.price, '; max_speed: ', this.max_speed, '; miles: ', this.miles);
    }

    //method 2: drive() - increases the miles of the bike. in this instance, 1 call of drive = increment of 10 on miles
    drive(){
        console.log('driving...');
        this.miles = this.miles + 10;
    }

    //method 3: reverse() - decreases the miles of the bike. in this instance, 1 call of reverse = decrement of 5 on miles. if miles !< 0, decrease. else, don't decrease (to avoid negative values).
    reverse(){
        console.log('reversing...');
        let temp_miles = this.miles - 5;
        if (temp_miles > 0){
            this.miles = temp_miles;
        }
    }
}

//create 3 instances of the bike class
let sport_bike = new Bike(2500, 300);
let dirt_bike = new Bike(2800, 200);
let scooter = new Bike(1700, 170);

//instance 1: drive three times, reverse once, display info
for (var i = 0; i < 3; i++){
    sport_bike.drive();
}

sport_bike.reverse();
sport_bike.displayInfo();

//instance 2: drive twice, reverse twice, display info
console.log(`=== next bike ===`);
for (var i = 0; i < 2; i++){
    dirt_bike.drive();
}

for (var i = 0; i < 2; i++){
    dirt_bike.reverse();
}
dirt_bike.displayInfo();

//instance 3: reverse three times, display info
console.log(`=== next bike ===`);
for (var i = 0; i < 3; i++){
    scooter.reverse();
}
scooter.displayInfo();

//time spent: 5mins