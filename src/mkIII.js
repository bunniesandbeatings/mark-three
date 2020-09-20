import WebMidi from "webmidi"
import _ from "lodash"

const MFR_ID = [0x00, 0x20, 0x29]
const CMD_XFER = [0x02, 0x0A, 0x03]
const PKT_START = [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]

const SEQ_ID = id => [id, 0x02]
const TEMPLATE_ID = id => [id, 0x02]

const MARK_THREE_PORT_NAME = "Novation SL MkIII SL MkIII MIDI"

const noOpFn = () => {
}

const defaultTemplate = (id, callback = noOpFn) => (
    {
        id: id,
        data: [],
        onLoad: callback,
        lastSeqID: 0
    }
)

let rawTemplate = new Array(64)

let input, output

const SYSEX_templateGet = templateID => [
    ...CMD_XFER,
    ...PKT_START,
    ...SEQ_ID(0),
    ...TEMPLATE_ID(templateID)
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

    return {packet: data.slice(4, data.length - 1), match: true}
}

const fromMKIII = (data) => {
    let {packet, match} = fromManufacturer(data, MFR_ID)
    return {
        packet: _.slice(packet, 3),
        command: _.take(packet, 3),
        match
    }
}

const XFER_CMD_START = 0x01
const XFER_CMD_PACKET = 0x02
const XFER_CMD_END = 0x03
// const XFER_CMD_RESPONSE = 0x04

function toHexString(byteArray, len = null) {
    if (len === null) {
        len = byteArray.length
    }
    let result = byteArray.reduce(
        (output, elem) => (output + ('0' + elem.toString(16).toUpperCase()).slice(-2) + ' '),
        ''
    )
    return result.trim()
}

function toTextString(byteArray, len = null) {
    if (len === null) {
        len = byteArray.length
    }
    return byteArray.reduce(
        (output, elem) => (output + String.fromCharCode(elem)),
        ''
    )
}

const handleTemplateTransferCommand = (packet) => {
    let header = packet.slice(0,10)
    packet = packet.slice(10)

    let packetType = header[0x00]
    let seqID = header[0x07]
    let templateID = header[0x09]

    const template = rawTemplate[templateID]
    const nextSeqID = template.lastSeqID + 1

    switch (packetType) {
        case XFER_CMD_START: // currently looks safe to ignore
            break;
        case XFER_CMD_PACKET:
            if (nextSeqID !== seqID) {
                throw `Template fetch sequence error, expected: ${nextSeqID}, got: ${seqID}`
            }
            template.lastSeqID = nextSeqID
            template.data = template.data.concat(packet)
            break;
        case XFER_CMD_END:
            template.onLoad(template)
            break;
        default:
            throw `Template fetch error, got command id: ${toHexString([packetType])}`
    }
}
// rip out every 8th element starting at the 4th and then remove the header
const unpack = packet => packet.filter((_, index) => (index - 3) % 8)

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
    let unpacked = unpack(packet)
    handleCommand(command, unpacked)
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

export const loadTemplate = (templateID, callback) => {
    templateID = Number(templateID)
    rawTemplate[templateID] = defaultTemplate(templateID, callback)

    output.sendSysex(MFR_ID, SYSEX_templateGet(templateID))
}
