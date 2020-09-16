import React, {useEffect, useState} from "react"
import WebMidi from "webmidi"

const MarkThreeConnect = () => {
    const [once, setOnce] = useState(false);

    useEffect(
        () => {
            WebMidi.enable(function (err) {
                if (err) {
                    console.log("WebMidi could not be enabled.", err);
                } else {
                    console.log("WebMidi enabled!");
                    console.log(WebMidi.inputs);
                    console.log(WebMidi.outputs);
                }
            });
            setOnce(true)
        },
        [once]
    )

    return null
}

export default MarkThreeConnect