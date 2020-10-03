import {toText} from "../../util/byte"
import _ from "lodash"

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
const FIELD_CC = 0x19

function parseButton(raw, button) {
    const param = getParameter(raw, button.id, BUTTON_PARAM_OFFSET)
    button.name = toText(param.slice(FIELD_NAME_START, FIELD_NAME_END+1))
}

function parseKnob(raw, knob) {
    const param = getParameter(raw, knob.id, BUTTON_PARAM_OFFSET)
    knob.name = toText(param.slice(FIELD_NAME_START, FIELD_NAME_END+1))
}

export const parseRawTemplate = ({state, id, raw}) => {
    const template = state.templates[id]

    template.name = getTemplateName(raw)
    state.templates[id] = template

    _.forEach(state.buttons, (button) => {
        parseButton(raw, button)
    })

    _.forEach(state.knobs, (knob) => {
        parseKnob(raw,knob)
    })

    return state
}
