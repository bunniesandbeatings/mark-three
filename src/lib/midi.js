import WebMidi from "webmidi"
import {devlog} from '../util/log'

const midiObj = (o) => {
    return {
        manufacturer: o.manufacturer,
        name: o.name,
        state: o.state,
        original: o
    }
}

const dumpConnections = () => {
    devlog("MIDI Input Discovered")
    WebMidi.inputs.forEach(input => devlog(midiObj(input)))
    devlog("MIDI Output Discovered")
    WebMidi.outputs.forEach(output => devlog(midiObj(output)))
}
