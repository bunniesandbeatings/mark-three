import React from 'react'
import _ from 'lodash'

export const BUTTON_TYPE_MOMENTARY = "momentary"
export const BUTTON_TYPE_TOGGLE = "toggle"
export const BUTTON_TYPE_STEP = "step"
export const BUTTON_TYPE_TRIGGER = "trigger"

export const EDGE_RISING = "rising"
export const EDGE_FALLING = "falling"

export const MIDI_TYPE_CC = "cc"
export const MIDI_TYPE_NRPN = "nrpn"
export const MIDI_TYPE_NOTE = "note"
export const MIDI_TYPE_PROGRAM_CHANGE = "pc"
export const MIDI_TYPE_SONG_POSITION = "pos"

export const CHANNEL_DEFAULT = 0

export const BIT_DEPTH_7 = 7
export const BIT_DEPTH_8 = 8
export const BIT_DEPTH_14 = 14

export const emptyButton = id => ({
    id,
    displayID: id + 1,
    name: `Button${id + 1}`,
    enabled: true,
    type: BUTTON_TYPE_MOMENTARY,
    edge: EDGE_RISING,
    step: 1,
    midiType: MIDI_TYPE_CC,
    cc: 0,
    note: 0,
    nrpnMS: 0,
    nrpnLS: 0,
    channel: CHANNEL_DEFAULT,
    min: 0,
    max: 127,
    bitDepth: BIT_DEPTH_7,
    wrap: false,
    pair: false,
    down: 127,
    up: 0,
    on: 127,
    off: 0,
    from: 0,
    to: 127,
    trigger: 127,
})

export const emptyTemplate = id => ({
    id,
    displayID: id + 1,
    name: "<Empty>",
    buttons: _.range(0, 16).map(id => emptyButton(id))
})