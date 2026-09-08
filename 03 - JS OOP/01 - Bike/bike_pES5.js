function Bike(price, max_speed){
    this.price = price;
    this.max_speed = max_speed;
    this.miles = 0;
}

Bike.prototype.displayInfo = function(){
    console.log(`Price: ${this.price} || Max Speed: ${this.max_speed} || Total Miles: ${this.miles}`);
}

Bike.prototype.drive = function(){
    this.miles += 10;
    console.log(`Driving`);
}

Bike.prototype.reverse = function(){
    this.miles -= 5;
    console.log(`Reversing`);
}

var bike1 = new Bike(500, 25);
var bike2 = new Bike(300, 20);
var bike3 = new Bike(150, 15);

// Bike 1 
bike1.drive();
bike1.drive();
bike1.drive();
bike1.reverse();

bike1.displayInfo();

/// Bike 2
bike2.drive();
bike2.drive();
bike2.reverse();
bike2.reverse();

bike2.displayInfo();

// Bike 3
bike3.reverse();
bike3.reverse();
bike3.reverse();

bike3.displayInfo();