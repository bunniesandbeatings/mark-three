import {createSlice} from '@reduxjs/toolkit'
import {useSelector} from "react-redux"
import WebMidi from "webmidi"

export const STATUS_SEARCHING = "searching"
export const STATUS_MIDI_FAILED = "midi_failed"
export const STATUS_FOUND = "midi_found"
export const STATUS_NOT_FOUND = "midi_not_found"

const midi = createSlice({
    name: 'midi',
    initialState: {
        status: STATUS_SEARCHING,
        error: ""
    },
    reducers: {
        setStatus(state, {payload: {status, error}}) {
            console.log("called")
            state.status = status
            state.midiError = error
            return state
        },
    }
})

export const {setStatus} = midi.actions

export const useMidi = () =>
    useSelector(state => {
        return state.midi
    })

const midiObj = (o) => {
    return {
        manufacturer: o.manufacturer,
        name: o.name,
        state: o.state,
        original: o
    }
}

const dumpConnections = () => {
    console.log("in")
    WebMidi.inputs.forEach(input => console.log(midiObj(input)))
    console.log("out")
    WebMidi.outputs.forEach(output => console.log(midiObj(output)))
}

const MARK_THREE_PORT_NAME = "Novation SL MkIII SL MkIII MIDI"

// manufacturer: "Focusrite A.E.", name: "Novation SL MkIII SL MkIII MIDI", state: "connected", original: Output}

export const connect = () => (dispatch, getState) => {
    const state = getState()
    if (state.midi.status !== STATUS_SEARCHING) {
        return
    }

    WebMidi.enable(function (err) {
        if (err) {
            dispatch(setStatus({status: STATUS_MIDI_FAILED, error: err}))
        } else {
            let input = WebMidi.inputs.find(input => input.name === MARK_THREE_PORT_NAME)
            let output = WebMidi.inputs.find(output => output.name === MARK_THREE_PORT_NAME)

            if (!input) {
                dispatch(setStatus({status: STATUS_NOT_FOUND, error: `input '${MARK_THREE_PORT_NAME}' missing`}))
                return
            }
            if (!output) {
                dispatch(setStatus({status: STATUS_NOT_FOUND, error: `output '${MARK_THREE_PORT_NAME}' missing`}))
                return
            }
            dispatch(setStatus({status: STATUS_FOUND}))
        }
    })

}

export default midi.reducer