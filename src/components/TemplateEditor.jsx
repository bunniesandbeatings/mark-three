import React from "react"
import {setButtonField, setTemplateField, useActiveTemplate, useButton} from "../templates"
import {useDispatch} from "react-redux"
import '../lib/mkIII/model'
import {
    BIT_DEPTH_14,
    BIT_DEPTH_7, BIT_DEPTH_8,
    BUTTON_TYPE_MOMENTARY,
    BUTTON_TYPE_STEP,
    BUTTON_TYPE_TOGGLE,
    BUTTON_TYPE_TRIGGER, CHANNEL_DEFAULT, EDGE_FALLING,
    EDGE_RISING, MIDI_TYPE_CC, MIDI_TYPE_NOTE, MIDI_TYPE_NRPN, MIDI_TYPE_PROGRAM_CHANGE, MIDI_TYPE_SONG_POSITION
} from '../lib/mkIII/model'
import {CheckEntry, CollectionOptions, NumericEntry, SelectEntry, TextEntry} from './fields'

const BUTTON_TYPES = [
    {value: BUTTON_TYPE_MOMENTARY, name: "Momentary"},
    {value: BUTTON_TYPE_TOGGLE, name: "Toggle"},
    {value: BUTTON_TYPE_STEP, name: "Inc/Dec"},
    {value: BUTTON_TYPE_TRIGGER, name: "Trigger"},
]

const EDGE_TYPES = [
    {value: EDGE_RISING, name: "On Press"},
    {value: EDGE_FALLING, name: "On Release"},
]

const MIDI_TYPES = [
    {value: MIDI_TYPE_CC, name: "CC"},
    {value: MIDI_TYPE_NRPN, name: "NRPN"},
    {value: MIDI_TYPE_NOTE, name: "Note"},
    {value: MIDI_TYPE_PROGRAM_CHANGE, name: "Prg. Change"},
    {value: MIDI_TYPE_SONG_POSITION, name: "Song Pos."},
]

const CHANNELS = [
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

const BIT_DEPTHS = [
    {value: BIT_DEPTH_7, name: "7 Bits"},
    {value: BIT_DEPTH_8, name: "8 Bits (scaled)"},
    {value: BIT_DEPTH_14, name: "14 Bits"},

]

const buttonTypeOptions = CollectionOptions(BUTTON_TYPES)
const edgeTypeOptions = CollectionOptions(EDGE_TYPES)
const midiTypeOptions = CollectionOptions(MIDI_TYPES)
const channelOptions = CollectionOptions(CHANNELS)
const bitDepthOptions = CollectionOptions(BIT_DEPTHS)

const ButtonParam = ({buttonID}) => {
    const dispatch = useDispatch()
    const button = useButton(buttonID)

    const handleCheckedChange = field =>
        e => dispatch(setButtonField({id: buttonID, field, value: e.target.checked}))

    const handleValueChange = field =>
        e => dispatch(setButtonField({id: buttonID, field, value: e.target.value}))

    const buttonTitle = `Button ${button.displayID}`

    return <div className="flex flex-row gap-2">
        <TextEntry
            className={"w-32"}
            placeholder={`${buttonTitle} name`}
            label={buttonTitle}
            maxLength={9}
            value={button.name}
            onChange={handleValueChange('name')}
        />
        <CheckEntry
            label="Enable"
            value={button.enabled}
            onChange={handleCheckedChange("enabled")}
        />
        <SelectEntry
            className={"w-32"}
            label="Type"
            value={button.type}
            onChange={handleValueChange('type')}
        >
            {buttonTypeOptions}
        </SelectEntry>
        <SelectEntry
            className={"w-32"}
            label="Edge"
            value={button.edge}
            onChange={handleValueChange('edge')}
        >
            {edgeTypeOptions}
        </SelectEntry>
        <NumericEntry
            className={"w-20"}
            label="Step"
            min={-8191} max={8191}
            onChange={handleValueChange('step')}
            value={button.step}
        />
        <SelectEntry
            className={"w-32"}
            label="MIDI"
            value={button.midiType}
            onChange={handleValueChange('midiType')}
        >
            {midiTypeOptions}
        </SelectEntry>
        {
            button.midiType === MIDI_TYPE_CC &&
            <NumericEntry
                className={"w-20"}
                label="CC #"
                min={0} max={127}
                onChange={handleValueChange('cc')}
                value={button.cc}
            />
        }
        <SelectEntry
            className={"w-32"}
            label="Channel"
            value={button.channel}
            onChange={handleValueChange('channel')}
        >
            {channelOptions}
        </SelectEntry>
        <NumericEntry
            className={"w-20"}
            label="Min Value"
            min={0} max={127}
            onChange={handleValueChange('min')}
            value={button.min}
        />
        <NumericEntry
            className={"w-20"}
            label="Max Value"
            min={0} max={127}
            onChange={handleValueChange('max')}
            value={button.max}
        />
        <SelectEntry
            className={"w-32"}
            label="Bit Depth"
            value={button.bitDepth}
            onChange={handleValueChange('bitDepth')}
        >
            {bitDepthOptions}
        </SelectEntry>
        <CheckEntry
            label="Wrap"
            value={button.wrap}
            onChange={handleCheckedChange("wrap")}
        />
        <CheckEntry
            label="Pair"
            value={button.pair}
            onChange={handleCheckedChange("pair")}
        />
    </div>
}

const TemplateEditor = () => {
    const template = useActiveTemplate()
    const dispatch = useDispatch()

    const handleValueChange = field =>
        e => dispatch(setTemplateField({id: template.id, field, value: e.target.value}))

    return <div className="flex flex-col flex-wrap p-2 shadow border border-gray-300 rounded m-3 bg-primary-100">
        <TextEntry
            label={"Title"}
            id={`template_name`}
            maxLength={16}
            value={template.name}
            onChange={handleValueChange("name")}
            pattern="[\x20-\x7E]+"
        />
        {template.buttons.map(buttonID => <ButtonParam key={buttonID} buttonID={buttonID}/>)}

    </div>
}

export default TemplateEditor