class Note {
    // List of all possible notes
    static notes = ["do", "re", "mi", "fa", "so", "la", "ti"];

    constructor(note, pitch){
        this.note = note;
        this.pitch = pitch;
    }
    
    show(){
        console.log(`Note: ${this.note} || Pitch: ${this.pitch}`);
    }
}

class Instrument {
    constructor(brand, color, model){
        this.brand = brand;
        this.color = color;
        this.model = model;
        this.record = [];
    }

    // Made use of the Note class for this function
    addNote(note, pitch){
        const added_note = new Note(note, pitch);
        this.record.push(added_note);
    }

    removeNote(){
        this.record.pop();
    }

    changeNote(index, note, pitch){
        this.record[index - 1] = new Note(note, pitch);
    }

    autoCompose(num){
        this.record = [];
        
        // Made use of randomizers to make random pitches and notes within the acceptable range
        for (let i = 0; i < num; i++){
            const randomPitch = Math.floor(Math.random() * 7) + 1;
            const randomNote = Note.notes[randomPitch - 1];

            this.addNote(randomPitch, randomNote);
        }
    }

    // Swapping starting from the end of the array
    shuffleRecord(){
        for (let i = this.record.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            [[this.record[i], this.record[j]] = [this.record[j], this.record[i]]];
        }
    }

    showRecord(){
        for (let i = 0; i < this.record.length; i++){
            this.record[i].show();
        }
    }
}

class Piano extends Instrument{
    constructor(brand, color, model){
        super(brand, color, model);
    }

    displayPianoInfo(){
        console.log(`Piano Brand: ${this.brand} || Piano Color: ${this.color} || Piano Model: ${this.model}`);
    }
}

class Xylophone extends Instrument{
    constructor(brand, color, model){
        super(brand, color, model);
    }

    displayXylophoneInfo(){
        console.log(`Xylophone Brand: ${this.brand} || Xylophone Color: ${this.color} || Xylophone Model: ${this.model}`);
    }
}

let piano1 = new Piano("Yamaha", "Blue", "GB1K");
piano1.displayPianoInfo();
piano1.autoCompose(20);
piano1.showRecord();
console.log("+++++++++++++++++++++++++++");
piano1.shuffleRecord();
piano1.showRecord();

console.log("============================");

let xylophone1 = new Xylophone("Yamaha", "Black", "MXL-32AF");
xylophone1.displayXylophoneInfo();
xylophone1.autoCompose(20);
xylophone1.showRecord();
console.log("+++++++++++++++++++++++++++");
xylophone1.shuffleRecord();
xylophone1.showRecord();


