import { BodyShort, Heading, HStack, Page, VStack } from "@navikt/ds-react";
import styles from "../NOA/risikoFaktorer.module.scss";
import { NOAInfographicFlis } from "../../komponenter/Infographic/InfographicFlis/NOAInfographicFlis/NOAInfographicFlis";
import { NOAInfographicFlisLink } from "../../komponenter/Infographic/InfographicFlis/NOAInfographicFlis/NOAInfographicFlisLink";
import STAMILogo from "./STAMI_logo.png";
import Image from "next/image";
import { NoaInfo } from "./data";

export const RisikoFaktorer = ({ noaInfo }: { noaInfo: NoaInfo }) => {
  return (
    <Page.Block width="xl" className={styles.risikoFaktorer}>
      <div className={styles.STAMI__logo__container}>
        <Image
          src={STAMILogo}
          alt="Logo for STAMI"
          className={styles.STAMI__logo}
        />
      </div>
      <HStack className={styles.hstack} justify="space-between" align="start">
        <VStack>
          <Heading size={"medium"} level={"2"}>
            {noaInfo.tittel}
          </Heading>
          <BodyShort>{noaInfo.ingress}</BodyShort>
        </VStack>
      </HStack>
      <HStack className={styles.HStackContainer} gap="8">
        {noaInfo.risikofaktorer.map(({ risiko, andel }) => (
          <NOAInfographicFlis
            key={risiko}
            label={`${andel} %`}
            innhold={risiko}
          />
        ))}
        <NOAInfographicFlisLink
          label="Se hele statistikken"
          innhold="Les mer om risikofaktorer i bransjen og hva de er knyttet til"
          lenke={noaInfo.lenke}
        />
      </HStack>
    </Page.Block>
  );
};
