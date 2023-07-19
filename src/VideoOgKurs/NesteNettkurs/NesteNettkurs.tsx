import {Kurs} from "../../utils/kurs-api";
import {FunctionComponent} from "react";
import {NesteNettkursIkon} from "../ikoner/NesteNettkursIkon";
import {BodyLong} from "@navikt/ds-react";
import {formatterKursdato} from "../../utils/kurs-utils";
import styles  from "./neste-nettkurs.module.scss";

interface Props {
    nesteNettkurs: Kurs | null;
}

export const NesteNettkurs:FunctionComponent<Props> = ({nesteNettkurs}) => {
    if (!nesteNettkurs) {
        return null;
    }
    return (
        <div className={styles.nesteNettkurs}>
            <NesteNettkursIkon className={styles.nesteNettkurs__ikon}/>
            <BodyLong>Neste kurs er: {formatterKursdato(nesteNettkurs?.start)}</BodyLong>
        </div>
    );
}
