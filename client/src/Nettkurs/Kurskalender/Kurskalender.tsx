import React, { useEffect, useState } from "react";
import { Lenkepanel } from "../../komponenter/Lenkepanel/Lenkepanel";
import { KursKalenderIkon } from "../ikoner/KursKalenderIkon";
import { hentRestKurs, RestKursliste } from "../../utils/kurs-api";
import { RestStatus } from "../../integrasjoner/rest-status";
import { getNesteNettkurs } from "../../utils/kurs-utils";
import { NesteNettkurs } from "../NesteNettkurs/NesteNettkurs";
import {Kurspåmelding} from "../Kurspåmelding/Kurspåmelding";

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
const kurspåmelding:Kurspåmelding={
    tittel:"Ønsker du å delta på kurs?",
    undertekst:"Kursene er gratis. Du kan stille spørsmål og få svar når du deltar på kursene.",
    undertekstUtenKurs:`Kursene er gratis. Du kan stille spørsmål og få svar når du deltar på kursene. Det er foreløpig ikke satt opp nye kurs. Når nye kurs er tilgjengelig, vil du se dem her.`,
    lenke:{
        tekst:'',
        tittel:'Finn et kurs som passer for deg her',
        href:'https://arbeidsgiver.nav.no/kursoversikt/?type=Webinar&tema=Inkluderende%20arbeidsliv%20(IA)'
    }
}
  return (
    <>
      <NesteNettkurs nesteNettkurs={nesteNettkurs} />
      <Kurspåmelding kurspåmelding={kurspåmelding}
                     nesteNettkurs={nesteNettkurs}/>
        {/*<div>{kurspåmelding.tittel}</div>
      <div>
          {kurspåmelding.undertekst}</div>
      <Lenkepanel
        tittel={kurspåmelding.lenke.tittel}
        ikon={KursKalenderIkon}
        href={kurspåmelding.lenke.href}
      />*/}
    </>
  );
};
export default Kurskalender;
