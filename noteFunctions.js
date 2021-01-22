const noteFunctions = {
    normal: function(note_str, type) {
        return [playSound(type, tone[note_str], 1)]
    },
    spread: function(note_str, type, modulation, levels) {
        const note = tone[note_str] / 2
        const arr = [playSound(type, note, 1)]
        for(let i = 0; i < levels; i++) {
            arr.push(playSound(type, (note * (i + 2)) + (modulation * i), 1))
        }
        return arr
    }
}