import {createSlice} from '@reduxjs/toolkit'

export const FIELD_UP = "up"
export const FIELD_DOWN = "down"
export const FIELD_LEFT = "left"
export const FIELD_RIGHT = "right"
export const SECTION_NEXT = "next"
export const SECTION_PREVIOUS = "previous"

const SECTION_ORDER = [
    "template",
    "header",
    "buttons"
]

const index = createSlice({
    name: 'editor',
    initialState: {
        currentFocus: "template",
        template: {
            col: 0,
            row: 0
        },
        header: {
            col: 0,
            row: 0
        },
        buttons: {
            col: 0,
            row: 0
        }
    },
    reducers: {
        setStatus(state, {payload: {direction}}) {
            switch (direction) {
                case UP
            }
        },
    }
})

export const {
    setStatus,
} = index.actions
