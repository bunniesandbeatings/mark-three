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
        <p className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
            Status: {midi.status}
        </p>
    )
}


export default MarkThreeConnect