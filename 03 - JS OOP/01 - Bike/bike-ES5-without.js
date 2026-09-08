function Bike(price, max_speed, miles = 0) {
    self.price = price;
    self.max_speed = max_speed;
    self.miles = miles;

    self.displayInfo = function() {
        console.log("Price: " + self.price + " Maximum Speed: " + self.max_speed + " Total Miles: " + self.miles);
    };

    self.drive = function() {
        self.miles += 10;
        console.log("Driving");
    };

    self.reverse = function() {
        if (self.miles > 0) {
            self.miles -= 5;
        }
        console.log("Reversing");
    };
}

var bike1 = new Bike(10000, 40);
var bike2 = new Bike(8000, 35);
var bike3 = new Bike(5000, 20);

//INSTANCE 1
bike1.drive();
bike1.drive();
bike1.drive();
bike1.reverse();
bike1.displayInfo();

//INSTANCE 2
bike2.drive();
bike2.drive();
bike2.reverse();
bike2.reverse();
bike2.displayInfo();

//INSTANCE 3
bike3.reverse();
bike3.reverse();
bike3.reverse();
bike3.displayInfo();