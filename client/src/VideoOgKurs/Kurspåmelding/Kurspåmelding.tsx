import { FunctionComponent } from "react";
import {
  Lenkepanel,
  LenkepanelProps,
} from "../../komponenter/Lenkepanel/Lenkepanel";
import { KursKalenderIkon } from "../ikoner/KursKalenderIkon";
import styles from "./kurspåmelding.module.scss";

export interface Kurspåmelding {
  tittel: string;
  undertekst: string;
  undertekstUtenKurs: string;
  undertekstUtenKursDel2: string;
  lenke: LenkepanelProps;
}

interface Props {
  finnesKommendeNettkurs: boolean;
}

export const Kurspåmelding: FunctionComponent<Props> = ({
  finnesKommendeNettkurs,
}: Props) => {
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

  if (finnesKommendeNettkurs) {
    return (
      <>
        <div className={styles.kurspåmelding_tekst}>
          {kurspåmelding.undertekst}
        </div>
        <Lenkepanel
          tittel={kurspåmelding.lenke.tittel}
          ikon={<KursKalenderIkon />}
          href={kurspåmelding.lenke.href}
          className={styles.kurspåmelding__folger}
        />
      </>
    );
  } else {
    return (
      <>
        <div className={styles.kurspåmelding_tekst}>
          {kurspåmelding.undertekstUtenKurs}
        </div>
        <div className={styles.kurspåmelding__folger}>
          {kurspåmelding.undertekstUtenKursDel2}
        </div>
      </>
    );
  }
};
