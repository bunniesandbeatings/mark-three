import { combineReducers } from '@reduxjs/toolkit'
import templates from './state/templates'
import midi from './state/midi'

const rootReducer = combineReducers({
    midi,
    templates
})

export default rootReducer