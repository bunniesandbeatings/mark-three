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

export const KNOB_TYPE_ABSOLUTE = "absolute"
export const KNOB_TYPE_RELATIVE = "relative"


export const BIT_DEPTH_7 = 7
export const BIT_DEPTH_8 = 8
export const BIT_DEPTH_14 = 14

export const MAX_8_BIT = 127
export const MAX_RESOLUTION = 3600
export const MIN_RESOLUTION = 30


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
    max: MAX_8_BIT,
    bitDepth: BIT_DEPTH_7,
    wrap: false,
    pair: false,
    down: MAX_8_BIT,
    up: 0,
    on: MAX_8_BIT,
    off: 0,
    from: 0,
    to: MAX_8_BIT,
    trigger: MAX_8_BIT,
})

export const emptyKnob = id => ({
    id,
    displayID: id + 1,
    name: `Knob${id + 1}`,
    enabled: true,
    type: KNOB_TYPE_ABSOLUTE,
    resolution: 360,
    step: 1,
    velocity: MAX_8_BIT,
    midiType: MIDI_TYPE_CC,
    cc: 0,
    nrpnMS: 0,
    nrpnLS: 0,
    start: 0,
    end: MAX_8_BIT,
    bitDepth: BIT_DEPTH_7,
    pivot: 0,
})


export const emptyTemplate = id => ({
    id,
    displayID: id + 1,
    name: "<Empty>",
    knobs: _.range(0, 16).map(id => emptyKnob(id)),
    buttons: _.range(0, 16).map(id => emptyButton(id)),
})