//Notes class
export default class Notes {
    // Static list of allowed note names
    static NAMES = ["do", "re", "mi", "fa", "sol", "la", "ti"];
    #name;
    #pitch;

    //constructor
    constructor(name, pitch = 1) {
        if (!Notes.NAMES.includes(name.toLowerCase())) {
            throw new Error(`Invalid note name: ${name}. Must be one of: ${Note.NAMES.join(", ")}`);
        }
        
        this.#name = name.toLowerCase();
        // Clamp pitch between 1 and 7
        this.#pitch = Math.max(1, Math.min(7, parseInt(pitch, 10) || 1));
    }
    
    //main methods
    show() {
        console.log(`Note: ${this.#name.toUpperCase()} | Pitch: ${this.#pitch}`);
    }

    //getter methods
    get name() {
        return this.#name;
    }

    get pitch() {
        return this.#pitch;
    }

    //setter methods
    set name(newName) {
        if (Notes.NAMES.includes(newName.toLowerCase())) {
            this.#name = newName.toLowerCase();
        }
    }

    set pitch(newPitch) {
        this.#pitch = Math.max(1, Math.min(7, parseInt(newPitch, 10) || 1));
    }
}