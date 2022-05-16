import {Kurs} from "../../utils/kurs-api";
import {FunctionComponent} from "react";
import {NesteNettkursIkon} from "../ikoner/NesteNettkursIkon";
import {BodyLong} from "@navikt/ds-react";
import {formatterKursdato} from "../../utils/kurs-utils";

interface Props {
    nesteNettkurs: Kurs | undefined;
}

export const NesteNettkurs:FunctionComponent<Props> = ({nesteNettkurs}) => {
    if (!nesteNettkurs) {
        return null;
    }
    return (
        <div className={''}>
            <NesteNettkursIkon />
            <BodyLong>Neste nettkurs er: {formatterKursdato(nesteNettkurs?.start)}</BodyLong>
        </div>
    );
}
