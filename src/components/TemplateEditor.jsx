import React from "react"
import {setButtonField, setTemplateField, useActiveTemplate, useButton} from "../templates"
import {useDispatch} from "react-redux"
import {inputClasses} from "../util/ui"

const Label = ({children}) => <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold h-4"
                                     htmlFor="grid-first-name">
    {children}
</label>

const TextEntry = ({label, id, maxLength, value, onChange, pattern, placeholder = "", className}) =>
    <div className={className}>
        <Label>{label}</Label>
        <input
            className={inputClasses()}
            id={id}
            type="text"
            maxLength={maxLength}
            placeholder={placeholder}
            value={value}
            pattern={pattern}
            onChange={onChange}
        />
    </div>

const NumericEntry = ({label, id, step = 1, max = 127, min = 0, value, onChange, defaultValue = 0, className}) =>
    <div className={className}>
        <Label>{label}</Label>
        <input
            className={inputClasses()}
            id={id}
            type="number"
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            step={step}
            max={max}
            min={min}
        />
    </div>

const SelectEntry = ({id, children, label = "", className}) =>
    <div className={className}>
        <Label>{label}</Label>
        <div className="relative">
            <select
                className={inputClasses()}
                id={id}>
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    </div>

const checkInputClasses = () => [
    "border-primary-500",
    "rounded",
    "focus:bg-white",
    "form-checkbox",
    "h-5",
    "w-5",
    "mt-1",
    "text-indigo-600",
    "transition",
    "duration-150",
    "ease-in-out",
].join(" ")

const CheckEntry = ({id, value, defaultValue, onChange, label = "", className = ""}) =>
    <div className={className + " align-middle text-center"}>
        <Label>{label}</Label>
        <input
            className={checkInputClasses()}
            id={id}
            type="checkbox"
            checked={value}
            defaultValue={defaultValue}
            onChange={onChange}
        />
    </div>

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
        {/*<SelectEntry*/}
        {/*    className={"w-32"}*/}
        {/*    label="Type"*/}
        {/*    id={`button_${button.id}_type`}>*/}
        {/*    <option>Momentary</option>*/}
        {/*    <option>Toggle</option>*/}
        {/*    <option>Inc/Dec</option>*/}
        {/*    <option>Trigger</option>*/}
        {/*</SelectEntry>*/}
        {/*<SelectEntry*/}
        {/*    className={"w-32"}*/}
        {/*    id={`button_${button.id}_edge`}*/}
        {/*>*/}
        {/*    <option>On Push</option>*/}
        {/*    <option>On Release</option>*/}
        {/*</SelectEntry>*/}
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