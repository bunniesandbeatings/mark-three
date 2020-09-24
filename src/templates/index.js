import {createSlice} from '@reduxjs/toolkit'
import {useSelector} from "react-redux"
// import {loadTemplate} from "../lib/mkIII/mkIII"
// import {parseRawTemplate} from "../lib/mkIII/util"
import _ from "lodash"
import {emptyTemplate} from '../lib/mkIII/model'
import {templates} from '../lib/mkIII/schema'
import {normalize} from 'normalizr'
import {loadTemplate} from '../lib/mkIII/mkIII'

const generateEmpty = () => {
    const emptyTemplates =_.range(64).map(index => emptyTemplate(index))
    return normalize(emptyTemplates, templates)
}

const index = createSlice({
    name: 'templates',
    initialState: {
        raw: Array.from({length: 64}, () => []),  // Filled Array of Arrays
        activeTemplateID: 0,
        ...generateEmpty().entities
    },
    reducers: {
        selectTemplate(state, {payload: templateID}) {
            state.activeTemplateID = templateID
            return state
        },
        // setRawTemplate(state, {payload: {id, raw, parsed}}) {
        //     state.raw[id] = raw
        //     state.parsed[id] = _.merge(state.parsed[id], parsed)
        //     return state
        // },
        setTemplateField(state, {payload: {id, field, value}}) {
            const template = state.templates[id]
            template[field] = value
            // state.templates[id] = template
            return state
        },
        setButtonField(state, {payload: {id, field, value}}) {
            const button = state.buttons[id]
            button[field] = value
            // state.buttons[id] = button
            return state
        }
    }
})

export const {
    selectTemplate,
    // setRawTemplate,
    setTemplateField,
    setButtonField,
} = index.actions

// export const useTemplates = () =>
//     useSelector(state => {
//         return state.templates
//     })
//
// export const useActiveRawTemplate = () =>
//     useSelector(state => state.templates.raw[state.templates.active])
//
// export const useActiveParsedTemplate = () =>
//     useSelector(state => state.templates.parsed[state.templates.active])
//
//
// export const useButton = (templateID, buttonID) =>
//     useSelector(state => {
//         return state.templates.parsed[templateID].buttons[buttonID]
//     })
//

/// ---- ACTIONS
export const fetchTemplate = (templateID) => (dispatch) => {
    loadTemplate(templateID, (template) => {
        dispatch(
            setRawTemplate({
                id: template.id,
                raw: template.data,
            })
        )
    })
}


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

export const useTemplates = () =>
    useSelector(state => {
        return state.templates.templates
    })

export default index.reducer
