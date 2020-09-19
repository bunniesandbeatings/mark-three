import { combineReducers } from '@reduxjs/toolkit'
import midi from "./midi"
import templates from "./templates"

const rootReducer = combineReducers({
    midi,
    templates
})

export default rootReducer