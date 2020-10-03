import {toText} from "../../util/byte"
import _ from "lodash"

const START_OF_PARAMS = 0x14
const PARAM_WIDTH = 0x2C
const BUTTON_PARAM_OFFSET = 0x00

const paramPos = index => {
    const start = START_OF_PARAMS + (index * PARAM_WIDTH)
    return [start, start + PARAM_WIDTH]
}

// Gets a full parameter setting from the raw line
const getParameter = (raw, index, offset = BUTTON_PARAM_OFFSET) =>
    raw.slice(...paramPos(index + offset))

const getTemplateName = raw =>
    toText(raw.slice(0x04, 0x14))

export const parseRawTemplate = ({state, id, raw}) => {
    const template = state.templates[id]

    template.name = getTemplateName(raw)
    state.templates[id] = template

    _.forEach(state.buttons, (button) => {
        const param = getParameter(raw, button.id)
        console.log(param)
        button.name = toText(param.slice(0x01, 0x0A))
    })

    return state
}
