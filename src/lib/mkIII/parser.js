import {toText} from "../../util/byte"
import _ from "lodash"
import {emptyTemplate} from './model'

const START_OF_PARAMS = 0x14
const PARAM_WIDTH = 0x2C

const paramPos = index => {
    const start = START_OF_PARAMS + (index * PARAM_WIDTH)
    return [start, start + PARAM_WIDTH]
}

// Gets a full parameter setting from the raw line
const getParameter = (raw, index) =>
    raw.slice(...paramPos(index))

const getTemplateName = raw =>
    toText(raw.slice(0x04, 0x14))

const getButton = (raw, index) => {
    const param = getParameter(raw, index)
    return {
        name: toText(param.slice(0x01, 0x0A))
    }
}

const getButtons = raw =>
    _.range(0, 16)
    .map((index) =>
        getButton(raw, index))

export const parseRawTemplate = ({state, id, raw}) => {
    const template = state.templates[id]
console.log(template.name)
    template.name = getTemplateName(raw)

    state.templates[id] = template
    return state
    // {
    //     name:
    //     // buttons: getButtons(raw),
    // }
}
