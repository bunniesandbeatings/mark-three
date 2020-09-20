import {useActiveTemplate} from "./templates"
import _ from "lodash"
import React, {useState} from "react"

const PADDING = "_"
const START_OF_FIELD = "■"
const UNKNOWN = "¿"
const OTHER = "▒"

const hexLine = cols => line => {
    let out = line.reduce(
        (output, elem) => (output + ('0' + elem.toString(16).toUpperCase()).slice(-2) + ' '),
        ''
    )
    return out + _.repeat("   ", cols - line.length)
}

const textChar = char => {
    if (char === 0x7f) {
        return UNKNOWN
    }
    if (char === 0x00) {
        return PADDING
    }
    if (char === 0x01) {
        return START_OF_FIELD
    }
    if (char < 0x20 || char > 0x7E) {
        return OTHER
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
                     style={{"fontFamily": "Inconsolata", "fontSize": "12pt"}}/>
}


export const DevConsole = () => {
    if (process.env.NODE_ENV == 'production') {
        return null
    }

    const {raw} = useActiveTemplate()

    const [offset, setOffset] = useState(0)
    const [width, setWidth] = useState(50)

    const key = [
        PADDING + " 0x00 padding?",
        START_OF_FIELD + " 0x01 start of field",
        UNKNOWN + " 0x7F unknown",
        OTHER + " other"
    ]

    return <div className="m-4">
        <hr/>
        <h1>Dev Console</h1>
        <div className="flex flex-wrap ">


            <div className="mr-8">
                Offset:<textarea rows={1} value={offset} onChange={e => setOffset(Number(e.target.value))}/>
                <button onClick={_ => setOffset(offset + 1)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-1 rounded-full">+
                </button>
                <button onClick={_ => setOffset(offset - 1)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-1 rounded-full">-
                </button>
            </div>
            <div className="mr-8">
                Width:<textarea rows={1} value={width} onChange={e => setWidth(Number(e.target.value))}/>
                <button onClick={_ => setWidth(width + 1)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-1 rounded-full">+
                </button>
                <button onClick={_ => setWidth(width - 1)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-1 rounded-full">-
                </button>
            </div>
        </div>
        <div>
            <textarea readOnly rows={key.length} value={key.join("\n")}
                      style={{"fontFamily": "Inconsolata", "fontSize": "12pt"}}/>
        </div>

        <HexPrinter data={_.slice(raw, offset)} columns={width} heading rowHeading/>
    </div>
}

export default DevConsole