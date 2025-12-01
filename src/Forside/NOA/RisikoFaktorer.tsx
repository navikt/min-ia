import { BodyShort, Heading, HStack, Page, VStack } from "@navikt/ds-react";
import styles from "../NOA/risikoFaktorer.module.scss";
import {
  NOAInfographicFlis
} from "../../komponenter/Infographic/InfographicFlis/NOAInfographicFlis/NOAInfographicFlis";
import {
  NOAInfographicFlisLink
} from "../../komponenter/Infographic/InfographicFlis/NOAInfographicFlis/NOAInfographicFlisLink";
import STAMILogo from "./STAMI_logo.png";
import Image from "next/image";

export const RisikoFaktorer = () => {

  return (
      <Page.Block width="xl" className={styles.risikoFaktorer}>
        <div className={styles.STAMI__logo__container}>
          <Image src={STAMILogo} alt="Logo for Inkluderende arbeidsliv" className={styles.STAMI__logo} />
        </div>
        <HStack className={styles.hstack} justify="space-between" align="start">
          <VStack>
            <Heading size={"medium"} level={"1"}>
              Risikofaktorer i barnehage og skolefritidsordning:
            </Heading>
            <BodyShort>
              I barnehager og skolefritidsordninger oppgir 1 av 2 med sykefravær at fraværet er relatert til jobben
            </BodyShort>
          </VStack>
        </HStack>
        <HStack className={styles.HStackContainer} gap="8">
          <NOAInfographicFlis label="31 %" innhold="opplever høye emosjonelle krav" />
          <NOAInfographicFlis label="60 %" innhold="utfører arbeid på huk eller knærne" />
          <NOAInfographicFlis label="74 %" innhold="har kontakt med kroppsvæsker" />
          <NOAInfographicFlisLink label="Se hele statistikken" innhold="Les mer om risikofaktorer i bransjen og hva de er knyttet til" />
        </HStack>
      </Page.Block>
  );
};