import React from "react"
import MarkThreeConnect from "./components/MarkThreeConnect"

const App = () => {
    return (
        <div>

             <nav className="flex items-center justify-between flex-wrap bg-primary-500 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
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
        </div>
    )
}

export default App
