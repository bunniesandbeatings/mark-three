import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {fetchTemplate, selectTemplate, useActiveTemplateID} from "../templates"
import _ from "lodash"
import {STATUS_FOUND, useMidi} from "../midi"
import {inputClasses} from "../util/ui"

export const useTemplateNames = () =>
    useSelector(state => {
        return state.templates.parsed.map(t => `${t.displayID}:  ${t.name}`)
    })

export const TemplateSelector = () => {
    const dispatch = useDispatch()
    const midi = useMidi()
    const templateNames = useTemplateNames()
    const activeTemplateID = useActiveTemplateID()
    const receiveHandler = _ => {
        dispatch(fetchTemplate(activeTemplateID))
    }

    const handleSelectChange = e => dispatch(selectTemplate(e.target.value))

    return (
        <div className="flex items-center justify-between flex-wrap bg-primary-900 px-4 py-2">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="relative">
                    <select
                        className={inputClasses("pr-6")}
                        onChange={handleSelectChange}
                        value={activeTemplateID}
                    >
                        {_.range(64).map(
                            id =>
                                <option value={id} key={id}>
                                    {templateNames[id]}
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
                {(midi.status === STATUS_FOUND) && <>
                    <button className="btn btn-blue">
                        <i className="fas fa-upload"/> Send
                    </button>

                    <button className="btn btn-blue" onClick={receiveHandler}>
                        <i className="fas fa-download"/> Receive
                    </button>
                </>
                }
            </div>
        </div>
    )
}

export default TemplateSelector