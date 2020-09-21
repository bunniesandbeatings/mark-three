import React from "react"
import {setTemplateField, useActiveParsedTemplate} from "../templates"
import {useDispatch} from "react-redux"
import {inputClasses} from "../util/ui"

const Label = ({children}) => <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                                     htmlFor="grid-first-name">
    {children}
</label>

const ButtonParam = ({button}) => {
    return <div className="grid grid-cols-12 gap-4 m-3">
        <div className="col-span-2">
            <Label>Button {button.displayID}</Label>
            <input
                className={inputClasses()}
                id={`button_${button.id}_name`}
                type="text"
                maxLength={9}
                placeholder="name"
                value={button.name}
            />
        </div>
        <div className="col-span-2">
            <Label>Type</Label>
            <div className="relative">
                <select
                    className={inputClasses()}
                    id={`button_${button.id}_type`}>
                    <option>Momentary</option>
                    <option>Toggle</option>
                    <option>Inc/Dec</option>
                    <option>Trigger</option>
                </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>

            </div>
        </div>
    </div>
}

const TemplateEditor = () => {
    const parsed = useActiveParsedTemplate()
    const dispatch = useDispatch()

    const handleFieldChange = field => e => dispatch(
        setTemplateField({
            id: parsed.id,
            field,
            value: e.target.value
        })
    )

    return <div>
        <div className="grid grid-cols-12 gap-2 m-3">
            <div className="col-span-2">
                <Label>Title</Label>
                <input
                    className={inputClasses()}
                    id="name"
                    type="text"
                    maxLength={16}
                    placeholder="title"
                    value={parsed.name}
                    onChange={handleFieldChange("name")}
                    pattern="[\x20-\x7E]+"
                />
            </div>
        </div>

        <hr/>
        {parsed.buttons.map(button => <ButtonParam key={button.id} button={button}/>)}
    </div>
}

export default TemplateEditor