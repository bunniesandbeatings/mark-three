export const toHexString = byteArray => {
    let result = byteArray.reduce(
        (output, elem) => (output + ('0' + elem.toString(16).toUpperCase()).slice(-2) + ' '),
        ''
    )
    return result.trim()
}

export const toTextString = byteArray => {
    return byteArray.reduce(
        (output, elem) => (output + String.fromCharCode(elem)),
        ''
    )
}
