import {
  BodyShort,
  Button,
  Heading,
  Page,
  HStack,
  VStack,
} from "@navikt/ds-react";
import { ExternalLink } from "@navikt/ds-icons";
import React, { ReactNode } from "react";

import styles from "./verktøyBarnehager.module.scss";
import { IDEBANKEN_URL } from "../../../utils/konstanter";
import { sendNavigereEvent } from "../../../utils/analytics/analytics";

import Arbeidsmiljøhjelpen from "./Arbeidsmiljohjelpen.png";
import En_Bra_Dag_På_Jobb from "./En_bra_dag_paa_jobb.png";
import Idebanken_Barnehage from "./Idebanken_Barnehage.png";
import Image, { StaticImageData } from "next/image";

const ARBEIDSMILJØHJELPEN_BARNEHAGE_URL =
  "https://arbeidsmiljohjelpen.arbeidstilsynet.no/bransje/barnehage/";
const EN_BRA_DAG_PÅ_JOBB_BARNEHAGE_URL =
  "https://enbradagpajobb.no/bransje/barnehage-2/";
const IDEBANKEN_BARNEHAGE_URL =
  IDEBANKEN_URL + "/ia/ia-hjelp/ia-bransjeprogram/barnehage";

export default function VerktøyBarnehager() {
  return (
    <Page.Block width="xl" className={styles.verktøyOgRessurser}>
      <Heading
        size="large"
        level="2"
        align="center"
        className={styles.verktøyOgRessurserTittel}
      >
        Gode verktøy for å forebygge og redusere sykefravær
      </Heading>
      <HStack gap="space-16" wrap align="stretch" justify="center">
        <VerktøykortBarnehager
          tittel="Arbeidsmiljøhjelpen"
          innhold="Diskuter typiske utfordringer i bransjen og lag en handlingsplan for å utvikle arbeidsmiljøet"
          lenke={ARBEIDSMILJØHJELPEN_BARNEHAGE_URL}
          lenketekst="Arbeidsmiljøhjelpen"
          bilde={Arbeidsmiljøhjelpen}
          kortClassName={styles.arbeidsmiljøhjelpenKort}
        />
        <VerktøykortBarnehager
          tittel="En bra dag på jobb"
          innhold="Gjennom korte filmer og enkle diskusjonsopplegg får dere et felles grunnlag for å kartlegge utfordringer, prioritere tiltak og lage en handlingsplan"
          lenke={EN_BRA_DAG_PÅ_JOBB_BARNEHAGE_URL}
          lenketekst="En bra dag på jobb"
          bilde={En_Bra_Dag_På_Jobb}
          kortClassName={styles.enBraDagKort}
        />
        <VerktøykortBarnehager
          tittel="IA-bransjeprogram"
          innhold="Finn bransjetilpassede verktøy og tiltak for å få ned sykefraværet og hindre frafall på din arbeidsplass"
          lenke={IDEBANKEN_BARNEHAGE_URL}
          lenketekst="Idébanken"
          bilde={Idebanken_Barnehage}
          kortClassName={styles.idebankenKort}
        />
      </HStack>
    </Page.Block>
  );
}

function VerktøykortBarnehager({
  tittel,
  innhold,
  lenke,
  lenketekst,
  bilde,
  kortClassName,
}: {
  tittel: ReactNode;
  innhold: ReactNode;
  lenke: string;
  lenketekst: string;
  bilde: StaticImageData;
  kortClassName: string;
}) {
  return (
    <VStack
      className={`${styles.verktøykort} ${kortClassName}`}
      gap="space-8"
      align="center"
      justify="space-between"
    >
      <VStack gap="space-4" align="center" justify="start">
        <Heading size="small" level="3">
          {tittel}
        </Heading>
        <BodyShort size="small" className={styles.verdi}>
          {innhold}
        </BodyShort>
      </VStack>
      <VStack gap="space-16" align="center" justify="start">
        <Button
          as="a"
          href={lenke}
          role="link"
          target="_blank"
          className={styles.lenke}
          variant="primary"
          size="small"
          icon={<ExternalLink fontSize="1rem" aria-hidden />}
          iconPosition="right"
          onClick={() => sendNavigereEvent(lenketekst, lenke)}
        >
          {lenketekst}
        </Button>
        <Image src={bilde} alt="" className={styles.bilde} aria-hidden />
      </VStack>
    </VStack>
  );
}
