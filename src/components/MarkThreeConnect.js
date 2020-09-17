import React, {useEffect} from "react"
import {connect, useMidi} from "../midi"
import {useDispatch} from "react-redux"

const MarkThreeConnect = () => {
    const midi = useMidi()
    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(connect())
        },
        [midi.status]
    )

    return (
        <p>
            Status: {midi.status}
        </p>
    )
}


export default MarkThreeConnect