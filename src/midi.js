import {createSlice} from '@reduxjs/toolkit'
import {useSelector} from "react-redux"

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
        console.log(state)
        return state.midi
    })


export default midi.reducer