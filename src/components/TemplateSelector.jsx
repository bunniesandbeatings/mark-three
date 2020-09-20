import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {fetchTemplate, selectTemplate, useActiveTemplateID} from "../templates"
import _ from "lodash"
import {STATUS_FOUND, useMidi} from "../midi"
import DropDown from "./DropDown"

export const useTemplateNames = () =>
    useSelector(state => {
        return state.templates.list.map(t => `${t.displayID}:  ${t.name}`)
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
                <DropDown onChange={handleSelectChange} value={activeTemplateID}>
                    {_.range(64).map(
                        id =>
                            <option value={id} key={id}>
                                {templateNames[id]}
                            </option>
                    )}
                </DropDown>

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