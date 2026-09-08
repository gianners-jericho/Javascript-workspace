function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

class Note {
    constructor(note, pitch){
        this.noteList = ["do", "re", "mi", "fa", "sol", "la", "ti"];
        this.note = note;
        this.pitch = pitch;
    }

    show() {
        console.log(`Note: ${this.note} | Pitch: ${this.pitch}`)
    }

    play() {
        const soundFiles = [
            "c3.mp3",
            "d3.mp3",
            "e3.mp3",
            "f3.mp3",
            "g3.mp3",
            "a3.mp3",
            "b3.mp3"
        ];

        const audio = new Audio(
            `sounds/${soundFiles[this.pitch - 1]}`
        );

        audio.play();
    }
}

class Instrument {
    constructor() {
        this.records = [];
    }

    addNote(note, pitch){
        this.records.push(new Note(note, pitch))
    }

    removeLastNote(){
        this.records.pop()
    }

    changeNote(idx, note, pitch){
        this.records[idx] = new Note(pitch, pitch)
    }

    shuffleNotes(){
        let m = this.records.length, t = "", i = 0, array = this.records;

        while (m) {
            i = Math.floor(Math.random() * m--);

            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    autoCompose(amount){
        this.records = [];

        let noteList = ["do", "re", "mi", "fa", "sol", "la", "ti"];
        for(let i = 0; i < amount; i++){
            let note = noteList[getRandomInt(0, noteList.length)];
            let pitch = getRandomInt(1, 8);
            this.records.push(new Note(note, pitch))
        }
    }

    showRecords(){
        for(let i = 0; i < this.records.length; i++){
            this.records[i].show();
        }
    }

    playRecords(){
        for(let i = 0; i < this.records.length; i++){
            console.log(`playing ${this.records[i].note}`)
            this.records[i].play();
        }
    }
}

class Piano extends Instrument {
    constructor(brand, model, color){
        super();
        this.brand = brand;
        this.model = model;
        this.color = color;
    }

    showInstrument(){
        console.log(`${this.brand} ${this.model} - ${this.color}`)
    }

    playRecords(){
        // play using piano mp3s
    }
}

class Xylophone extends Instrument {
    constructor(brand, model, color){
        super();
        this.brand = brand;
        this.model = model;
        this.color = color;
    }

    showInstrument(){
        console.log(`${this.brand} ${this.model} - ${this.color}`)
    }

    playRecords(){
        // play using xylophone mp3s
    }
}