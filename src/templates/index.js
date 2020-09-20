import {createSlice} from '@reduxjs/toolkit'
import {useSelector} from "react-redux"
import {loadTemplate} from "../lib/mkIII/mkIII"
import {parseRawTemplate} from "../lib/mkIII/util"
import _ from "lodash"

const defaultTemplate = id => ({
    id,
    displayID: id + 1,
    name: "<Empty>"
})

const index = createSlice({
    name: 'templates',
    initialState: {
        raw: Array.from({length: 64}, () => []),  // Filled Array of Arrays
        active: 0,
        list: _.range(64).map(index => defaultTemplate(index)),
    },
    reducers: {
        selectTemplate(state, {payload: templateID}) {
            state.active = templateID
            return state
        },
        setRawTemplate(state, {payload: {id, raw, parsed}}) {
            state.raw[id] = raw
            var template = state.list[id]
            template.name = parsed.name
            state.list[id] = template
            return state
        }
    }
})

export const {
    selectTemplate,
    setRawTemplate
} = index.actions

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
