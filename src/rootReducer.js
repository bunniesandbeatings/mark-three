import { combineReducers } from '@reduxjs/toolkit'
import midi from "./midi"

const rootReducer = combineReducers({
    midi: midi
})

export default rootReducer