import React, {ReactElement, ReactNode} from "react";
import styles from "./InfographicSnippet.module.scss";

export const InfographicSnippet = (props: {
    ikon: ReactNode;
    tekst: string;
    verdi: string
}) => {
    return (
        <div className={styles.snippetWrapper}>
            <div className={styles.ikonWrapper}>{props.ikon}</div>
            {props.tekst}
            <b>{props.verdi}</b>
        </div>
    ); 
};
