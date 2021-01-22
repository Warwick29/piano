
const dom_notes = {}

const notes_arr = ["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5"]

const active_notes = {}

let held_keys = []


let CURRENT_MODE = "spread"

let CURRENT_TYPE = "sawtooth"

let CURRENT_MODULATION = 1

let CURRENT_LEVELS = 5

let maintain = false

const toggleMode = (mode, bool) => Modes[mode] = bool

const setMaintain = bool => maintain = bool

notes_arr.forEach(note => {
    const dom_element = document.getElementById(`${note}_key`)
    dom_notes[note] = dom_element
})

const stopNote = note_str => {
    if(active_notes[note_str]) {
        if(active_notes[note_str].length) {active_notes[note_str].forEach(note => {
            if(maintain){setTimeout(()=>{note.stop()}, 1000)}else{note.stop()}
        })}
        else {if(maintain){setTimeout(()=>{note.stop()}, 1000)}else{note.stop()}}
    }
}

const sound = note_str => {
    const is_held = held_keys.indexOf(note_str) > -1
    if(is_held) {return} else {held_keys.push(note_str)}
    const audio_node = noteFunctions[CURRENT_MODE](note_str, CURRENT_TYPE, CURRENT_MODULATION, CURRENT_LEVELS)
    stopNote(note_str)
    active_notes[note_str] = audio_node
    dom_notes[note_str].classList.add('active')
}

const end = note_str => {
    const held_index = held_keys.indexOf(note_str)
    if(held_index > -1) {
        held_keys.splice(held_index, 1)
    }
    stopNote(note_str)
    dom_notes[note_str].classList.remove('active')
}

window.addEventListener("keydown", (ev) => {
    ev.preventDefault()
    switch(ev.key) {
        case 'Tab' : return setMaintain(true)
        case 'q': return sound('C3')
        case '2': return sound('C#3')
        case 'w': return sound('D3')
        case '3': return sound('D#3')
        case 'e': return sound('E3')
        case 'r': return sound('F3')
        case '5': return sound('F#3')
        case 't': return sound('G3')
        case '6': return sound('G#3')
        case 'y': return sound('A3')
        case '7': return sound('A#3')
        case 'u': return sound('B3')
        case 'i': return sound('C4')
        case '9': return sound('C#4')
        case 'o': return sound('D4')
        case '0': return sound('D#4')
        case 'p': return sound('E4')
        case 'z': return sound('F4')
        case 's': return sound('F#4')
        case 'x': return sound('G4')
        case 'd': return sound('G#4')
        case 'c': return sound('A4')
        case 'f': return sound('A#4')
        case 'v': return sound('B4')
        case 'b': return sound('C5')
        case 'h': return sound('C#5')
        case 'n': return sound('D5')
        case 'j': return sound('D#5')
        case 'm': return sound('E5')
        case ',': return sound('F5')
        case 'l': return sound('F#5')
        case '.': return sound('G5')
        case ';': return sound('G#5')
        case '\/': return sound('A5')
    }
})

window.addEventListener("keyup", (ev) => {
    ev.preventDefault()
    switch(ev.key) {
        case 'Tab' : return setMaintain(false)
        case 'q': return end('C3')
        case '2': return end('C#3')
        case 'w': return end('D3')
        case '3': return end('D#3')
        case 'e': return end('E3')
        case 'r': return end('F3')
        case '5': return end('F#3')
        case 't': return end('G3')
        case '6': return end('G#3')
        case 'y': return end('A3')
        case '7': return end('A#3')
        case 'u': return end('B3')
        case 'i': return end('C4')
        case '9': return end('C#4')
        case 'o': return end('D4')
        case '0': return end('D#4')
        case 'p': return end('E4')
        case 'z': return end('F4')
        case 's': return end('F#4')
        case 'x': return end('G4')
        case 'd': return end('G#4')
        case 'c': return end('A4')
        case 'f': return end('A#4')
        case 'v': return end('B4')
        case 'b': return end('C5')
        case 'h': return end('C#5')
        case 'n': return end('D5')
        case 'j': return end('D#5')
        case 'm': return end('E5')
        case ',': return end('F5')
        case 'l': return end('F#5')
        case '.': return end('G5')
        case ';': return end('G#5')
        case '\/': return end('A5')
    }
})

const option_dom = {
    types: {
        sine: document.getElementById('option_sine'),
        sawtooth: document.getElementById('option_sawtooth'),
        square: document.getElementById('option_square')
    }
}

const toggleActive = (option_section, target) => {
    Object.keys(option_section).forEach(option => {
        option_section[option].classList.remove('active')
    })
    option_section[target].classList.add('active')
}

document.getElementById('option_sine').addEventListener("click", () => {
    CURRENT_TYPE = "sine"
    toggleActive(option_dom.types, "sine")
})
document.getElementById('option_sawtooth').addEventListener("click", () => {
    CURRENT_TYPE = "sawtooth"
    toggleActive(option_dom.types, "sawtooth")
})
document.getElementById('option_square').addEventListener("click", () => {
    CURRENT_TYPE = "square"
    toggleActive(option_dom.types, "square")
})

document.getElementById("option_modulation").addEventListener("change", function() {
    CURRENT_MODULATION = this.value / 10
})

document.getElementById("option_levels").addEventListener("change", function() {
    CURRENT_LEVELS = this.value
})