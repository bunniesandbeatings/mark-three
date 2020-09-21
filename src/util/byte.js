export const toHex = byteArray => {
    let result = byteArray.reduce(
        (output, elem) => (output + ('0' + elem.toString(16).toUpperCase()).slice(-2) + ' '),
        ''
    )
    return result.trim()
}

export const toText = byteArray => {
    return byteArray.reduce(
        (output, elem) => {
            if (elem !== 0x00) {
                output = output + String.fromCharCode(elem)
            }
            return output
        },
        ''
    )
}
