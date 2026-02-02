import { Bleed, BodyShort, Button, Heading, Page } from "@navikt/ds-react";
import styles from "./tjenesterFraNav.module.scss";
import { ExternalLink } from "@navikt/ds-icons";
import {
  KURS_URL,
  FÅ_HJELP_URL,
  EKSPERTBISTAND_URL,
} from "../../utils/konstanter";
import { sendNavigereEvent } from "../../utils/analytics/analytics";

export default function TjenesterFraNav() {
  return (
    <Bleed className={styles.tjenesterFraNav_Bleed}>
      <Page.Block width="xl" className={styles.tjenesterFraNav}>
        <Heading
          size="large"
          level="2"
          className={styles.tjenesterFraNavTittel}
        >
          Tjenester fra Nav
        </Heading>
        <div className={styles.tjenesteStack}>
          <Tjeneste
            tittel="Få tilskudd til ekspertbistand"
            tekst="Få hjelp fra en nøytral ekspert med kompetanse på sykefravær og arbeidsmiljø."
            lenke={EKSPERTBISTAND_URL}
          />
          <Tjeneste
            tittel="Få hjelp til å redusere sykefraværet"
            tekst="Nav arbeidslivssenter gir oppfølging til virksomheter som sliter med høyt sykefravær."
            lenke={FÅ_HJELP_URL}
          />
          <Tjeneste
            tittel="Bli med på kurs"
            tekst="Nav tilbyr en rekke kurs innen sykefravær og arbeidsmiljø. Se hvilke kurs som holdes i ditt fylke."
            lenke={KURS_URL}
          />
        </div>
      </Page.Block>
    </Bleed>
  );
}

function Tjeneste({
  tittel,
  tekst,
  lenke,
}: {
  tittel: string;
  tekst: string;
  lenke: string;
}) {
  return (
    <div className={styles.tjeneste}>
      <Heading size="small" level="3">
        {tittel}
      </Heading>
      <BodyShort>{tekst}</BodyShort>
      <Button
        as="a"
        role="link"
        href={lenke}
        className={styles.tjenestelenke}
        variant="secondary"
        size="small"
        icon={<ExternalLink fontSize="1rem" aria-hidden />}
        iconPosition="right"
        onClick={() => sendNavigereEvent(tittel, lenke)}
      >
        Les mer
      </Button>
    </div>
  );
}
