import _ from 'lodash'

export const BUTTON_TYPE_MOMENTARY = "momentary"
export const BUTTON_TYPE_TOGGLE = "toggle"
export const BUTTON_TYPE_STEP = "step"
export const BUTTON_TYPE_TRIGGER = "trigger"

export const EDGE_RISING = "rising"
export const EDGE_FALLING = "falling"

export const emptyButton = id => ({
    id,
    displayID: id + 1,
    name: `Button${id + 1}`,
    enabled: true,
    type: BUTTON_TYPE_MOMENTARY,
    edge: EDGE_RISING,
})

export const emptyTemplate = id => ({
    id,
    displayID: id + 1,
    name: "<Empty>",
    buttons: _.range(0, 16).map(id => emptyButton(id))
})