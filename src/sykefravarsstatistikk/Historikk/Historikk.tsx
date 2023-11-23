import React, { FunctionComponent, useState } from "react";
import styles from "./Historikk.module.css";
import {
  Alert,
  BodyShort,
  Heading,
  Skeleton,
  ToggleGroup,
} from "@navikt/ds-react";
import GrafEllerTabell from "./GrafEllerTabell/GrafEllerTabell";
import { RestRessurs, RestStatus } from "../../integrasjoner/rest-status";
import { KvartalsvisSykefraværshistorikk } from "../hooks/useSykefraværAppData";
import { sendToogleEvent } from "../../amplitude/events";
import { sendDigitalIaTjenesteMetrikk } from "../../integrasjoner/ia-tjenestemetrikker-api";
import { MetrikkKilde } from "@navikt/ia-metrikker-client";

interface Props {
  restSykefraværsstatistikk: RestRessurs<KvartalsvisSykefraværshistorikk[]>;
  orgnr: string;
}

const Historikk: FunctionComponent<Props> = (props) => {
  const { restSykefraværsstatistikk, orgnr } = props;
  const [grafEllerTabell, setGrafEllerTabell] = useState<"graf" | "tabell">(
    "graf"
  );

  return (
    <div className={styles["historikk__wrapper"]}>
      <div className={styles["historikk"]}>
        <div className={styles["historikk__overdel-wrapper"]}>
          <div className={styles["historikk__tekst-wrapper"]}>
            <Heading id="historikk" spacing level="2" size="medium">
              Se sykefraværet over tid
            </Heading>
            <BodyShort className={styles["historikk__ingress"]}>
              Se hvordan det legemeldte sykefraværet utvikler seg over tid. Du
              kan sammenligne sykefraværet deres med næringen og sektoren dere
              tilhører.
            </BodyShort>
          </div>
          <ToggleGroup
            className={styles["historikk__toggle-group"]}
            defaultValue="graf"
            aria-label="Hvis du bruker skjermleser, bør du velge tabell"
            onChange={(value) => {
              const grafEllerTabell = value as "graf" | "tabell";
              setGrafEllerTabell(grafEllerTabell);
              sendToogleEvent(grafEllerTabell);
              sendDigitalIaTjenesteMetrikk(MetrikkKilde.SYKEFRAVÆRSSTATISTIKK, orgnr)
            }}
          >
            <ToggleGroup.Item value="graf">Graf</ToggleGroup.Item>
            <ToggleGroup.Item value="tabell">Tabell</ToggleGroup.Item>
          </ToggleGroup>
        </div>
        <div className={styles["historikk__innhold"]}>
          <GrafOgTabellInnhold
            restSykefraværsstatistikk={restSykefraværsstatistikk}
            grafEllerTabell={grafEllerTabell}
          />
        </div>
      </div>
    </div>
  );
};

type GrafOgTabellInnholdProps = {
  restSykefraværsstatistikk: RestRessurs<KvartalsvisSykefraværshistorikk[]>;
  grafEllerTabell: "graf" | "tabell";
};
const GrafOgTabellInnhold = ({
  restSykefraværsstatistikk,
  grafEllerTabell,
}: GrafOgTabellInnholdProps) => {
  switch (restSykefraværsstatistikk.status) {
    case RestStatus.LasterInn:
    case RestStatus.IkkeLastet: {
      return (
        <>
          <Skeleton width="20%" />
          <Skeleton width="40%" />
          <Skeleton width="35%" />
          <Skeleton width="55%" />
          <Skeleton width="25%" />
          <Skeleton width="60%" />
          <Skeleton variant="rectangle" width="100%" height={400} />
        </>
      );
    }

    case RestStatus.Feil:
    case RestStatus.IkkeInnlogget:
    case RestStatus.IngenTilgang: {
      return (
        <Alert variant="error" className={styles["historikk__feilside"]}>
          Det skjedde en feil da vi prøvde å hente statistikken.
        </Alert>
      );
    }

    case RestStatus.Suksess: {
      return (
        <GrafEllerTabell
          restSykefraværsstatistikk={restSykefraværsstatistikk}
          grafEllerTabell={grafEllerTabell}
        />
      );
    }
  }
};

export default Historikk;
