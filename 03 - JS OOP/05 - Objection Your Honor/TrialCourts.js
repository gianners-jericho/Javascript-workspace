//Trial Courts class (orchestrator)
export default class TrialCourts {
    //main methods
    //getVerdict(defendant) method - gets the verdict on the case of the defendant; returns guilty or not guilty, or no case filed if defendant has no case
    static getVerdict(defendant) {
        if (!defendant || !defendant.case) {
            return "NO CASE FILED";
        }

        const currentCase = defendant.case;
        const { minAge, maxAge } = currentCase.AgeLimit;

        if (defendant.age >= minAge && defendant.age <= maxAge) {
            return "GUILTY";
        } else {
            return "NOT GUILTY";
        }
    }

    //InitiateTrial(defendant, prosecutor) method - starts the trial of the defendant
    static initiateTrial(defendant, prosecutor, trialDate = new Date()) {
        if (!defendant || !prosecutor || !defendant.case) {
            console.log("Cannot initiate trial: Invalid details or missing case.");
            return;
        }

        const currentCase = defendant.case;
        const verdict = this.getVerdict(defendant);

        console.log(`Name: ${defendant.name}`);
        console.log(`Age: ${defendant.age} years old`);
        console.log(`Case Title: ${currentCase.Title}`);
        console.log(`Filed by: ${prosecutor.name}`);
        console.log(`Verdict: ${verdict}`);

        if (verdict === "GUILTY") {
            const releaseDate = currentCase.computeReleaseDate(trialDate);
            console.log(`Release date: ${releaseDate}`);
        }
        console.log("-----------------------------------");
    }
    
}