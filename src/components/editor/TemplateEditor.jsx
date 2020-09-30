import React from "react"
import {setTemplateField, useActiveTemplate} from "../../state/templates"
import {useDispatch} from "react-redux"
import {ButtonParam} from './ButtonParam'
import {TextEntry} from './fields'


const TemplateEditor = () => {
    const template = useActiveTemplate()
    const dispatch = useDispatch()

    const handleValueChange = field =>
        e => dispatch(setTemplateField({id: template.id, field, value: e.target.value}))

    return <div className="flex flex-col flex-wrap p-3 shadow border border-gray-300  bg-primary-100">
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