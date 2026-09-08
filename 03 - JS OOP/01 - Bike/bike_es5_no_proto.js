//ES5 - no prototype

function ES5_Bike(price, max_speed, miles){

    //attributes
    this.price = price;
    this.max_speed = max_speed;
    this.miles = miles;

    //methods
    this.displayInfo = function(){
        console.log(this.price, this.max_speed, this.miles)
    }
    this.drive = function(){
        console.log("driving");
        this.miles += 10;
    }
    this.reverse = function(){
        console.log("reversing");
        this.miles -= 5;
    }

}

const car1 = new ES5_Bike(100, 10, 10);
const car2 = new ES5_Bike(100, 10, 10);
const car3 = new ES5_Bike(100, 10, 10);

//first instance drives three times, reverse once, then display info
for(let i=0; i<3; i++) car1.drive();
car1.reverse();
car1.displayInfo();

//second car drives twice, reverses once, and display info
for(let i=0; i<2; i++) car2.drive();
for(let i=0; i<2; i++) car2.reverse();
car2.displayInfo();

//third car reverses three times
for(let i=0; i<3; i++) car3.reverse();
car3.displayInfo();

// Question: What would you do to prevent the instance from having negative miles? 

// Answer: By adding a guard clause in its reverse method to check if the result will be negative before reassignment
