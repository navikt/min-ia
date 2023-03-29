import { FunctionComponent } from "react";
import { Kurs } from "../../utils/kurs-api";
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
  kurspåmelding: Kurspåmelding | null;
  nesteNettkurs: Kurs | undefined;
}

export const Kurspåmelding: FunctionComponent<Props> = ({
  kurspåmelding,
  nesteNettkurs,
}: Props) => {
  return (
    <>
      {nesteNettkurs !== undefined && kurspåmelding !== null ? (
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
      ) : (
        <>
          <div className={styles.kurspåmelding_tekst}>
            {kurspåmelding?.undertekstUtenKurs}
          </div>
          <div className={styles.kurspåmelding__folger}>
            {kurspåmelding?.undertekstUtenKursDel2}
          </div>
        </>
      )}
    </>
  );
};
