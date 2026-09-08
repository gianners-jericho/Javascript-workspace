import Notes from './Notes.js';

export default class Instrument {
    #record = [];

    //constructor
    constructor() {
        this.#record = [];
    }

    //main methods
    // addNote(name, pitch) method - Adds note to end of record
    addNote(name, pitch) {
        const note = new Notes(name, pitch);
        this.#record.push(note);
        console.log(`Added Note: ${note.name} (Pitch ${note.pitch})`);
    }

    // removeLastNote() method - Removes last note
    removeLastNote() {
        if (this.#record.length > 0) {
            const removed = this.#record.pop();
            console.log(`Removed Note: ${removed.name} (Pitch ${removed.pitch})`);
            return removed;
        }
        console.log("Record is empty. Nothing to remove.");
    }

    // changeNote(position, name, pitch) method - Changes specific note by 1-based index (e.g., index 2 = second note)
    changeNote(position, name, pitch) {
        const index = position - 1; // Convert 1-based index to 0-based array index
        if (index >= 0 && index < this.#record.length) {
            this.#record[index] = new Notes(name, pitch);
            console.log(`Changed note at position ${position} to ${name} (Pitch ${pitch})`);
        } else {
            console.log(`Invalid position: ${position}. Current record length is ${this.#record.length}`);
        }
    }

    // shuffleRecord() method - shuffles recorded notes
    shuffleRecord() {
        for (let i = this.#record.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.#record[i], this.#record[j]] = [this.#record[j], this.#record[i]];
        }
        console.log("Record shuffled.");
    }

    // autoCompose(count) method - Resets existing record and generates X random notes
    autoCompose(count) {
        this.#record = []; // Reset existing record
        for (let i = 0; i < count; i++) {
            const randomName = Notes.NAMES[Math.floor(Math.random() * Notes.NAMES.length)];
            const randomPitch = Math.floor(Math.random() * 7) + 1;
            this.#record.push(new Notes(randomName, randomPitch));
        }
        console.log(`Auto-composed ${count} new notes.`);
    }

    // logRecord() method - Logs all recorded notes
    logRecord() {
        console.log("=== CURRENT RECORDED NOTES ===");
        if (this.#record.length === 0) {
            console.log("Record is empty.");
            return;
        }
        this.#record.forEach((note, idx) => {
            console.log(`[${idx + 1}] ${note.name.toUpperCase()} (Pitch ${note.pitch})`);
        });
    }

    // playSingleAudio(folderName, noteName, pitch) method - Helper method to trigger a single audio file
    playSingleAudio(folderName, noteName, pitch) {
        const audio = new Audio(`audio/${folderName}/${noteName}.mp3`);
        
        // Pitch modification via playback rate
        audio.playbackRate = 0.85 + (pitch * 0.15);

        audio.play().catch(err => {
            console.warn(`Could not play audio/${folderName}/${noteName}.mp3:`, err.message);
        });
    }

    // playRecord(folderName) method - Plays the record sequentially with real audio files using setTimeout loops
    playRecord(folderName) {
        if (this.#record.length === 0) {
            console.log("Nothing to play. Record is empty.");
            return;
        }

        const noteDuration = 400; // Delay between notes in milliseconds

        this.#record.forEach((note, index) => {
            setTimeout(() => {
                this.playSingleAudio(folderName, note.name, note.pitch);
            }, index * noteDuration);
        });
    }

    //getter methods
    get record() {
        return this.#record;
    }
}