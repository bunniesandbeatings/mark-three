import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import {
    connect,
    STATUS_ENABLING,
    STATUS_FOUND,
    STATUS_MIDI_CONNECTED,
    STATUS_MIDI_FAILED,
    STATUS_NOT_FOUND,
    STATUS_SEARCHING,
    useMidi
} from "../state/midi"

const statusText = {}
statusText[STATUS_ENABLING] = "Enabling MIDI"
statusText[STATUS_SEARCHING] = "Searching for MK III"
statusText[STATUS_FOUND] = "MK III connected"
statusText[STATUS_MIDI_FAILED] = "Could not enable MIDI"
statusText[STATUS_NOT_FOUND] = "MK III not found"
statusText[STATUS_MIDI_CONNECTED] = "MIDI enabled"

const MarkThreeConnect = () => {
    const midi = useMidi()
    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(connect())
        },
        [midi.status]
    )

    let iconStyle, linkIcon

    if (midi.status === STATUS_FOUND) {
        iconStyle = "bg-green-700 text-white border-green-700"
        linkIcon = "fa-link"
    } else {
        iconStyle = " bg-red-700 text-white border-red-700"
        linkIcon = "fa-unlink"
    }

    return (
        <div
            className={`${iconStyle} inline-block text-sm px-3 py-3 leading-none border rounded hover:border-transparent mt-4 lg:mt-0`}>
            <p>
                <i className={`fas ${linkIcon}`}/> {statusText[midi.status]}
            </p>
        </div>
    )
}


export default MarkThreeConnect