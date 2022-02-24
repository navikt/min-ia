import {FunctionComponent, useEffect} from "react";
import fetch from "node-fetch";

export const Infographic: FunctionComponent = () => {

    useEffect(() => {
        // fetch kvartalsvis sykefraværshistorikk
        // regn ut de verdiene vi trenger:
        //      trend, fravær i bransjen,
        //      fravær i næringen (finnes i min-ia endepunkt),
        //      fravær i Norge (finnes i min-ia endepunkt)

        const kvartalsvis = await fetch()

    }, [])
    return (
        <p>Hallo</p>
    );
}