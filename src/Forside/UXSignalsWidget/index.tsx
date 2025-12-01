import React from "react";

import { useScript } from "./UseScript";

import styles from "./uxSignalsWidget.module.scss";

export const UXSignalsWidget = ({ eriDev, id }: {
    eriDev: boolean
    id: string
}) => {
    useScript(true);

    return (<div
        data-uxsignals-embed={id}
        data-uxsignals-mode={eriDev ? 'demo' : ''}
        className={styles.uxSignalWidget}
    />);
}