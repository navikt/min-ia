import React from "react";

import styles from "./Aktiviteter.module.scss";
import {
  AktivitetInfoboksType,
  AktivitetInlinetekstType,
  AktivitetLenkeType,
  AktivitetNumrertlisteType,
  AktivitetPunktType,
  AktivitetPunktlisteType,
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
  if (typeof innhold === "string") {
    return innhold;
  }

  switch (innhold.type) {
    case "oppgave":
      return <Oppgave {...innhold} />;
    case "tekst":
      return <Tekst {...innhold} />;
    case "undertittel":
      return <Undertittel {...innhold} />;
    case "punktliste":
      return <Punktliste {...innhold} />;
    case "lenke":
      return <Lenke {...innhold} />;
    case "inlinetekst":
      return <Inlinetekst {...innhold} />;
    case "infoboks":
      return <Infoboks {...innhold} />;
    case "numrertliste":
      return <Numrertliste {...innhold} />;
    case "statistikkbokser":
      return <Statistikkbokser />;
    default:
      console.error("Ukjent innholdstype", innhold);
      return null;
  }
}

function Tekst({ innhold }: AktivitetTekstType) {
  //TODO: Akselifisering
  return <p>{innhold}</p>;
}

function Undertittel({ innhold }: AktivitetUndertittelType) {
  //TODO: Akselifisering
  return <h2>{innhold}</h2>;
}

function Punktliste({ innhold }: AktivitetPunktlisteType) {
  //TODO: Akselifisering
  return (
    <ul>
      {innhold.map((punkt, index) => (
        <Punkt {...punkt} key={index} />
      ))}
    </ul>
  );
}

function Numrertliste({ innhold }: AktivitetNumrertlisteType) {
  //TODO: Akselifisering
  return (
    <ol>
      {innhold.map((punkt, index) => (
        <Punkt {...punkt} key={index} />
      ))}
    </ol>
  );
}

function Punkt({ innhold }: AktivitetPunktType) {
  //TODO: Akselifisering
  return (
    <li>
      {Array.isArray(innhold) ? (
        innhold.map((innhold, index) => (
          <AktivitetInnhold innhold={innhold} key={index} />
        ))
      ) : (
        <AktivitetInnhold innhold={innhold} />
      )}
    </li>
  );
}

function Lenke({ tekst, url }: AktivitetLenkeType) {
  //TODO: Akselifisering
  return <a href={url}>{tekst}</a>;
}

function Inlinetekst({ innhold }: AktivitetInlinetekstType) {
  //TODO: Akselifisering
  return (
    <p>
      {innhold.map((innhold, index) =>
        typeof innhold === "string" ? (
          innhold
        ) : (
          <AktivitetInnhold innhold={innhold} key={index} />
        )
      )}
    </p>
  );
}

function Infoboks({ tittel, innhold }: AktivitetInfoboksType) {
  //TODO: Akselifisering
  return (
    <div className={styles.infoboks}>
      <h2>{tittel}</h2>
      {innhold.map((innhold, index) => (
        <AktivitetInnhold innhold={innhold} key={index} />
      ))}
    </div>
  );
}

function Statistikkbokser() {
  return <div>statistikkbokser</div>;
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
