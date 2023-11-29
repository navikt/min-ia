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
import {
  Accordion,
  Bleed,
  BodyLong,
  BodyShort,
  Heading,
  Link,
  List,
} from "@navikt/ds-react";
import { AktivitetHeader } from "./AktivitetHeader";
import { AktivitetStatistikkType } from "./typer";
import Oppgave from "./Oppgave";
import { AndreForebyggendeVerktoy } from "./AndreForebyggendeVerktoy";
import {
  AktivitetProvider,
  useStatusForAktiviteter,
} from "./context/aktivitetStatus";
import { useOrgnr } from "../hooks/useOrgnr";
import { useHentAktiviteter } from "../hooks/useHentAktiviteter";
import { RestStatus } from "../integrasjoner/rest-status";
import { AggregertStatistikkDto } from "../integrasjoner/aggregert-statistikk-api";
import { Sykefraværsstatistikk } from "./Sykefraværsstatistikk";
import { sendÅpneAktivitetEvent } from "../amplitude/events";

export default function AktivitetSeksjon(props: {
  sykefraværsstatistikk: AggregertStatistikkDto;
}) {
  const orgnr = useOrgnr();
  const hentedeAktiviteter = useHentAktiviteter(orgnr);
  return (
    <AktivitetProvider
      aktivitetStatuser={
        hentedeAktiviteter.status === RestStatus.Suksess &&
        Array.isArray(hentedeAktiviteter?.data)
          ? hentedeAktiviteter?.data
          : []
      }
      sykefraværsstatistikk={props.sykefraværsstatistikk}
    >
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
          <AndreForebyggendeVerktoy />
        </div>
      </Bleed>
    </AktivitetProvider>
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

function findOppgaveIder(aktivitet: AktivitetinnholdType): string[] {
  if (
    typeof aktivitet === "string" ||
    aktivitet.type === "punktliste" ||
    aktivitet.type === "numrertliste" ||
    aktivitet.type === "lenke" ||
    aktivitet.type === "statistikkbokser"
  ) {
    return [];
  }

  if (aktivitet.type === "oppgave") {
    return [aktivitet.id];
  }

  if (Array.isArray(aktivitet?.innhold)) {
    return aktivitet.innhold.flatMap(findOppgaveIder);
  }

  return [];
}

function Aktivitet({ aktivitet }: { aktivitet: AktivitetType }) {
  const [åpen, setÅpen] = React.useState(false);
  const ider = React.useMemo(
    () => aktivitet.innhold.flatMap(findOppgaveIder),
    [aktivitet]
  );
  const statuser = useStatusForAktiviteter(ider);
  const aktivitetStatistikk: AktivitetStatistikkType = React.useMemo(() => {
    const ferdige = statuser.filter((status) => status === "FULLFØRT").length;
    const påbegynte = statuser.filter((status) => status === "STARTET").length;
    const totalt = statuser.length;

    return {
      ferdige,
      påbegynte,
      ikkeStartet: totalt - ferdige - påbegynte,
      totalt,
    };
  }, [statuser]);

  return (
    <Accordion.Item className={styles.aktivitet} open={åpen}>
      <Accordion.Header
        className={`${getAktivitetHeaderFarge(aktivitetStatistikk)} ${
          styles.accordionHeader
        }`}
        onClick={() => {
          if (!åpen) {
            sendÅpneAktivitetEvent(aktivitet.tittel);
          }

          setÅpen(!åpen);
        }}
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
      return <Sykefraværsstatistikk />;
    default:
      console.error("Ukjent innholdstype", innhold);
      return null;
  }
}

function Tekst({ innhold }: AktivitetTekstType) {
  return <BodyLong spacing>{innhold}</BodyLong>;
}

function Undertittel({ innhold }: AktivitetUndertittelType) {
  return <Heading size="medium">{innhold}</Heading>;
}

function Punktliste({ innhold }: AktivitetPunktlisteType) {
  return (
    <List as="ul">
      {innhold.map((punkt, index) => (
        <Punkt {...punkt} key={index} />
      ))}
    </List>
  );
}

function Numrertliste({ innhold }: AktivitetNumrertlisteType) {
  return (
    <List as="ol">
      {innhold.map((punkt, index) => (
        <Punkt {...punkt} key={index} />
      ))}
    </List>
  );
}

function Punkt({ innhold }: AktivitetPunktType) {
  return (
    <List.Item>
      {Array.isArray(innhold) ? (
        innhold.map((innhold, index) => (
          <AktivitetInnhold innhold={innhold} key={index} />
        ))
      ) : (
        <AktivitetInnhold innhold={innhold} />
      )}
    </List.Item>
  );
}

function Lenke({ tekst, url }: AktivitetLenkeType) {
  return <Link href={url}>{tekst}</Link>;
}

function Inlinetekst({ innhold }: AktivitetInlinetekstType) {
  return (
    <BodyShort>
      {innhold.map((innhold, index) =>
        typeof innhold === "string" ? (
          innhold
        ) : (
          <AktivitetInnhold innhold={innhold} key={index} />
        )
      )}
    </BodyShort>
  );
}

function Infoboks({ tittel, innhold }: AktivitetInfoboksType) {
  return (
    <div className={styles.infoboks}>
      <Heading size="medium">{tittel}</Heading>
      {innhold.map((innhold, index) => (
        <AktivitetInnhold innhold={innhold} key={index} />
      ))}
    </div>
  );
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
