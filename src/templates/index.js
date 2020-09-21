import {createSlice} from '@reduxjs/toolkit'
import {useSelector} from "react-redux"
import {loadTemplate} from "../lib/mkIII/mkIII"
import {parseRawTemplate} from "../lib/mkIII/util"
import _ from "lodash"

const emptyButton = id => ({
    id,
    displayID: id + 1,
    name: `Button${id + 1}`
})

const emptyTemplate = id => ({
    id,
    displayID: id + 1,
    name: "<Empty>",
    buttons: _.range(0, 16).map(id => emptyButton(id))
})

const index = createSlice({
    name: 'templates',
    initialState: {
        raw: Array.from({length: 64}, () => []),  // Filled Array of Arrays
        active: 0,
        parsed: _.range(64).map(index => emptyTemplate(index)),
    },
    reducers: {
        selectTemplate(state, {payload: templateID}) {
            state.active = templateID
            return state
        },
        setRawTemplate(state, {payload: {id, raw, parsed}}) {
            state.raw[id] = raw
            // TODO: show Dashboard Team
            state.parsed[id] = _.merge(state.parsed[id], parsed)
            return state
        },
        setTemplateField(state, {payload: {id, field, value}}) {
            const template = state.parsed[id]
            template[field] = value
            state.parsed[id] = template
            return state
        }
    }
})

export const {
    selectTemplate,
    setRawTemplate,
    setTemplateField
} = index.actions

export const useTemplates = () =>
    useSelector(state => {
        return state.templates
    })

export const useActiveRawTemplate = () =>
    useSelector(state => state.templates.raw[state.templates.active])

export const useActiveParsedTemplate = () =>
    useSelector(state => state.templates.parsed[state.templates.active])

export const useActiveTemplateID = () =>
    useSelector(state => {
        return state.templates.active
    })

export const fetchTemplate = (templateID) => (dispatch) => {
    loadTemplate(templateID, (template) => {
        dispatch(
            setRawTemplate({
                id: template.id,
                raw: template.data,
                parsed: parseRawTemplate(template.data)
            })
        )
    })
}

export default index.reducer
