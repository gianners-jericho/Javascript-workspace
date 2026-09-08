function Bike(price, max_speed){

    //constructor in ES5
    this.price = price;
    this.max_speed = max_speed;
    this.miles = 0;

    //public methods
    this.displayInfo = function(){
        console.log('price: ', this.price, '; max_speed: ', this.max_speed, '; miles: ', this.miles);
    };

    this.drive = function(){
        console.log('driving...');
        this.miles = this.miles + 10;
    };

    this.reverse = function(){
        console.log('reversing...');
        let temp_miles = this.miles - 5;
        if (temp_miles > 0){
            this.miles = temp_miles;
        }
    };
}

//instances of Bike class
var sport_bike = new Bike(2500, 300);
var dirt_bike = new Bike(2800, 200);
var scooter = new Bike(1700, 170);

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

//time spent: 10mins