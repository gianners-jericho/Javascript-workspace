// Prosecutor and Defendant both come from this
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class Case {
    constructor(title, years, months, days, minAge, maxAge) {
        this.title = title;
        this.years = years;
        this.months = months;
        this.days = days;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

    // adds the jail time to today's date
    computeReleaseDate() {
        const date = new Date();

        date.setDate(date.getDate() + this.days);
        date.setMonth(date.getMonth() + this.months);
        date.setFullYear(date.getFullYear() + this.years);

        return date.toLocaleDateString("en-GB", { 
            day: "numeric", 
            month: "long", 
            year: "numeric" 
        });
    }
}

class Defendant extends Person {
    case;
    constructor(name, age) {
        super(name, age);
    }
}

class Prosecutor extends Person {
    constructor(name, age) {
        super(name, age);
    }

    // gives the defendant a case
    prosecute(defendant, caseFile) {
        defendant.case = caseFile;
    }
}

// no need to create a TrialCourt, just call these directly
class TrialCourt {

    // true if defendant's age is old enough (and not too old) for this case
    static getVerdict(defendant) {
        const caseFile = defendant.case;
        const age = defendant.age;
        return age >= caseFile.minAge && age <= caseFile.maxAge;
    }

    // prints the trial result
    static initiateTrial(defendant, prosecutor) {
        const verdict = TrialCourt.getVerdict(defendant);

        console.log(`Name: ${defendant.name}
                    Age: ${defendant.age} years old
                    Case Title: ${defendant.case.title}
                    Filed by: ${prosecutor.name}
                    Verdict: ${verdict ? "GUILTY" : "NOT GUILTY"}${verdict ? `\nRelease date: ${defendant.case.computeReleaseDate()}` : ""}`);
    }
}

// TEST I
{
    // let’s say the imprisonment term for this case is 3 years, 3 months, 3 days
    // and the age of someone who can be convicted is between 18 to 75 years old.
    let case1 = new Case("Malicious Mischief", 3, 3, 3, 18, 75);
    let prosecutor = new Prosecutor ("John", 30);
    let defendant1 = new Defendant ("Girlie", 5);

    prosecutor.prosecute(defendant1, case1);

    TrialCourt.initiateTrial(defendant1, prosecutor);
    /*
        Name: Girlie
        Age: 5 years old
        Case Title: Malicious Mischief
        Filed by: John
        Verdict: NOT GUILTY
    */ 
}

console.log("");

// TEST II
{
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
}
