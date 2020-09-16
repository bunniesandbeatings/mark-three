import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./styles.scss"

import {Provider} from 'react-redux'
import store from './store'

const render = () => {
    const App = require('./App').default

    ReactDOM.render(
        <Provider store={store}>
            <App name="Mark Three"/>
        </Provider>,
        document.getElementById('app')
    )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./app/App', render)
}