import React from "react";

import styles from "./Aktiviteter.module.scss";
import {
  AktivitetTekstType,
  AktivitetType,
  AktivitetUndertittelType,
  AktivitetinnholdType,
  aktiviteter,
} from "./AktivitetData";
import { Accordion, Bleed, BodyLong, Heading } from "@navikt/ds-react";
import { AktivitetHeader } from "./AktivitetHeader";
import { AktivitetStatistikkType } from "./typer";
import Oppgave from "./Oppgave";
import { AndreForebyggendeVerktoy } from "./AndreForebyggendeVerktoy";

export default function AktivitetSeksjon(props: {
  samtalestøtteUrlMedOrgnr: string;
}) {
  return (
    <Bleed marginInline="full" className={styles["aktiviteter-seksjon"]}>
      <div className={styles["aktiviteter-seksjon-innhold"]}>
        <Heading size="large" className={styles["aktiviteter-header"]}>
          Øvelser og verktøy
        </Heading>
        <BodyLong className={styles["aktiviteter-brødtekst"]}>
          Vi har laget et par gode grunnleggende øvelser som mange ledere
          etterspør. Her kan du starte!
        </BodyLong>
        <Aktiviteter />
        <AndreForebyggendeVerktoy href={props.samtalestøtteUrlMedOrgnr} />
      </div>
    </Bleed>
  );
}

function Aktiviteter() {
  return (
    <Accordion>
      {aktiviteter.map((aktivitet, index) => (
        <Aktivitet key={index} aktivitet={aktivitet} />
      ))}
    </Accordion>
  );
}

function Aktivitet({ aktivitet }: { aktivitet: AktivitetType }) {
  const aktivitetStatistikk: AktivitetStatistikkType = {
    //TODO
    ferdige: Math.floor(Math.random() * 4),
    påbegynte: Math.floor(Math.random() * 4),
    ikkeStartet: Math.floor(Math.random() * 4),
    totalt: 10,
  };

  return (
    <Accordion.Item className={styles.aktivitet}>
      <Accordion.Header
        className={`${getAktivitetHeaderFarge(aktivitetStatistikk)} ${
          styles.accordionHeader
        }`}
      >
        <AktivitetHeader
          aktivitet={aktivitet}
          aktivitetStatistikk={aktivitetStatistikk}
        />
      </Accordion.Header>
      <Accordion.Content>
        {aktivitet.innhold.map((innhold, index) => (
          <AktivitetInnhold key={index} innhold={innhold} />
        ))}
      </Accordion.Content>
    </Accordion.Item>
  );
}

export function AktivitetInnhold({
  innhold,
}: {
  innhold: AktivitetinnholdType;
}) {
  switch (innhold.type) {
    case "oppgave":
      return <Oppgave {...innhold} />;
    case "tekst":
      return <Tekst {...innhold} />;
    case "undertittel":
      return <Undertittel {...innhold} />;
    default:
      return null;
  }
}

function Tekst({ innhold }: AktivitetTekstType) {
  return <p>{innhold}</p>;
}

function Undertittel({ innhold }: AktivitetUndertittelType) {
  return <h2>{innhold}</h2>;
}

function getAktivitetHeaderFarge(aktivitetStatistikk: AktivitetStatistikkType) {
  if (aktivitetStatistikk.totalt === 0) {
    return styles.aktivitetIkkeValgt;
  }
  if (aktivitetStatistikk.ferdige === aktivitetStatistikk.totalt) {
    return styles.aktivitetFullført;
  }

  return styles.aktivitetIkkeValgt;
}
