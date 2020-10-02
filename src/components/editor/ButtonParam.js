import React from "react"
import {CheckEntry, CollectionOptions, EmptyEntry, NumericEntry, SelectEntry, TextEntry} from './fields'
import {useDispatch} from 'react-redux'
import {setButtonField, useButton} from '../../state/templates'

import {
    BIT_DEPTH_14,
    BIT_DEPTH_7,
    BIT_DEPTH_8,
    BUTTON_TYPE_MOMENTARY,
    BUTTON_TYPE_STEP,
    BUTTON_TYPE_TOGGLE,
    BUTTON_TYPE_TRIGGER,
    CHANNEL_DEFAULT,
    EDGE_FALLING,
    EDGE_RISING,
    MAX_8_BIT,
    MIDI_TYPE_CC,
    MIDI_TYPE_NOTE,
    MIDI_TYPE_NRPN,
    MIDI_TYPE_PROGRAM_CHANGE,
    MIDI_TYPE_SONG_POSITION
} from '../../lib/mkIII/model'
import {bitDepthOptions, channelOptions, midiTypeOptions} from './sharedConfig'
import {devlog} from '../../util/log'


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

const buttonTypeOptions = CollectionOptions(BUTTON_TYPES)
const edgeTypeOptions = CollectionOptions(EDGE_TYPES)

const Pos1 = ({button, handleCheckedChange}) =>
    <CheckEntry
        label="On"
        value={button.enabled}
        onChange={handleCheckedChange("enabled")}
        className={"w-10"}
    />

const Pos2 = ({button, handleValueChange}) => {
    const buttonTitle = `Button ${button.displayID}`

    return <TextEntry
        disabled={!button.enabled}
        className={"w-32"}
        placeholder={`${buttonTitle} name`}
        label={buttonTitle}
        maxLength={9}
        value={button.name}
        onChange={handleValueChange('name')}
    />
}

const Pos3 = ({button, handleValueChange}) =>
    <SelectEntry
        disabled={!button.enabled}
        className={"w-32"}
        label="Type"
        value={button.type}
        onChange={handleValueChange('type')}
    >
        {buttonTypeOptions}
    </SelectEntry>

const Pos4 = ({button, handleValueChange}) => {
    if (button.type === BUTTON_TYPE_MOMENTARY) {
        return <EmptyEntry className={"w-32"}/>
    }

    return <SelectEntry
        disabled={!button.enabled}
        className={"w-32"}
        label="Edge"
        value={button.edge}
        onChange={handleValueChange('edge')}
    >
        {edgeTypeOptions}
    </SelectEntry>

}

const Pos5 = ({button, handleValueChange}) => {
    if (button.type !== BUTTON_TYPE_STEP) {
        return <EmptyEntry className="w-20"/>
    }
    return <NumericEntry
        disabled={!button.enabled}
        className={"w-20"}
        label="Step"
        min={-8191} max={8191}
        onChange={handleValueChange('step')}
        value={button.step}
    />
}

const Pos6 = ({button, handleValueChange}) =>
    <SelectEntry
        disabled={!button.enabled}
        className={"w-32"}
        label="MIDI"
        value={button.midiType}
        onChange={handleValueChange('midiType')}
    >
        {midiTypeOptions}
    </SelectEntry>


const Pos7 = ({button, handleValueChange}) => {
    switch (button.midiType) {
        case MIDI_TYPE_CC:
            return <NumericEntry
                className={"w-32"}
                disabled={!button.enabled}
                label="CC Number"
                min={0} max={MAX_8_BIT}
                onChange={handleValueChange('cc')}
                value={button.cc}
            />
        case MIDI_TYPE_NRPN:
            return <>
                <NumericEntry
                    className={"w-16"}
                    disabled={!button.enabled}
                    label="MSB"
                    min={0} max={MAX_8_BIT}
                    onChange={handleValueChange('nrpnMS')}
                    value={button.nrpnMS}
                />
                <NumericEntry
                    className={"w-16"}
                    disabled={!button.enabled}
                    label="LSB"
                    min={0} max={MAX_8_BIT}
                    onChange={handleValueChange('nrpnLS')}
                    value={button.nrpnLS}
                />
            </>
        case MIDI_TYPE_NOTE:
            return <NumericEntry
                className={"w-32"}
                disabled={!button.enabled}
                label="Note"
                min={0} max={MAX_8_BIT}
                onChange={handleValueChange('note')}
                value={button.note}
            />
        default:
            return <EmptyEntry className="w-32"/>
    }
}

