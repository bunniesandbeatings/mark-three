import {toText} from "../../util/byte"
import _ from "lodash"
import {
    BUTTON_TYPE_MOMENTARY,
    BUTTON_TYPE_STEP,
    BUTTON_TYPE_TOGGLE,
    BUTTON_TYPE_TRIGGER, EDGE_FALLING, EDGE_RISING,
    MIDI_TYPE_CC, MIDI_TYPE_NOTE,
    MIDI_TYPE_NRPN, MIDI_TYPE_PROGRAM_CHANGE, MIDI_TYPE_SONG_POSITION
} from './model'

const START_OF_PARAMS = 0x14
const PARAM_WIDTH = 0x2C
const BUTTON_PARAM_OFFSET = 0x00
const KNOB_PARAM_OFFSET = 0x0F

const paramPos = index => {
    const start = START_OF_PARAMS + (index * PARAM_WIDTH)
    return [start, start + PARAM_WIDTH]
}

// Gets a full parameter setting from the raw line
const getParameter = (raw, index, offset = BUTTON_PARAM_OFFSET) =>
    raw.slice(...paramPos(index + offset))

const getTemplateName = raw =>
    toText(raw.slice(0x04, 0x14))

const FIELD_NAME_START = 0x01
const FIELD_NAME_END = 0x09

const FIELD_ENABLED = 0x00
const FIELD_TYPE = 0x0C
const FIELD_MIDI_TYPE = 0x0A
const FIELD_EDGE = 0x0D
const FIELD_FIRST_VALUE = 0x0E
const FIELD_SECOND_VALUE = 0x10

const readNameField = param =>
    toText(param.slice(FIELD_NAME_START, FIELD_NAME_END + 1))

const readBoolField = (param, pos) => !(param[pos] === 0)

const typeMapping = [
    BUTTON_TYPE_MOMENTARY,
    BUTTON_TYPE_TOGGLE,
    BUTTON_TYPE_STEP,
    BUTTON_TYPE_TRIGGER,
]

const midiTypeMapping = [
    MIDI_TYPE_CC,
    MIDI_TYPE_NRPN,
    MIDI_TYPE_NOTE,
    MIDI_TYPE_PROGRAM_CHANGE,
    MIDI_TYPE_SONG_POSITION,
]

const edgeMapping = [
    EDGE_RISING,
    EDGE_FALLING
]

function parseButton(raw, button) {
    const param = getParameter(raw, button.id, BUTTON_PARAM_OFFSET)

    button.name = readNameField(param)
    button.enabled = readBoolField(param, FIELD_ENABLED)
    button.type = typeMapping[param[FIELD_TYPE]]
    button.midiType = midiTypeMapping[param[FIELD_MIDI_TYPE]]
    button.edge = edgeMapping[param[FIELD_EDGE]]

    switch(button.type) {
        case BUTTON_TYPE_TRIGGER:
            button.trigger = fromWord(FIELD_FIRST_VALUE)
    }
}

function parseKnob(raw, knob) {
    const param = getParameter(raw, knob.id, BUTTON_PARAM_OFFSET)
    knob.name = toText(param.slice(FIELD_NAME_START, FIELD_NAME_END + 1))
}

export const parseRawTemplate = ({state, id, raw}) => {
    const template = state.templates[id]

    template.name = getTemplateName(raw)
    state.templates[id] = template

    _.forEach(state.buttons, (button) => {
        parseButton(raw, button)
    })

    _.forEach(state.knobs, (knob) => {
        parseKnob(raw, knob)
    })

    return state
}
