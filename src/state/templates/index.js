import {createSlice} from '@reduxjs/toolkit'
import {useSelector} from "react-redux"
import _ from "lodash"
import {emptyTemplate} from '../../lib/mkIII/model'
import {templates} from '../../lib/mkIII/schema'
import {normalize} from 'normalizr'
import {loadTemplate} from '../../lib/mkIII/mkIII'

const generateEmpty = () => {
    const emptyTemplates = _.range(64).map(index => emptyTemplate(index))
    return normalize(emptyTemplates, templates)
}

const templateSlice = createSlice({
    name: 'templates',
    initialState: {
        activeTemplateID: 0,
        ...generateEmpty().entities
    },
    reducers: {
        selectTemplate(state, {payload: templateID}) {
            state.activeTemplateID = templateID
            return state
        },
        setRawTemplate(state, {payload: {id, data}}) {
            const template = state.templates[id]
            template.raw = data
            state.templates[id] = template
            return state
        },
        setTemplateField(state, {payload: {id, field, value}}) {
            const template = state.templates[id]
            template[field] = value
            return state
        },
        setButtonField(state, {payload: {id, field, value}}) {
            const button = state.buttons[id]
            button[field] = value
            return state
        },
        setKnobField(state, {payload: {id, field, value}}) {
            const knob = state.knobs[id]
            knob[field] = value
            return state
        }
    }
})

export const {
    selectTemplate,
    setRawTemplate,
    setTemplateField,
    setButtonField,
    setKnobField,
} = templateSlice.actions

/// ---- ACTIONS
export const fetchTemplate = (templateID) => (dispatch) =>
    loadTemplate(templateID, (template) => {dispatch(setRawTemplate(template))})


/// ---- SELECTORS

export const useActiveTemplateID = () =>
    useSelector(state => {
        return state.templates.activeTemplateID
    })

export const useActiveTemplate = () =>
    useSelector(state => {
        return state.templates.templates[state.templates.activeTemplateID]
    })

export const useButton = (id) =>
    useSelector(state => {
        return state.templates.buttons[id]
    })

export const useKnob = (id) =>
    useSelector(state => {
        return state.templates.knobs[id]
    })

export const useTemplates = () =>
    useSelector(state => {
        return state.templates.templates
    })

export default templateSlice.reducer
