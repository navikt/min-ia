import {
  BodyShort,
  Button,
  Heading,
  HStack,
  Page,
  VStack,
} from "@navikt/ds-react";
import { ExternalLink } from "@navikt/ds-icons";
import React, { ReactNode } from "react";

import styles from "./verktøyBransje.module.scss";
import { sendNavigereEvent } from "../../../utils/analytics/analytics";

import Image, { StaticImageData } from "next/image";
import { Ressursvariant, Verktøy } from "./data";

export default function VerktøyBransje({ verktøy }: { verktøy: Verktøy[] }) {
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
      <HStack gap="4" wrap align="stretch" justify="center">
        {verktøy.map(
          ({ tittel, innhold, lenke, lenketekst, bilde, variant }) => (
            <VerktøykortBransje
              key={lenke}
              tittel={tittel}
              innhold={innhold}
              lenke={lenke}
              lenketekst={lenketekst}
              bilde={bilde}
              kortClassName={hentStil(variant)}
            />
          ),
        )}
      </HStack>
    </Page.Block>
  );
}

const hentStil = (variant: Ressursvariant) => {
  switch (variant) {
    case "arbeidsmiljøhjelpen":
      return styles.arbeidsmiljøhjelpenKort;
    case "enBraDagPåJobb":
      return styles.enBraDagKort;
    case "idebanken":
      return styles.idebankenKort;
  }
};

function VerktøykortBransje({
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
      gap="2"
      align="center"
      justify="space-between"
    >
      <VStack gap="1" align="center" justify="start">
        <Heading size="small" level="3">
          {tittel}
        </Heading>
        <BodyShort size="small" className={styles.verdi}>
          {innhold}
        </BodyShort>
      </VStack>
      <VStack gap="4" align="center" justify="start">
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
