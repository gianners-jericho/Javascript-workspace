// ES5 - Prototypes

function Bike(price, max_speed, miles = 0) {
    this.price = price;
    this.max_speed = max_speed;
    this.miles = miles;
}

Bike.prototype.displayInfo = function() {
    console.log(`Max Speed: ${this.max_speed} | Miles: ${this.miles} | Price: ${this.price}`);
}

Bike.prototype.drive = function() {
    (this.miles + 10) > this.max_speed ? this.miles = this.max_speed : this.miles += 10;
    console.log(`Driving! Now at ${this.miles} miles.`);
}

Bike.prototype.reverse = function() {
    this.miles > 5 ? this.miles -= 5 : this.miles = 0;
    console.log(`Reversing! Now at ${this.miles} miles.`);
}

// Object instantiation
const bike1 = new Bike(1000, 30);
const bike2 = new Bike(2000, 35);
const bike3 = new Bike(3000, 40);

// Instance 1 - Drive 3 times, Reverse 1 time
bike1.drive();
bike1.drive();
bike1.drive();
bike1.reverse();
bike1.displayInfo();

// Instance 2 - Drive 2 times, Reverse 2 times
bike2.drive();
bike2.drive();
bike2.reverse();
bike2.reverse();
bike2.displayInfo();

// Instance 3 - Reverse 3 times
bike3.reverse();
bike3.reverse();
bike3.reverse();
bike3.displayInfo();

