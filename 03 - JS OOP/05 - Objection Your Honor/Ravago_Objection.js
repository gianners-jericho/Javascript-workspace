class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}

class Case {
    constructor(title, years, months, days, minAge, maxAge){
        this.title = title;
        this.years = years;
        this.months = months;
        this.days = days;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

    computeReleaseDate(){
        const date = new Date();

        date.setDate(date.getDate() + this.days);
        date.setMonth(date.getMonth() + this.months);
        date.setFullYear(date.getFullYear() + 1)

        return date;
    }   
}

class Defendant extends Person {
    case;
    constructor (name, age){
        super(name, age)
    }
}

class Prosecutor extends Person {
    constructor (name, age){
        super(name, age)
    }

    prosecute(defendant, caseFile){
        defendant.case = caseFile
    }
}

class TrialCourt {

    static getVerdict(defendant){
        const caseFile = defendant.case;
        const age = defendant.age;
        return (age > caseFile.minAge) && (age < caseFile.maxAge) ? true : false
    }

    static initiateTrial(defendant, prosecutor){ 
        const verdict = getVerdict(defendant);
        console.log(`
            Name: ${defendant.name}
            Age: ${defendant.age} years old
            Case Title: ${defendant.case.title}
            Filed By: ${prosecutor.name}
            Verdict: ${verdict ? "GUILTY" : "NOT GUILTY"} 
            ${verdict ? `Release Date: ${defendant.case.computeReleaseDate()}`: ""}
        `)
    }
}

// let’s say imprisonment term for this case is 3 years, 3 months, 3 days
// and the age of someone who can be convicted is between 18 to 75 years old.
let case1 = new Case("Malicious Mischief", 3, 3, 3, 18, 75);
let prosecutor = new Prosecutor ("John", 30);
let defendant2 = new Defendant ("Onel", 25);

prosecutor.prosecute(defendant2, case1);
// let’s say today is December 17, 2020
TrialCourt.initiateTrial(defendant2, prosecutor); 
//    Name: Onel
//    Age: 25 years old
//    Case Title: Malicious Mischief
//    Filed by: John
//    Verdict: GUILTY
//    Release date:  21 March 2024  