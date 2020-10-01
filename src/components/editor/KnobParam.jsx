import {useDispatch} from 'react-redux'
import {setKnobField, useKnob} from '../../state/templates'
import {CheckEntry, CollectionOptions, EmptyEntry, NumericEntry, SelectEntry, TextEntry} from './fields'
import React from 'react'
import {
    BUTTON_TYPE_MOMENTARY, BUTTON_TYPE_STEP, BUTTON_TYPE_TOGGLE, BUTTON_TYPE_TRIGGER,
    KNOB_TYPE_ABSOLUTE,
    KNOB_TYPE_RELATIVE, MAX_8_BIT,
    MAX_RESOLUTION, MIDI_TYPE_CC, MIDI_TYPE_NOTE, MIDI_TYPE_NRPN,
    MIN_RESOLUTION
} from '../../lib/mkIII/model'
import {bitDepthOptions, channelOptions, midiTypeOptions} from './sharedConfig'

const KNOB_TYPES = [
    {value: KNOB_TYPE_ABSOLUTE, name: "Absolute"},
    {value: KNOB_TYPE_RELATIVE, name: "Relative"},
]
const knobTypeOptions = CollectionOptions(KNOB_TYPES)

const Pos1 = ({knob, handleCheckedChange}) =>
    <CheckEntry
        label="On"
        value={knob.enabled}
        onChange={handleCheckedChange("enabled")}
        className={"w-10"}
    />

const Pos2 = ({knob, handleValueChange}) => {
    const buttonTitle = `Knob ${knob.displayID}`
    return <TextEntry
        disabled={!knob.enabled}
        className={"w-32"}
        placeholder={`${buttonTitle} name`}
        label={buttonTitle}
        maxLength={9}
        value={knob.name}
        onChange={handleValueChange('name')}
    />
}

const Pos3 = ({knob, handleValueChange}) =>
    <SelectEntry
        disabled={!knob.enabled}
        className={"w-32"}
        label="Type"
        value={knob.type}
        onChange={handleValueChange('type')}
    >
        {knobTypeOptions}
    </SelectEntry>

const Pos4 = ({knob, handleValueChange}) =>
    <NumericEntry
        disabled={!knob.enabled}
        className={"w-20"}
        label="Res."
        min={MIN_RESOLUTION} max={MAX_RESOLUTION}
        onChange={handleValueChange('resolution')}
        value={knob.resolution}
    />

const Pos5 = ({knob, handleValueChange}) =>
    <NumericEntry
        disabled={!knob.enabled}
        className={"w-20"}
        label="Step"
        min={0} max={MAX_8_BIT}
        onChange={handleValueChange('step')}
        value={knob.step}
    />

const Pos6 = ({knob, handleValueChange}) =>
    <SelectEntry
        disabled={!knob.enabled}
        className={"w-32"}
        label="MIDI"
        value={knob.midiType}
        onChange={handleValueChange('midiType')}
    >
        {midiTypeOptions}
    </SelectEntry>


const Pos7 = ({knob, handleValueChange}) => {
    switch (knob.midiType) {
        case MIDI_TYPE_CC:
            return <NumericEntry
                className={"w-32"}
                disabled={!knob.enabled}
                label="CC Number"
                min={0} max={MAX_8_BIT}
                onChange={handleValueChange('cc')}
                value={knob.cc}
            />
        case MIDI_TYPE_NRPN:
            return <>
                <NumericEntry
                    className={"w-16"}
                    disabled={!knob.enabled}
                    label="MSB"
                    min={0} max={MAX_8_BIT}
                    onChange={handleValueChange('nrpnMS')}
                    value={knob.nrpnMS}
                />
                <NumericEntry
                    className={"w-16"}
                    disabled={!knob.enabled}
                    label="LSB"
                    min={0} max={MAX_8_BIT}
                    onChange={handleValueChange('nrpnLS')}
                    value={knob.nrpnLS}
                />
            </>
        case MIDI_TYPE_NOTE:
            return <NumericEntry
                className={"w-32"}
                disabled={!knob.enabled}
                label="Velocity"
                min={0} max={MAX_8_BIT}
                onChange={handleValueChange('velocity')}
                value={knob.velocity}
            />
        default:
            return <EmptyEntry className="w-32"/>
    }
}

const Pos8 = ({knob, handleValueChange}) =>
    <SelectEntry
        className={"w-32"}
        disabled={!knob.enabled}
        label="Channel"
        value={knob.channel}
        onChange={handleValueChange('channel')}
    >
        {channelOptions}
    </SelectEntry>

const Pos9 = ({knob, handleValueChange, knobMax}) => {
    return <NumericEntry
        className={"w-20"}
        disabled={!knob.enabled}
        label={"Start"}
        min={0} max={knobMax}
        onChange={handleValueChange("start")}
        value={knob.start}
    />
}

const Pos10 = ({knob, handleValueChange, knobMax}) => {
    return <NumericEntry
        className={"w-20"}
        disabled={!knob.enabled}
        label={"End"}
        min={0} max={knobMax}
        onChange={handleValueChange("end")}
        value={knob.end}
    />
}

const Pos11 = ({knob, handleValueChange}) => {
    if (knob.midiType !== MIDI_TYPE_NRPN && knob.midiType !== MIDI_TYPE_CC) {
        return <EmptyEntry className={"w-32"}/>
    }
    return <SelectEntry
        className={"w-32"}
        disabled={!knob.enabled}
        label="Bit Depth"
        value={knob.bitDepth}
        onChange={handleValueChange('bitDepth')}
    >
        {bitDepthOptions}
    </SelectEntry>
}

const Pos12 = ({knob, handleValueChange, knobMax}) => {
    return <NumericEntry
        className={"w-20"}
        disabled={!knob.enabled}
        label={"Pivot"}
        min={0} max={knobMax}
        onChange={handleValueChange("pivot")}
        value={knob.pivot}
    />
}

export const KnobParam = ({knobID}) => {
    const dispatch = useDispatch()
    const knob = useKnob(knobID)

    let knobMax = MAX_8_BIT
    if (knob.midiType === MIDI_TYPE_NRPN || knob.midiType === MIDI_TYPE_CC) {
        knobMax = Math.pow(2, knob.bitDepth) - 1
    }

    const handleCheckedChange = field =>
        e => dispatch(setKnobField({id: knobID, field, value: e.target.checked}))
    const handleValueChange = field =>
        e => dispatch(setKnobField({id: knobID, field, value: e.target.value}))

    const params = {
        knob,
        handleValueChange,
        handleCheckedChange,
        knobMax,
    }

    console.log(`Rendering knob ${knobID}`)

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
    </div>
}