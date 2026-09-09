class Note {
    static NAMES = ["do", "re", "mi", "fa", "sol", "la", "ti"];

    constructor(name, pitch) {
        this.name = name;
        this.pitch = pitch;
    }

    show() {
        console.log(this.name + " (pitch " + this.pitch + ")");
    }
}

class Instrument {
    constructor() {
        this.record = [];
    }

    addNote(name, pitch) {
        this.record.push(new Note(name, pitch));
    }

    removeLastNote() {
        this.record.pop();
    }

    changeNote(position, name, pitch) {
        this.record[position - 1] = new Note(name, pitch);
    }

    shuffleRecord() {
        let m = this.record.length;
        let array = this.record
        let t = "";
        let i = 0;

        while (m) {
            i = Math.floor(Math.random() * m--);

            t = array[m];
            array[m] = array[i];
            array[i] = t
        }

    }

    // resets the record, then generates "num" random notes into it
    autoCompose(num) {
        this.record = [];

        for (let i = 0; i < num; i++) {
            const name = Note.NAMES[Math.floor(Math.random() * Note.NAMES.length)];
            const pitch = Math.floor(Math.random() * 7) + 1;
            this.addNote(name, pitch);
        }
    }

    logRecord() {
        this.record.forEach((note) => note.show());
    }

    playNote(note) {
        const audio = new Audio(this.soundMap[note.name]);

        // pitch 4 = normal speed, each pitch step = 1 semitone
        audio.playbackRate = 2 ** ((note.pitch - 4) / 12);

        audio.play();
    }
}

class Piano extends Instrument {
    constructor(brand, model, color) {
        super();
        this.brand = brand;
        this.model = model;
        this.color = color;

        this.soundMap = {
            do: "sounds/c4.mp3",
            re: "sounds/d4.mp3",
            mi: "sounds/e4.mp3",
            fa: "sounds/f4.mp3",
            sol: "sounds/g4.mp3",
            la: "sounds/a4.mp3",
            ti: "sounds/b4.mp3",
        };
    }
}

class Xylophone extends Instrument {
    constructor(brand, model, color) {
        super();
        this.brand = brand;
        this.model = model;
        this.color = color;

        this.soundMap = {
            do: "sounds/c4.mp3",
            re: "sounds/d4.mp3",
            mi: "sounds/e4.mp3",
            fa: "sounds/f4.mp3",
            sol: "sounds/g4.mp3",
            la: "sounds/a4.mp3",
            ti: "sounds/b4.mp3",
        };
    }
}
