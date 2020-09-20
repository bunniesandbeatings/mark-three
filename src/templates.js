import {createSlice} from '@reduxjs/toolkit'
import {useSelector} from "react-redux"
import {loadTemplate} from "./mkIII"

const templates = createSlice({
    name: 'templates',
    initialState: {
        raw: Array.from({length:64}, () => []),  // Filled Array of Arrays
        active: 0
    },
    reducers: {
        selectTemplate(state, {payload: templateID}) {
            state.active = templateID
            return state
        },
        setRawTemplate(state, {payload: {id, data}}) {
            state.raw[id] = data
            return state
        }
    }
})

export const {
    selectTemplate,
    setRawTemplate
} = templates.actions

export const useTemplates = () =>
    useSelector(state => {
        return state.templates
    })

export const useActiveTemplate = () =>
    useSelector(state => {
        const id = state.templates.active
        return {
            id,
            raw: state.templates.raw[id]
        }
    })

export const useActiveTemplateID = () =>
    useSelector(state => {
        return state.templates.active
    })


export const fetchTemplate = (templateID) => (dispatch) => {
    loadTemplate(templateID, (template) => {
        dispatch(setRawTemplate({id: template.id, data: template.data}))
    })
}

export default templates.reducer
