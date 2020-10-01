import React from "react"
import {setTemplateField, useActiveTemplate} from "../../state/templates"
import {useDispatch} from "react-redux"
import {ButtonParam} from './ButtonParam'
import {TextEntry} from './fields'
import {KnobParam} from './KnobParam'


const TemplateEditor = () => {
    const template = useActiveTemplate()
    const dispatch = useDispatch()

    const handleValueChange = field =>
        e => dispatch(setTemplateField({id: template.id, field, value: e.target.value}))

    return <>
        <div className="bg-primary-100 px-4 py-2">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <TextEntry
                    className={"w-64"}
                    label={"Title"}
                    id={`template_name`}
                    maxLength={16}
                    value={template.name}
                    onChange={handleValueChange("name")}
                    pattern="[\x20-\x7E]+"
                />
                <button className="btn btn-blue w-32"><a href={"#knobs"}>Knobs</a></button>
                <button className="btn btn-blue w-32"><a href={"#buttons"}>Buttons</a></button>
            </div>
        </div>
        <hr/>
        <div id="scrollable" className="overflow-y-auto bg-primary-100">
            <div className="flex flex-col flex-wrap px-4 py-1">
                <h2 id="knobs">Knobs</h2>
                {template.buttons.map(knobID => <KnobParam key={knobID} knobID={knobID}/>)}
                <h2 id="buttons">Buttons</h2>
                {template.buttons.map(buttonID => <ButtonParam key={buttonID} buttonID={buttonID}/>)}
            </div>
        </div>
    </>
}

export default TemplateEditor