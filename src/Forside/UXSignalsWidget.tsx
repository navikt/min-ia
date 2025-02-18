import React from "react";

import {useScript} from "./UseScript";

export const UXSignalsWidget = ({eriDev, id}: {
    eriDev: boolean
    id: string
}) => {
    useScript(true);
    return (<div
        data-uxsignals-embed={id}
        data-uxsignals-mode={eriDev ? 'demo' : ''}
        style={{maxWidth: '620px'}}
    />);
}