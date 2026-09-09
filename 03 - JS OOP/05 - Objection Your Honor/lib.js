class Person {
    #name; #age;

    constructor(name, age){
        this.#name = name;
        this.#age = age;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get age() {
        return this.#age;
    }

    set age(value) {
        this.#age = value;
    }
    
}

class Prosecutor extends Person {

    constructor(name, age){
        super(name, age);
    }

    prosecute(defendant, newCase){
        defendant.case = newCase;
    }
}

class Defendant extends Person {
    #case;
    constructor(name, age){
        super(name, age);
        this.#case = null;
    }

    get case() {
        return this.#case;
    }

    set case(value) {
        this.#case = value;
    }

    getDetails(){
        return{case:this.#case, name:this.name}
    }
}

class Case {
    #imprisonmentTerm;
    #ageLimit;
    #title;
    constructor(title, years, months, days, minAge, maxAge){
        this.#title = title;
        this.#imprisonmentTerm = {years, months, days};
        this.#ageLimit = {minAge, maxAge};
    }   

    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }

    get ageLimit() {
        return this.#ageLimit;
    }

    set ageLimit(value) {
        this.#ageLimit = value;
    }

    get imprisonmentTerm() {
        return this.#imprisonmentTerm;
    }

    set imprisonmentTerm(value) {
        this.#imprisonmentTerm = value;
    }

    computeReleaseDate(){   
        const currentDate = new Date();
        const {years, months, days} = this.#imprisonmentTerm;

        return new Date(
            currentDate.getFullYear() + years,
            currentDate.getMonth() + months,
            currentDate.getDate() + days,
        )
    } 
}

class TrialCourt {
  static initiateTrial(defendant, prosecutor) {
    if(defendant.case && defendant.name && defendant.age && prosecutor.name){
        const isGuilty = TrialCourt.getVerdict(defendant)
        console.log(`Name: ${defendant.name}`);
        console.log(`Age: ${defendant.age}`);
        console.log(`Case Title: ${defendant.case.title}`);
        console.log(`Filed by: ${prosecutor.name}`)
        console.log(`Verdict: ${isGuilty? "GUILTY": "NOT GUILTY"}`);
        isGuilty && console.log(`Release date: ${defendant.case.computeReleaseDate()}`)
    }
    else{
        console.log("Missing information, cannot initiate trial")
    }
  }

  static getVerdict(defendant) {
    const { minAge, maxAge } = defendant.case.ageLimit;

    if (defendant.age < minAge || defendant.age > maxAge) {
      return false;
    }

    return true;
  }
}
