//Prosecutors class (subclass of Person)
import Person from './Person.js';

export class Prosecutors extends Person {
    //constructor (using constructor of superclass)
    constructor(name, age){
        super(name, age);
    }

    //methods
    //prosecute(defendant, case) - assigns case to defendant
    prosecute(defendant, trial_case){
        defendant.case = trial_case;
    }
}