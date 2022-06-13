import { FunctionComponent, useEffect, useState } from "react";
import styles from "./Infographic.module.scss";
import { InfographicFlis } from "../InfographicFlis/InfographicFlis";
import {Bag, HealthCase, Information, NorwegianFlag, Up} from "@navikt/ds-icons";
import { BodyLong, Button, Heading, HelpText, Modal } from "@navikt/ds-react";
import { useOrgnr } from "../hooks/useOrgnr";
import { getMiljø } from "../utils/miljøUtils";
import {
  Applikasjon,
  getUrlForApplikasjon,
  utledUrlForBedrift,
} from "../utils/navigasjon";
import { useWindowSize } from "../hooks/useWindowSize";
import { Lenkeflis } from "../Lenkeflis/Lenkeflis";
import { StatistikkIkonIkon } from "../Forside/ikoner/StatistikkIkonIkon";
import { LenkeMedEventutsendelse } from "../LenkeMedNavigereEvent/LenkeMedEventutsendelse";

export type MuligSykefravær = number | null | undefined;
export type MuligTall = number | undefined;

export interface InfographicData {
  sykefraværNorge: MuligSykefravær;
  sykefraværBransje: MuligSykefravær;
  sykefraværNæring: MuligSykefravær;
  trendStigningstall: MuligTall;
  nedlastingPågår?: boolean;
  bransjeEllerNæringLabel?: string;
}

export const Infographic: FunctionComponent<InfographicData> = ({
  sykefraværNorge,
  sykefraværBransje,
  sykefraværNæring,
  trendStigningstall,
  nedlastingPågår,
    bransjeEllerNæringLabel
}) => {
  const ikonstorrelse = { width: "50px", height: "50px" };
  const orgnr = useOrgnr();
  const miljø = getMiljø();
  const windowSize = useWindowSize();

  const [sykefravarsstatistikkUrl, setSykefravarsstatistikkUrl] = useState("#");
  const screenSmAsNumeric = parseInt(styles.screenSm.replace(/\D/g, ""));
  const [open, setOpen] = useState(false);

  const DesktopEllerMobilVersjon = () => {
    if (
      windowSize.width === undefined ||
      windowSize.width < screenSmAsNumeric
    ) {
      return (
        <Lenkeflis
          overskrift={"Sykefraværs&shy;statistikk"}
          ikon={<StatistikkIkonIkon />}
          brødtekst={""}
          href={sykefravarsstatistikkUrl}
          fyltoppBakgrunn={true}
        />
      );
    }
    return (
      <BodyLong className={styles.oversiktTekst} size="medium">
        Trenger du en større oversikt?{" "}
        <LenkeMedEventutsendelse
          href={sykefravarsstatistikkUrl}
          lenketekst="Klikk her for å gå til statistikksiden."
        />
      </BodyLong>
    );
  };
  useEffect(() => {
    if (Modal !== undefined)  { // @ts-ignore
      Modal?.setAppElement("#__next");
    }
  }, []);

  useEffect(() => {
    setSykefravarsstatistikkUrl(
      utledUrlForBedrift(
        getUrlForApplikasjon(Applikasjon.Sykefraværsstatistikk, miljø),
        orgnr
      )
    );
  }, [orgnr, miljø]);

  const bransjeEllerNæring = sykefraværBransje ? "bransje" : "næring";

  return (
    <div className={styles.infographicWrapper}>
      <InfographicFlis
        ikon={<NorwegianFlag {...ikonstorrelse} />}
        tekst={"Sykefraværsprosenten i Norge det siste kvartalet er: "}
        verdi={sykefraværNorge + "%"}
        nedlastingPågår={nedlastingPågår}
      />

      <InfographicFlis
        ikon={<Bag {...ikonstorrelse} />}
        tekst={`Sykefraværsprosenten i din ${bransjeEllerNæring} det siste kvartalet er: `}
        verdi={(sykefraværBransje ?? sykefraværNæring) + "%"}
        nedlastingPågår={nedlastingPågår}
      />

      <InfographicFlis
        ikon={<HealthCase {...ikonstorrelse} />}
        tekst={"Vanligste årsak til sykemelding i Norge er: "}
        verdi={"Muskel- og skjelettplager"}
        nedlastingPågår={nedlastingPågår}
      />

      <InfographicFlis
        ikon={
          <Up
            className={roterTrendpil(stigningstallTilTekst(trendStigningstall))}
            {...ikonstorrelse}
          />
        }
        tekst={`Sykefraværet i din ${bransjeEllerNæring} de to siste kvartalene er `}
        verdi={stigningstallTilTekst(trendStigningstall)}
        nedlastingPågår={nedlastingPågår}
      />

      <DesktopEllerMobilVersjon />
      {windowSize.width !== undefined && windowSize.width > screenSmAsNumeric && (
        <div className={styles.hjelpetekstWrapper}>
          <Button
            id={"modalButton"}
            variant={"tertiary"}
            onClick={() => {
              setOpen((open) => !open);
            }}
          >
            <Information/>
          </Button>
          <Modal
            aria-label="Modal for mer informasjon"
            onClose={() => {
              setOpen(false);
            }}
            open={open}
            shouldCloseOnOverlayClick={true}
          >
            <Modal.Content>
              <Heading level="1" size="large" spacing={true}>
                Informasjon
              </Heading>
              {bransjeEllerNæringLabel&&<Heading level="2" size="medium" spacing={true}>
                Din {bransjeEllerNæring}: {bransjeEllerNæringLabel}
              </Heading>}
              <BodyLong spacing={true}>
                Utregningene på dette panelet blir gjort fortløpende, basert på
                <br />
                et større statistisk grunnlag, hentet fra SSB.
              </BodyLong>
            </Modal.Content>
          </Modal>
        </div>
      )}
    </div>
  );
};

function roterTrendpil(a: string) {
  switch (a) {
    case "stigende":
      return styles.rotateOpp;
    case "synkende":
      return styles.rotateNed;
    default:
      return styles.rotateUendret;
  }
}

function stigningstallTilTekst(stigning: MuligTall): string {
  if (stigning === undefined) {
    return "-";
  } else if (stigning > 0) {
    return "stigende";
  } else if (stigning < 0) {
    return "synkende";
  } else {
    return "uendret";
  }
}
