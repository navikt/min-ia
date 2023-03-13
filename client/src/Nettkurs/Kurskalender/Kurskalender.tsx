import React, { useEffect, useState } from "react";
import { hentRestKurs, RestKursliste } from "../../utils/kurs-api";
import { RestStatus } from "../../integrasjoner/rest-status";
import { getNesteNettkurs } from "../../utils/kurs-utils";
import { NesteNettkurs } from "../NesteNettkurs/NesteNettkurs";
import { Kurspåmelding } from "../Kurspåmelding/Kurspåmelding";
import { Heading } from "@navikt/ds-react";
import styles from "./kurskalender.module.scss";

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
  const kurspåmelding: Kurspåmelding = {
    tittel: "Ønsker du å delta på kurs?",
    undertekst:
      "Kursene er gratis. Du kan stille spørsmål og få svar når du deltar på kursene.",
    undertekstUtenKurs: `Det er foreløpig ikke satt opp nye kurs. Du ser kurs her når de settes opp.`,
    undertekstUtenKursDel2: `Kursene er gratis. Du kan stille spørsmål og få svar når du deltar på kursene. `,
    lenke: {
      tekst: "",
      tittel: "Finn et kurs som passer for deg her",
      href: "https://arbeidsgiver.nav.no/kursoversikt/?tema=Inkluderende%20arbeidsliv%20(IA)",
    },
  };
  return (
    <div className={styles.kurskalender}>
      <Heading
        size={"large"}
        level={"2"}
        className={styles.kurskalender__tittel}
      >
        Vil du delta på kurs?
      </Heading>
      <NesteNettkurs nesteNettkurs={nesteNettkurs} />
      <Kurspåmelding
        kurspåmelding={kurspåmelding}
        nesteNettkurs={nesteNettkurs}
      />
    </div>
  );
};
export default Kurskalender;
