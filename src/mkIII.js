import WebMidi from "webmidi"
import _ from "lodash"

const MFR_ID = [0x00, 0x20, 0x29]
const CMD_XFER = [0x02, 0x0A, 0x03]
const PKT_START = [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]

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

    return {packet: data.slice(4, data.length-1), match: true}
}

const fromMKIII = (data) => {
    let {packet, match} = fromManufacturer(data, MFR_ID)
    return {
        packet: _.slice(packet, 3),
        command: _.take(packet, 3),
        match
    }
}

const handleTemplateTransferCommand = (packet) => {
    // console.log("INFO: Incoming Template Transfer Command")
    console.log(packet)
}

const handleCommand = (command, packet) => {
    // console.log(`INFO: Lookup command [${command}]`)
    if (_.isEqual(command, CMD_XFER)) {
        handleTemplateTransferCommand(packet)
        return
    }
    console.log(`WARNING: Command not handled: [${command}]`)
}

const handleSysexInput = ({data}) => {
    data = Array.from(data)
    let {command, packet, match} = fromMKIII(data)
    if (!match) {
        console.log("WARNING: received packet from non-MKIII MFR ID.")
        return
    }

    handleCommand(command, packet)
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

    output.sendSysex(MFR_ID, SYSEX_templateGet(number))
}
