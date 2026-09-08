import Pianos from './Pianos.js';
import Xylophones from './Xylophones.js';

// Instantiate instruments
const myPiano = new Pianos("Grand Yamaha", "C7", "Polished Ebony");
const myXylophone = new Xylophones("Marimba One", "3000", "Rosewood");

let currentInstrument = myPiano;

// Console verification required by Part 1 & Part 2
console.log("--- PART 1 & 2 CONSOLE TEST ---");
myPiano.addNote("do", 1);
myPiano.addNote("re", 2);
myPiano.addNote("mi", 3);
myPiano.logRecord();

myPiano.changeNote(2, "re", 5); // Change 2nd note to 're' pitch 5
myPiano.logRecord();

myPiano.shuffleRecord();
myPiano.logRecord();

myPiano.autoCompose(5); // Auto-compose 5 random notes
myPiano.logRecord();

// UI Synchronization
const recordDisplay = document.getElementById("record-log");
const instrumentSelect = document.getElementById("instrument-select");

function updateDisplay() {
    const record = currentInstrument.record;
    if (record.length === 0) {
        recordDisplay.textContent = "Record is empty.";
        return;
    }
    
    const formatted = record
        .map((note, idx) => `[${idx + 1}] ${note.name.toUpperCase()}(p${note.pitch})`)
        .join(" -> ");
        
    recordDisplay.textContent = formatted;
}

// Event Bindings
instrumentSelect.addEventListener("change", (e) => {
    currentInstrument = e.target.value === "piano" ? myPiano : myXylophone;
    updateDisplay();
});

document.getElementById("btn-add").addEventListener("click", () => {
    const name = document.getElementById("note-name").value;
    const pitch = document.getElementById("note-pitch").value;
    currentInstrument.addNote(name, pitch);
    updateDisplay();
});

document.getElementById("btn-remove").addEventListener("click", () => {
    currentInstrument.removeLastNote();
    updateDisplay();
});

document.getElementById("btn-shuffle").addEventListener("click", () => {
    currentInstrument.shuffleRecord();
    updateDisplay();
});

document.getElementById("btn-change").addEventListener("click", () => {
    const pos = parseInt(document.getElementById("pos-index").value, 10);
    const name = document.getElementById("note-name").value;
    const pitch = document.getElementById("note-pitch").value;
    currentInstrument.changeNote(pos, name, pitch);
    updateDisplay();
});

document.getElementById("btn-autocompose").addEventListener("click", () => {
    const count = parseInt(document.getElementById("auto-count").value, 10) || 5;
    currentInstrument.autoCompose(count);
    updateDisplay();
});

document.getElementById("btn-play").addEventListener("click", () => {
    currentInstrument.play();
});

// Initial display load
updateDisplay();

//time spent: 3hrs