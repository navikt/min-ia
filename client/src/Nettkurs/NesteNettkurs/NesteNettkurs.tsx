import {Kurs} from "../../utils/kurs-api";
import {FunctionComponent} from "react";
import {NesteNettkursIkon} from "../ikoner/NesteNettkursIkon";
import {BodyLong} from "@navikt/ds-react";
import {formatterKursdato} from "../../utils/kurs-utils";
import styles  from "./neste-nettkurs.module.scss";

interface Props {
    nesteNettkurs: Kurs | undefined;
}

export const NesteNettkurs:FunctionComponent<Props> = ({nesteNettkurs}) => {
    if (!nesteNettkurs) {
        return null;
    }
    return (
        <div className={styles.nesteNettkurs}>
            <NesteNettkursIkon className={styles.nesteNettkurs__ikon}/>
            <BodyLong>Neste nettkurs er: {formatterKursdato(nesteNettkurs?.start)}</BodyLong>
        </div>
    );
}
