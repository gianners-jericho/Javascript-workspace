//Cases class (super class)
export default class Cases {
    #title;
    #imprisonmentTerm;
    #ageLimit;
    
    //constructor
    constructor (title, years, months, days, minAge, maxAge){
        this.#title = title;
        this.#imprisonmentTerm = {years, months, days};
        this.#ageLimit = {minAge, maxAge};
    }

    //main methods
    //computeReleaseDate() method - computes when the defendant will be released
    computeReleaseDate() {
        const releaseDate = new Date(); // Starts at today's date
        const { years, months, days } = this.#imprisonmentTerm;

        // Apply sentence duration using native Date setters
        releaseDate.setFullYear(releaseDate.getFullYear() + years);
        releaseDate.setMonth(releaseDate.getMonth() + months);
        releaseDate.setDate(releaseDate.getDate() + days);

        //Return as a clean readable string (e.g., "Mon Sep 08 2031")
        return releaseDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    //getter methods
    get Title() {
        return this.#title;
    }

    get ImprisonmentTerm() {
        return this.#imprisonmentTerm;
    }

    get AgeLimit() {
        return this.#ageLimit;
    }
}