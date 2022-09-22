import React, { FunctionComponent } from "react";
import styles from "./Kostnad.module.scss";
import classNames from "classnames";
import { Kalkulatorvariant } from "../kalkulator-utils";
import { SedlerIkon } from "./SedlerIkon";
import { Heading, Label } from "@navikt/ds-react";

interface Props {
  nåværendeKostnad: number;
  ønsketKostnad: number;
  ønsketRedusert: number;
  antallTapteDagsverkEllerProsent?: Kalkulatorvariant;
}

const beregnKostnad = (props: Props) => {
  return props.nåværendeKostnad - props.ønsketKostnad;
};

const Kostnad: FunctionComponent<Props> = (props) => {
  const sykefraværMål =
    props.ønsketRedusert !== undefined && !isNaN(props.ønsketRedusert)
      ? props.antallTapteDagsverkEllerProsent === Kalkulatorvariant.Prosent
        ? props.ønsketRedusert.toFixed(1).replace(".", ",")
        : props.ønsketRedusert.toFixed(0)
      : 0;

  const formatertSykefraværMål =
    `${sykefraværMål}` +
    (props.antallTapteDagsverkEllerProsent === Kalkulatorvariant.Prosent
      ? "%"
      : " dagsverk");

  const redusertKostnadTekst = `Reduserer dere sykefraværet til ${formatertSykefraværMål} sparer dere årlig`;
  const øktKostnadTekst = `Øker dere sykefraværet til ${formatertSykefraværMål} taper dere ytterligere årlig`;

  return (
    <div className={styles.kostnad}>
      <Heading level="2" size="medium" className={styles.tittel}>
        Resultat
        <div className={styles.ikon}>
          <SedlerIkon />
        </div>
      </Heading>
      <div className={styles.tekst}>
        <Label>Totale kostnader per år med nåværende sykefravær</Label>
        <Label>{somKroneverdi(props.nåværendeKostnad)}</Label>
      </div>
      <div className={classNames(styles.tekst, styles.sisterad)}>
        <Label>Totale kostnader per år ved målsatt sykefravær</Label>
        <Label>{somKroneverdi(props.ønsketKostnad)}</Label>
      </div>

      <div className={classNames(styles.tekst, styles.resultatrad)}>
        <Label>
          {beregnKostnad(props) >= 0 ? redusertKostnadTekst : øktKostnadTekst}
        </Label>
        <Label
          className={
            beregnKostnad(props) >= 0
              ? styles.sisteresultat
              : styles.sisteresultat_minus
          }
        >
          {somKroneverdi(beregnKostnad(props))}
        </Label>
      </div>
    </div>
  );
};

const somKroneverdi = (tall: number): string => {
  return tall.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") + " kr";
};

export default Kostnad;
