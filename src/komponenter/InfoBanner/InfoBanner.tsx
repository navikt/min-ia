import { Alert, BodyLong, Heading } from "@navikt/ds-react";
import styles from "./InfoBanner.module.scss";
import React from "react";

const InfoBanner = () => {
    const [visInfoBanner, setVisInfoBanner] = React.useState(true);

    if (!visInfoBanner) return null;

    return (
        <Alert variant={"info"}
               size={"medium"}
               className={styles["infoBanner__innhold"]}
               onClose={() => setVisInfoBanner(false)}
               closeButton={true}
        >
            <Heading spacing level="2" size="small" as="h2">
                Nye næringskoder fra 1. september
            </Heading>
            <BodyLong size={"medium"} as="p">
                Vi bruker næringskoder for å definere bransje eller næring. <br/>
                Fra 1. september tar Brønnøysundregistrene i bruk nye næringskoder og dette kan påvirke hvilken
                bransje/næring dere tilhører
            </BodyLong>
        </Alert>
    );
};
export default InfoBanner;
