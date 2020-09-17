import {createSlice} from '@reduxjs/toolkit'
import {useSelector} from "react-redux"
import WebMidi from "webmidi"

export const STATUS_ENABLING = "enabling"
export const STATUS_SEARCHING = "searching"
export const STATUS_MIDI_FAILED = "midi_failed"
export const STATUS_MIDI_CONNECTED = "midi_connected"
export const STATUS_FOUND = "found"
export const STATUS_NOT_FOUND = "not_found"

const midi = createSlice({
    name: 'midi',
    initialState: {
        status: STATUS_ENABLING,
        error: ""
    },
    reducers: {
        setStatus(state, {payload: {status, error}}) {
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

export const connect = () => (dispatch, getState) => {
    const state = getState()
    if (state.midi.status !== STATUS_ENABLING) {
        return
    }

    WebMidi.enable(
        function (err) {
            if (err) {
                dispatch(setStatus({status: STATUS_MIDI_FAILED, error: err}))
            } else {
                dispatch(setStatus({status: STATUS_MIDI_CONNECTED}))
                dispatch(find())
            }

            WebMidi.addListener("connected", function (e) {
                dispatch(find())
            })

            WebMidi.addListener("disconnected", function (e) {
                dispatch(find())
            })
        },
        true
    )
}

export const find = () => (dispatch) => {
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

export default midi.reducer