const Pos8 = ({button, handleValueChange}) =>
    <SelectEntry
        className={"w-32"}
        disabled={!button.enabled}
        label="Channel"
        value={button.channel}
        onChange={handleValueChange('channel')}
    >
        {channelOptions}
    </SelectEntry>

const Pos9Config = {}
Pos9Config[BUTTON_TYPE_MOMENTARY] = {label: "Down", field: "down"}
Pos9Config[BUTTON_TYPE_STEP] = {label: "From", field: "from"}
Pos9Config[BUTTON_TYPE_TOGGLE] = {label: "On", field: "on"}
Pos9Config[BUTTON_TYPE_TRIGGER] = {label: "Value", field: "trigger"}

const Pos9 = ({button, handleValueChange, buttonMax}) => {
    var config = Pos9Config[button.type]

    if (!config) {
        return <EmptyEntry className="w-20"/>
    }

    return <NumericEntry
        className={"w-20"}
        disabled={!button.enabled}
        label={config.label}
        min={0} max={buttonMax}
        onChange={handleValueChange(config.field)}
        value={button[config.field]}
    />
}


const Pos10Config = {}
Pos10Config[BUTTON_TYPE_MOMENTARY] = {label: "Up", field: "up"}
Pos10Config[BUTTON_TYPE_STEP] = {label: "To", field: "to"}
Pos10Config[BUTTON_TYPE_TOGGLE] = {label: "Off", field: "off"}

const Pos10 = ({button, handleValueChange, buttonMax}) => {
    var config = Pos10Config[button.type]

    if (!config) {
        return <EmptyEntry className="w-20"/>
    }

    return <NumericEntry
        className={"w-20"}
        disabled={!button.enabled}
        label={config.label}
        min={0} max={buttonMax}
        onChange={handleValueChange(config.field)}
        value={button[config.field]}
    />
}


const Pos11 = ({button, handleValueChange}) =>
    <SelectEntry
        className={"w-32"}
        disabled={!button.enabled}
        label="Bit Depth"
        value={button.bitDepth}
        onChange={handleValueChange('bitDepth')}
    >
        {bitDepthOptions}
    </SelectEntry>

const Pos12 = ({button, handleCheckedChange}) => {
    if (button.type !== BUTTON_TYPE_STEP) {
        return <EmptyEntry className="w-16"/>
    }

    return <CheckEntry
        label="Wrap"
        disabled={!button.enabled}
        value={button.wrap}
        onChange={handleCheckedChange("wrap")}
        className={"w-16"}
    />
}

const Pos13 = ({button, handleCheckedChange}) => {
    if (button.type !== BUTTON_TYPE_STEP) {
        return <EmptyEntry className="w-16"/>
    }

    return <CheckEntry
        label="Pair"
        disabled={!button.enabled}
        value={button.pair}
        onChange={handleCheckedChange("pair")}
        className={"w-16"}
    />
}

export const ButtonParam = ({buttonID}) => {
    const dispatch = useDispatch()
    const button = useButton(buttonID)
    const buttonMax = Math.pow(2, button.bitDepth) - 1

    const handleCheckedChange = field =>
        e => dispatch(setButtonField({id: buttonID, field, value: e.target.checked}))
    const handleValueChange = field =>
        e => dispatch(setButtonField({id: buttonID, field, value: e.target.value}))

    const params = {
        button,
        handleValueChange,
        handleCheckedChange,
        buttonMax,
    }

    devlog(`Rendering button ${buttonID}`)

    return <div className="flex flex-row">
        <Pos1 {...params} />
        <Pos2 {...params} />
        <Pos3 {...params} />
        <Pos4 {...params} />
        <Pos5 {...params} />
        <Pos6 {...params} />
        <Pos7 {...params} />
        <Pos8 {...params} />
        <Pos9 {...params} />
        <Pos10 {...params} />
        <Pos11 {...params} />
        <Pos12 {...params} />
        <Pos13 {...params} />
    </div>
}