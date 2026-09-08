class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}

class Prosecutor extends Person {
    constructor(name, age){
        super(name, age);
    }

    prosecute(defendant, filedCase){
        defendant.case = filedCase;
    }
}

class Defendant extends Person{
    constructor(name, age){
        super(name, age);

        this.case = null;
    }
}

class Case {
    constructor(title, years, months, days, minAge, maxAge){
        this.title = title;

        this.imprisonmentTerm = {
            years: years,
            months: months,
            days: days
        }

        this.ageLimit = {
            minAge: minAge,
            maxAge: maxAge
        }
    }

    computeReleaseDate(){
        const date = new Date();

        date.setDate(date.getDate() + this.imprisonmentTerm.days);
        date.setMonth(date.getMonth() + this.imprisonmentTerm.months);
        date.setFullYear(date.getFullYear() + this.imprisonmentTerm.years);

        return date.toDateString();
    }
}

class TrialCourt{
    static initiateTrial(defendant, procecutor){
        const verdict = TrialCourt.getVerdict(defendant);

        console.log(`Name: ${defendant.name}`);
        console.log(`Age: ${defendant.age}`);
        console.log(`Case Title: ${defendant.case.title}`);
        console.log(`Filed By: ${procecutor.name}`);

        if (verdict) {
            console.log("Verdict: GUILTY");
            console.log("Release Date:", defendant.case.computeReleaseDate());
        } else {
            console.log("Verdict: NOT GUILTY");
        }
    }

    static getVerdict(defendant){
        const filedCase = defendant.case;
        const age = defendant.age;

        return (age >= filedCase.ageLimit.minAge && age <= filedCase.ageLimit.maxAge);
    }
}

// let’s say the imprisonment term for this case is 3 years, 3 months, 3 days
// and the age of someone who can be convicted is between 18 to 75 years old.
let case1 = new Case("Malicious Mischief", 3, 3, 3, 18, 75);
let prosecutor1 = new Prosecutor ("John", 30);
let defendant1 = new Defendant ("Girlie", 5);

prosecutor1.prosecute(defendant1, case1);

TrialCourt.initiateTrial(defendant1, prosecutor1);
/*
    Name: Girlie
    Age: 5 years old
    Case Title: Malicious Mischief
    Filed by: John
    Verdict: NOT GUILTY
*/   

// let’s say imprisonment term for this case is 3 years, 3 months, 3 days
// and the age of someone who can be convicted is between 18 to 75 years old.
let case2 = new Case("Malicious Mischief", 3, 3, 3, 18, 75);
let prosecutor2 = new Prosecutor ("John", 30);
let defendant2 = new Defendant ("Onel", 25);

prosecutor2.prosecute(defendant2, case2);
// let’s say today is December 17, 2020
TrialCourt.initiateTrial(defendant2, prosecutor2); 
//    Name: Onel
//    Age: 25 years old
//    Case Title: Malicious Mischief
//    Filed by: John
//    Verdict: GUILTY
//    Release date:  21 March 2024  
