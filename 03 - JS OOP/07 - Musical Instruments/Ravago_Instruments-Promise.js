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
        this.records[idx] = new Note(note, pitch)
    }

    clearNotes(){
        this.records = [];
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
            let pitch = getRandomInt(3, 6);
            this.records.push(new Note(note, pitch))
        }
    }

    showRecords(){
        for(let i = 0; i < this.records.length; i++){
            this.records[i].show();
        }
    }
}

class Piano extends Instrument {
    constructor(brand, model, color){
        super();
        this.brand = brand;
        this.model = model;
        this.color = color;
        // binding of audio mp3s
        this.noteLetters = {
            do: "c", re: "d", mi: "e", fa: "f",
            sol: "g", la: "a", ti: "b"
        };
    }

    showInstrument(){
        console.log(`${this.brand} ${this.model} - ${this.color}`)
    }

    async playRecords(){
        for(let i = 0; i < this.records.length; i++){

            let note = this.records[i];

            // build filename
            const letter = this.noteLetters[note.note];
            const filename = `${letter}${note.pitch}.mp3`;

            const audio = new Audio(
                `sounds/${filename}`
            );

            console.log(`Playing ${filename}`)
            await new Promise((resolve, reject) => {
                ///audio.addEventListener("ended", resolve);
                audio.addEventListener("error", reject);
                setTimeout(resolve, 500)
                audio.play().catch(reject);
            });
        }
    }

    async play(note, pitch){
        const filename = `${this.noteLetters[note]}${pitch}.mp3`;

        const audio = new Audio(
            `sounds/${filename}`
        );

        console.log(`Playing ${filename}`)
        await new Promise((resolve, reject) => {
            audio.addEventListener("ended", resolve);
            audio.addEventListener("error", reject);
            audio.play().catch(reject);
        });
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