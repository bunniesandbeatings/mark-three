import React from "react"
import MarkThreeConnect from "./components/MarkThreeConnect"
import logo from "./images/logo.svg"

const DropDown = ({children}) => {
    return (
        <div className="relative">
            <select
                className="block appearance-none bg-gray-200 border border-white text-gray-900 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white">
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
            <div className="flex items-center justify-between flex-wrap bg-primary-900 px-4 py-2">
                <DropDown>
                    <option>Session 1</option>
                    <option>Session 2</option>
                    <option>Session 3</option>
                    <option>Session 4</option>
                    <option>Session 5</option>
                </DropDown>
                {/*    <p className="text-white">*/}
                {/*    Session 1*/}
                {/*    </p>*/}
            </div>

        </div>
    )
}

export default App
