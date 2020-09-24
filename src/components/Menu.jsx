import React from "react"
import {useDispatch} from "react-redux"
import _ from "lodash"
import {inputClasses} from "../util/ui"
import {fetchTemplate, selectTemplate, useActiveTemplateID, useTemplates} from '../templates'
import {STATUS_FOUND, useMidi} from '../midi'


export const TemplateSelector = () => {
    const dispatch = useDispatch()
    const templates = useTemplates()
    const handleSelectChange = e => dispatch(selectTemplate(e.target.value))
    const activeTemplateID = useActiveTemplateID()

    return <div className="relative">
        <select
            className={inputClasses("pr-6")}
            onChange={handleSelectChange}
            value={activeTemplateID}
        >
            {_.map(
                templates,
                ({id, displayID, name}) =>
                    <option value={id} key={id}>
                        {displayID}: {name}
                    </option>
            )}
        </select>
        <div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
        </div>
    </div>
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