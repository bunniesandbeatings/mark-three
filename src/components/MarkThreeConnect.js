import React, {useEffect} from "react"
import WebMidi from "webmidi"
import {setStatus, STATUS_FOUND, STATUS_MIDI_FAILED, STATUS_SEARCHING, useMidi} from "../midi"
import {useDispatch} from "react-redux"

const MarkThreeConnect = () => {
    const midi = useMidi()
    const dispatch = useDispatch()

    useEffect(
        () => {
            if (midi.status != STATUS_SEARCHING) {
                return
            }

            WebMidi.enable(function (err) {
                if (err) {
                    dispatch(setStatus(STATUS_MIDI_FAILED))
                    console.log("not")
                } else {
                    dispatch(setStatus({status: STATUS_FOUND, error: err}))
                    // console.log(WebMidi.inputs);
                    // // console.log(WebMidi.outputs);
                }
            })

        },
        [midi.status]
    )

    return (
        <p>
            Status: {midi.status}
        </p>
    )
}


export default MarkThreeConnect