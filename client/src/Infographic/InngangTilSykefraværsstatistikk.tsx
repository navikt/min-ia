import { Lenkeflis } from "../Lenkeflis/Lenkeflis";
import { StatistikkIkonIkon } from "../Forside/ikoner/StatistikkIkonIkon";
import { BodyLong } from "@navikt/ds-react";
import styles from "./Infographic.module.scss";
import { LenkeMedEventutsendelse } from "../LenkeMedNavigereEvent/LenkeMedEventutsendelse";

export const InngangTilSykefraværsstatistikk = (props: {
  sykefravarsstatistikkUrl: string;
  useMobileVersion: boolean;
}) => {
  if (props.useMobileVersion) {
    return (
      <Lenkeflis
        overskrift={"Sykefraværs&shy;statistikk"}
        ikon={<StatistikkIkonIkon />}
        brødtekst={""}
        href={props.sykefravarsstatistikkUrl}
        fyltoppBakgrunn={true}
      />
    );
  }
  return (
    <BodyLong className={styles.oversiktTekst} size="medium">
      Trenger du en større oversikt?{" "}
      <LenkeMedEventutsendelse
        href={props.sykefravarsstatistikkUrl}
        lenketekst="Klikk her for å gå til statistikksiden."
      />
    </BodyLong>
  );
};
