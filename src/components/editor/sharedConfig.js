import {
    BIT_DEPTH_14,
    BIT_DEPTH_7, BIT_DEPTH_8,
    CHANNEL_DEFAULT,
    MIDI_TYPE_CC,
    MIDI_TYPE_NOTE,
    MIDI_TYPE_NRPN,
    MIDI_TYPE_PROGRAM_CHANGE,
    MIDI_TYPE_SONG_POSITION
} from '../../lib/mkIII/model'
import {CollectionOptions} from './fields'

const MIDI_TYPES = [
    {value: MIDI_TYPE_CC, name: "CC"},
    {value: MIDI_TYPE_NRPN, name: "NRPN"},
    {value: MIDI_TYPE_NOTE, name: "Note"},
    {value: MIDI_TYPE_PROGRAM_CHANGE, name: "Prg. Change"},
    {value: MIDI_TYPE_SONG_POSITION, name: "Song Pos."},
]

export const midiTypeOptions = CollectionOptions(MIDI_TYPES)


export const CHANNELS = [
    {value: CHANNEL_DEFAULT, name: "Default"},
    {value: 1, name: "Channel 1"},
    {value: 2, name: "Channel 2"},
    {value: 3, name: "Channel 3"},
    {value: 4, name: "Channel 4"},
    {value: 5, name: "Channel 5"},
    {value: 6, name: "Channel 6"},
    {value: 7, name: "Channel 7"},
    {value: 8, name: "Channel 8"},
    {value: 9, name: "Channel 9"},
    {value: 10, name: "Channel 10"},
    {value: 11, name: "Channel 11"},
    {value: 12, name: "Channel 12"},
    {value: 13, name: "Channel 13"},
    {value: 14, name: "Channel 14"},
    {value: 15, name: "Channel 15"},
    {value: 16, name: "Channel 16"},
]
export const channelOptions = CollectionOptions(CHANNELS)


export const BIT_DEPTHS = [
    {value: BIT_DEPTH_7, name: "7 Bits"},
    {value: BIT_DEPTH_8, name: "8 Bits (scaled)"},
    {value: BIT_DEPTH_14, name: "14 Bits"},

]
export const bitDepthOptions = CollectionOptions(BIT_DEPTHS)
