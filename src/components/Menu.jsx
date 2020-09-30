import React from "react"
import {useDispatch} from "react-redux"
import _ from "lodash"
import {fetchTemplate, selectTemplate, useActiveTemplateID, useTemplates} from '../state/templates'
import {STATUS_FOUND, useMidi} from '../state/midi'
import {SelectEntry} from './editor/fields'


export const TemplateSelector = () => {
    const dispatch = useDispatch()
    const templates = useTemplates()
    const handleSelectChange = e => dispatch(selectTemplate(e.target.value))
    const activeTemplateID = useActiveTemplateID()

    return <SelectEntry
        label="template"
        onChange={handleSelectChange}
        value={activeTemplateID}
        className={"w-48"}
    >
        {_.map(
            templates,
            ({id, displayID, name}) =>
                <option value={id} key={id}>
                    {displayID}: {name}
                </option>
        )}

    </SelectEntry>
}

export const TransferMenu = () => {
    const dispatch = useDispatch()
    const midi = useMidi()
    const activeTemplateID = useActiveTemplateID()
    const receiveHandler = _ => {
        dispatch(fetchTemplate(activeTemplateID))
    }

    return <>
        {(midi.status === STATUS_FOUND) && <>
            <button className="btn btn-blue">
                <i className="fas fa-upload"/> Send
            </button>
            <button className="btn btn-blue" onClick={receiveHandler}>
                <i className="fas fa-download"/> Receive
            </button>
        </>
        }
    </>
}

export const Menu = () => {
    return (
        <div className="flex items-center justify-between flex-wrap bg-primary-900 px-4 py-2">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <TemplateSelector/>
                <TransferMenu/>
            </div>
        </div>
    )
}

export default Menu