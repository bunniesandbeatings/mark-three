import _ from 'lodash'

const BUTTON_TYPE_MOMENTARY = "momentary"
const BUTTON_TYPE_TOGGLE = "toggle"
const BUTTON_TYPE_STEP = "step"
const BUTTON_TYPE_TRIGGER = "trigger"

export const emptyButton = id => ({
    id,
    displayID: id + 1,
    name: `Button${id + 1}`,
    enabled: true,
    type: BUTTON_TYPE_MOMENTARY,
})

export const emptyTemplate = id => ({
    id,
    displayID: id + 1,
    name: "<Empty>",
    buttons: _.range(0, 16).map(id => emptyButton(id))
})