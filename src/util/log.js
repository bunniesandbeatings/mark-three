export const devlog = msg => {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production') {
        console.log(msg)
    }
}

export const log = msg => {
    console.log(msg)
}