import React from "react"
import MarkThreeConnect from "./components/MarkThreeConnect"
import TemplateSelector from "./components/TemplateSelector"
import DevConsole from "./components/DevConsole"
import logo from "./images/logo.svg"
import TemplateEditor from "./components/TemplateEditor"

const App = () => {
    return (
        <div className="h-screen flex flex-col">
            <div className="w-full object-top z-50">
                <nav className="flex items-center justify-between flex-wrap bg-primary-500 p-4">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <img src={logo} alt="Mark Three logo" className="h-12 w-12 mr-4"/>
                        <span className="font-semibold text-xl tracking-tight">Mark Three</span>
                    </div>

                    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                        <div className="text-sm lg:flex-grow"/>
                        <div>
                            <MarkThreeConnect/>
                        </div>
                    </div>
                </nav>
                <TemplateSelector/>
            </div>
            <div id="scrollable" className="overflow-auto">
                <TemplateEditor/>
                <DevConsole/>
            </div>
        </div>
    )
}

export default App
