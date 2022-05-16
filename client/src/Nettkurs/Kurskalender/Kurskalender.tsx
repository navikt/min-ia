import React, {useEffect, useState} from "react";
import { Lenkepanel } from "../../komponenter/Lenkepanel/Lenkepanel";
import { KursKalenderIkon } from "../ikoner/KursKalenderIkon";
import {hentRestKurs, RestKursliste} from "../../utils/kurs-api";
import {RestStatus} from "../../integrasjoner/rest-status";
import {getNesteNettkurs} from "../../utils/kurs-utils";

const Kurskalender = () => {
    const [restKursliste, setRestKursliste] = useState<RestKursliste>({
        status: RestStatus.IkkeLastet,
    });

    useEffect(() => {
        const hentOgSetRestKurs = async () => {
            setRestKursliste(await hentRestKurs());
        };
        hentOgSetRestKurs();
    }, [setRestKursliste]);


    const nesteNettkurs = getNesteNettkurs(
        restKursliste.status === RestStatus.Suksess ? restKursliste.data : []
    );

    return (
    <>
        {nesteNettkurs}
      <div>Ønsker du å delta på kurs?</div>
      <div>
        Kursene er gratis. Du kan stille spørsmål og få svar når du deltar på
        kursene.
      </div>
      <Lenkepanel
        tittel={"Finn et kurs som passer for deg her"}
        ikon={KursKalenderIkon}
      />
    </>
  );
};
export default Kurskalender;
