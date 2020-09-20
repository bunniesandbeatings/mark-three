import {createSlice} from '@reduxjs/toolkit'
import {useSelector} from "react-redux"
import WebMidi from "webmidi"
import {discover} from "../lib/mkIII/mkIII"

export const STATUS_ENABLING = "enabling"
export const STATUS_SEARCHING = "searching"
export const STATUS_MIDI_FAILED = "midi_failed"
export const STATUS_MIDI_CONNECTED = "midi_connected"
export const STATUS_FOUND = "found"
export const STATUS_NOT_FOUND = "not_found"

const index = createSlice({
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

export const {
    setStatus,
} = index.actions

export const useMidi = () =>
    useSelector(state => {
        return state.midi
    })


const find = () => (dispatch) => {
    let {connected, error} = discover()

    if (connected) {
        dispatch(setStatus({status: STATUS_FOUND}))
    } else {
        dispatch(setStatus({status: STATUS_NOT_FOUND, error}))
    }
}

// TODO move this to mkIII and make it and async solution
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

export default index.reducer
