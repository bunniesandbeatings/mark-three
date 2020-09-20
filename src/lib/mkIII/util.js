import {toText} from "../../util/byte"


export const parseRawTemplate = raw => {
    return {
        name: toText(raw.slice(4, 20))
    }
}