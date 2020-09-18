import WebMidi from "webmidi"
import _ from "lodash"

const MFR_ID = new Uint8Array([0x00, 0x20, 0x29])
const CMD_XFER = new Uint8Array([0x02, 0x0A, 0x03])
const PKT_START = new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])

const SEQ_ID = id => [id, 0x02]
const TEMPLATE_ID = id => [id, 0x02]

const MARK_THREE_PORT_NAME = "Novation SL MkIII SL MkIII MIDI"

let rawTemplate = []
let input, output

const SYSEX_templateGet = templateNumber => [
    ...CMD_XFER,
    ...PKT_START,
    ...SEQ_ID(0),
    ...TEMPLATE_ID(templateNumber - 1)
]


const midiObj = (o) => {
    return {
        manufacturer: o.manufacturer,
        name: o.name,
        state: o.state,
        original: o
    }
}

const dumpConnections = () => {
    console.log("in")
    WebMidi.inputs.forEach(input => console.log(midiObj(input)))
    console.log("out")
    WebMidi.outputs.forEach(output => console.log(midiObj(output)))
}

const fromManufacturer = (data, manufacturer) => {
    if (data[0] !== 0xF0) {
        return {data: [], match: false}
    }

    if (!_.isEqual(data.slice(1, 4), manufacturer)) {
        return {packet: [], match: false}
    }

    return {packet: data.slice(4, data.length), match: true}
}

const fromMKIII = (data) => {
    let {packet, match} = fromManufacturer(data, MFR_ID)
    return {
        packet: _.slice(packet, 3),
        command: _.take(packet, 3),
        match
    }
}

const handleSysexInput = (r) => {
    let {data, target} = r
    console.log(target)
    let {command, packet, match} = fromMKIII(data)
    if (match) {
        console.log(command)
        console.log(packet)
    }

}

// FIXME this is called waaay to often on startup
export const discover = () => {
    if (input) {
        input.removeListener("sysex", undefined, handleSysexInput)
        input = null
        output = null
    }

    input = WebMidi.inputs.find(input => input.name === MARK_THREE_PORT_NAME)
    output = WebMidi.outputs.find(output => output.name === MARK_THREE_PORT_NAME)

    if (!input) {
        return {
            connected: false,
            error: `input '${MARK_THREE_PORT_NAME}' missing`
        }
    }

    if (!output) {
        return {
            connected: false,
            error: `output '${MARK_THREE_PORT_NAME}' missing`
        }
    }

    input.addListener("sysex", undefined, handleSysexInput)
    return {connected: true, error: null}
}

export const loadTemplate = (number) => {
    rawTemplate[number] = []

    output.sendSysex(Array.from(MFR_ID), SYSEX_templateGet(number))
}
