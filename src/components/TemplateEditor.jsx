import React from "react"
import {setButtonField, setTemplateField, useActiveTemplate, useButton} from "../templates"
import {useDispatch} from "react-redux"
import '../lib/mkIII/model'
import {
    BUTTON_TYPE_MOMENTARY,
    BUTTON_TYPE_STEP,
    BUTTON_TYPE_TOGGLE,
    BUTTON_TYPE_TRIGGER, EDGE_FALLING,
    EDGE_RISING
} from '../lib/mkIII/model'
import {CheckEntry, CollectionOptions, SelectEntry, TextEntry} from './fields'

const BUTTON_TYPES = [
    {type: BUTTON_TYPE_MOMENTARY, name: "Momentary"},
    {type: BUTTON_TYPE_TOGGLE, name: "Toggle"},
    {type: BUTTON_TYPE_STEP, name: "Inc/Dec"},
    {type: BUTTON_TYPE_TRIGGER, name: "Trigger"},
]

const EDGE_TYPES = [
    {type: EDGE_RISING, name: "On Press"},
    {type: EDGE_FALLING, name: "On Release"},
]

const buttonTypeOptions = CollectionOptions(BUTTON_TYPES)
const edgeTypeOptions = CollectionOptions(EDGE_TYPES)


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
        {/*<NumericEntry*/}
        {/*    className={"w-20"}*/}
        {/*    label="Step"*/}
        {/*    id={`button_${button.id}_step`}*/}
        {/*    min={-8191} max={8191}*/}
        {/*/>*/}
        {/*<SelectEntry*/}
        {/*    className={"w-32"}*/}
        {/*    label="MIDI"*/}
        {/*    id={`button_${button.id}_midi`}>*/}
        {/*    <option>CC</option>*/}
        {/*    <option>NRPN</option>*/}
        {/*    <option>Note</option>*/}
        {/*    <option>Prg. Change</option>*/}
        {/*    <option>Song Pos.</option>*/}
        {/*</SelectEntry>*/}
        {/*<NumericEntry*/}
        {/*    className={"w-20"}*/}
        {/*    label="CC #"*/}
        {/*    id={`button_${button.id}_cc_number`}*/}
        {/*    min={0} max={127}*/}
        {/*/>*/}
        {/*<SelectEntry*/}
        {/*    className={"w-32"}*/}
        {/*    label="Channel"*/}
        {/*    id={`button_${button.id}_channel`}>*/}
        {/*    <option>Default</option>*/}
        {/*    <option>Channel 1</option>*/}
        {/*    <option>Channel 2</option>*/}
        {/*    <option>Channel 3</option>*/}
        {/*    <option>Channel 4</option>*/}
        {/*    <option>Channel 5</option>*/}
        {/*    <option>Channel 6</option>*/}
        {/*    <option>Channel 7</option>*/}
        {/*    <option>Channel 8</option>*/}
        {/*    <option>Channel 9</option>*/}
        {/*    <option>Channel 10</option>*/}
        {/*    <option>Channel 11</option>*/}
        {/*    <option>Channel 12</option>*/}
        {/*    <option>Channel 13</option>*/}
        {/*    <option>Channel 14</option>*/}
        {/*    <option>Channel 15</option>*/}
        {/*    <option>Channel 16</option>*/}
        {/*</SelectEntry>*/}
        {/*<NumericEntry*/}
        {/*    label="Min Value"*/}
        {/*    className={"w-20"}*/}
        {/*    id={`button_${button.id}_min`}*/}
        {/*    min={0} max={127}*/}
        {/*/>*/}
        {/*<NumericEntry*/}
        {/*    label="Max Value"*/}
        {/*    className={"w-20"}*/}
        {/*    id={`button_${button.id}_max`}*/}
        {/*    value={127}*/}
        {/*    min={0} max={127}*/}
        {/*/>*/}
        {/*<SelectEntry*/}
        {/*    label="Bit Depth"*/}
        {/*    className={"w-32"}*/}
        {/*    id={`button_${button.id}_bit_depth`}>*/}
        {/*    <option>7 Bits</option>*/}
        {/*    <option>8 Bits scaled</option>*/}
        {/*    <option>14 bits</option>*/}
        {/*</SelectEntry>*/}
        {/*<CheckEntry*/}
        {/*    label="Wrap"*/}
        {/*/>*/}
        {/*<CheckEntry*/}
        {/*    label="Pair"*/}
        {/*/>*/}
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