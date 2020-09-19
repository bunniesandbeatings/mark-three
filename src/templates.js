import {createSlice} from '@reduxjs/toolkit'
import {useSelector} from "react-redux"
import {loadTemplate} from "./mkIII"

const templates = createSlice({
    name: 'templates',
    initialState: {
        list: [],
        active: 0
    },
    reducers: {
        selectTemplate(state, {payload: templateID}) {
            state.active = templateID
            return state
        },
    }
})

export const {
    selectTemplate
} = templates.actions

export const useTemplates = () =>
    useSelector(state => {
        return state.templates
    })

export const useActiveTemplate = () =>
    useSelector(state => {
        return state.templates.active
    })


export const fetchTemplate = (templateID) => () => {
    loadTemplate(templateID)
}

export default templates.reducer
