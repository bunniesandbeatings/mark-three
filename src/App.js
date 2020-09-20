import React, {useState} from "react"
import MarkThreeConnect from "./components/MarkThreeConnect"
import logo from "./images/logo.svg"
import {useDispatch} from "react-redux"
import {STATUS_FOUND, useMidi} from "./midi"
import _ from "lodash"
import {fetchTemplate, selectTemplate, useActiveTemplate, useActiveTemplateID} from "./templates"

const DropDown = ({children, onChange, value}) => {
    return (
        <div className="relative">
            <select
                className="dropdown dropdown-default focus:outline-white focus:bg-white"
                onChange={onChange}
                value={value}
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

const TemplateSelector = () => {
    const dispatch = useDispatch()
    const midi = useMidi()
    const activeTemplateID = useActiveTemplateID()

    const receiveHandler = e => {
        dispatch(fetchTemplate(activeTemplateID))
    }

    const handleSelectChange = e => dispatch(selectTemplate(e.target.value))

    return (
        <div className="flex items-center justify-between flex-wrap bg-primary-900 px-4 py-2">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <DropDown onChange={handleSelectChange} value={activeTemplateID}>
                    {_.range(64).map(
                        id =>
                            <option value={id} key={id}>
                                Template {id + 1}
                            </option>
                    )}
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

const hexLine = cols => line => {
    let out = line.reduce(
        (output, elem) => (output + ('0' + elem.toString(16).toUpperCase()).slice(-2) + ' '),
        ''
    )
    return out + _.repeat("   ", cols - line.length)
}

const textChar = char => {
    if (char < 0x20 || char > 0x7E) {
        return "."
    }
    return String.fromCharCode(char)
}

const textLine = line => line.reduce(
    (output, char) => (output + textChar(char)),
    ''
)


const HexPrinter = ({data, columns = 16, rows = 20, heading = false, rowHeading = false}) => {
    let linePrinter = hexLine(columns)
    let rowHeadingPad = "       | "

    const lines = _.chunk(data, columns)
    let hex = lines.map((line, index) => {
        let out = linePrinter(line) + "| "
        if (rowHeading) {
            out = ('00000' + (index * columns).toString(16).toUpperCase()).slice(-6) + " | " + out
        }
        out = out + textLine(line)
        return out
    })

    if (heading) {
        const headingLine = _.range(0, columns)
        hex = [
            (rowHeading && rowHeadingPad) + linePrinter(headingLine) + "|",
            (rowHeading && rowHeadingPad) + _.repeat('-', 3 * columns) + "|"
        ].concat(hex)
    }

    hex = hex.join("\n")

    let numLines = lines.length
    return <textarea readOnly rows={Math.min(numLines, rows)}
                     cols={(columns * 3) + 3 + (rowHeading && rowHeadingPad.length) + columns} value={hex}
                     style={{"fontFamily": "monospace"}}/>
}

const DevConsole = () => {
    if (process.env.NODE_ENV == 'production') {
        return null
    }

    const {raw} = useActiveTemplate()

    const [offset, setOffset] = useState(0)
    const [width, setWidth] = useState(0x20)

    return <div className="m-4">
        <hr/>
        <h1>Dev Console</h1>
        <p>
            Offset:<textarea rows={1} value={offset} onChange={e => setOffset(Number(e.target.value))}/>
            <button onClick={_ => setOffset(offset + 1)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-1 rounded-full">+
            </button>
            <button onClick={_ => setOffset(offset - 1)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-1 rounded-full">-
            </button>
        </p>
        <p>
            Width:<textarea rows={1} value={width} onChange={e => setWidth(Number(e.target.value))}/>
            <button onClick={_ => setWidth(width + 1)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-1 rounded-full">+
            </button>
            <button onClick={_ => setWidth(width - 1)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-1 rounded-full">-
            </button>
        </p>

        <HexPrinter data={_.slice(raw, offset)} columns={width} heading rowHeading/>
    </div>
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
                        {/*    Menu Items here*/}
                        {/*</a>*/}
                    </div>
                    <div>
                        <MarkThreeConnect/>
                    </div>
                </div>
            </nav>

            <TemplateSelector/>
            <DevConsole/>
        </div>
    )
}

export default App
