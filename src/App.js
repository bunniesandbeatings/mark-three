import React from "react"
import MarkThreeConnect from "./components/MarkThreeConnect"
import logo from "./images/logo.svg"
import {useDispatch} from "react-redux"
import {fetchTemplate, STATUS_FOUND, useMidi} from "./midi"

const DropDown = ({children, onChange}) => {
    return (
        <div className="relative">
            <select
                className="dropdown dropdown-default focus:outline-white focus:bg-white"
                onChange={onChange}
            >
                {children}
            </select>
            <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    )
}

const SessionSelector = () => {
    const dispatch = useDispatch()
    const midi = useMidi()

    const receiveHandler = e => {
        dispatch(fetchTemplate(1))
    }

    return (
        <div className="flex items-center justify-between flex-wrap bg-primary-900 px-4 py-2">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <DropDown onChange={e => console.log(e.target.value)}>
                    <option value={1}>Session 1</option>
                    <option value={2}>Session 2</option>
                    <option value={3}>Session 3</option>
                    <option value={4}>Session 4</option>
                    <option value={5}>Session 5</option>
                </DropDown>

                {(midi.status === STATUS_FOUND) && <>
                    <button className="btn btn-blue">
                        <i className="fas fa-upload"/> Send
                    </button>

                    <button className="btn btn-blue" onClick={receiveHandler}>
                        <i className="fas fa-download"/> Receive
                    </button>
                </>
                }
            </div>
        </div>
    )
}

const App = () => {
    return (
        <div>
            <nav className="flex items-center justify-between flex-wrap bg-primary-500 p-4">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <img src={logo} alt="Mark Three logo" className="h-12 w-12 mr-4"/>
                    <span className="font-semibold text-xl tracking-tight">Mark Three</span>

                </div>

                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        {/*<a href="#responsive-header"*/}
                        {/*   className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">*/}
                        {/*    Menu*/}
                        {/*</a>*/}
                        {/*<a href="#responsive-header"*/}
                        {/*   className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">*/}
                        {/*    items*/}
                        {/*</a>*/}
                    </div>
                    <div>
                        <MarkThreeConnect/>
                    </div>
                </div>
            </nav>

            <SessionSelector/>
        </div>
    )
}

export default App
