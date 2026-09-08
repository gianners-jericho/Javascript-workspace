// ES 6
class Bike {
    constructor(price, max_speed){
        this.price = price;
        this.max_speed = max_speed;
        this.miles = 0;
    }
    
    displayInfo(){
        console.log(`Price: ${this.price} || Max Speed: ${this.max_speed} || Total Miles: ${this.miles}`);
    }

    drive(){
        this.miles += 10;
        console.log(`Driving`);
    }

    reverse(){
        this.miles -= 5;
        console.log(`Reversing`);
    }   
}

let bike1 = new Bike(500, 25);
let bike2 = new Bike(300, 20);
let bike3 = new Bike(250, 15);

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