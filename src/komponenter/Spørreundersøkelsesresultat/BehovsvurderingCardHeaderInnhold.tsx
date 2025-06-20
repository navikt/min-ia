import { ExpansionCard } from "@navikt/ds-react";
import React from "react";
import styles from "./BehovsvurderingCardHeader.module.scss";
import { Spørreundersøkelse } from "./SpørreundersøkelseRad";

const StyledExpansionCardHeader = ExpansionCard.Header;
export interface CardHeaderProps {
    spørreundersøkelse: Spørreundersøkelse;
    dato?: string;
}
/* function ActionButtonsHvisSamarbeidIkkeFullført({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.actionButtonContainer}>
            {children}
        </div>
    )
} */

export const BehovsvurderingCardHeaderInnhold = ({
    spørreundersøkelse,
    dato,
}: CardHeaderProps) => {
    /* const [
        bekreftFullførBehovsvurderingModalÅpen,
        setBekreftFullførBehovsvurderingModalÅpen,
    ] = useState(false);
    const [forhåndsvisModalÅpen, setForhåndsvisModalÅpen] = useState(false);
    const [
        slettSpørreundersøkelseModalÅpen,
        setSlettSpørreundersøkelseModalÅpen,
    ] = useState(false);
    const [
        bekreftStartBehovsvurderingModalÅpen,
        setBekreftStartBehovsvurderingModalÅpen,
    ] = useState(false);

    const [erIEksportMode, setErIEksportMode] = useState(false);

    const MINIMUM_ANTALL_DELTAKERE = 3;
    const deltakereSomHarFullført = 1;
    const harNokDeltakere = deltakereSomHarFullført >= MINIMUM_ANTALL_DELTAKERE; */
    const spørreundersøkelseStatus = spørreundersøkelse.status;

    /* const { iaSak, brukerRolle, samarbeid, brukerErEierAvSak } =
        useSpørreundersøkelse(); */

    /* if (iaSak !== undefined) { */
    if (spørreundersøkelseStatus === "SLETTET") {
        return null;
    }

    if (spørreundersøkelseStatus === "AVSLUTTET") {
        return (
            <StyledExpansionCardHeader>
                <ExpansionCard.Title>Behovsvurdering</ExpansionCard.Title>
                <span className={styles.headerRightContent}>
                    {/* <div className={styles.behovsvurderingStatusWrapper}>
                            <SpørreundersøkelseStatusBadge
                                status={spørreundersøkelse.status}
                            />
                        </div> */}
                    <span className={styles.behovsvurderingDato}>{dato}</span>
                </span>
            </StyledExpansionCardHeader>
        );
    }

    if (spørreundersøkelseStatus === "OPPRETTET") {
        return (
            <div className={styles.styledEmptyCardHeader}>
                {/* <ActionButtonsHvisSamarbeidIkkeFullført>
                        {(iaSak.status === "KARTLEGGES" ||
                            iaSak.status === "VI_BISTÅR") &&
                            brukerRolle !== "Lesetilgang" && (
                                <>
                                    <Button
                                        onClick={() =>
                                            setBekreftStartBehovsvurderingModalÅpen(
                                                true,
                                            )
                                        }
                                    >
                                        Start
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            setForhåndsvisModalÅpen(true)
                                        }
                                    >
                                        Forhåndsvis
                                    </Button>
                                    {brukerErEierAvSak && (
                                        <Button
                                            variant="secondary-neutral"
                                            onClick={() =>
                                                setSlettSpørreundersøkelseModalÅpen(
                                                    true,
                                                )
                                            }
                                            icon={<TrashIcon aria-hidden />}
                                            aria-label="Slett behovsvurdering"
                                        />
                                    )}
                                </>
                            )}
                        <StartSpørreundersøkelseModal
                            spørreundersøkelse={spørreundersøkelse}
                            erModalÅpen={bekreftStartBehovsvurderingModalÅpen}
                            lukkModal={() =>
                                setBekreftStartBehovsvurderingModalÅpen(false)
                            }
                            startSpørreundersøkelsen={startSpørreundersøkelsen}
                        />
                        <SpørreundersøkelseMedInnholdVisning
                            spørreundersøkelse={spørreundersøkelse}
                            erModalÅpen={forhåndsvisModalÅpen}
                            spørreundersøkelseid={spørreundersøkelse.id}
                            lukkModal={() => setForhåndsvisModalÅpen(false)} />
                        {brukerRolle && (
                            <SlettSpørreundersøkelseModal
                                spørreundersøkelse={spørreundersøkelse}
                                erModalÅpen={slettSpørreundersøkelseModalÅpen}
                                lukkModal={() =>
                                    setSlettSpørreundersøkelseModalÅpen(false)
                                }
                                slettSpørreundersøkelsen={
                                    slettSpørreundersøkelsen
                                }
                            />
                        )}
                    </ActionButtonsHvisSamarbeidIkkeFullført> */}
                <span className={styles.headerRightContent}>
                    {/* <div className={styles.behovsvurderingStatusWrapper}>
                            <SpørreundersøkelseStatusBadge
                                status={spørreundersøkelse.status}
                            />
                        </div> */}
                    <span className={styles.behovsvurderingDato}>{dato}</span>
                </span>
            </div>
        );
    }

    if (spørreundersøkelseStatus === "PÅBEGYNT") {
        return (
            <div className={styles.styledEmptyCardHeader}>
                {/* <ActionButtonsHvisSamarbeidIkkeFullført>
                        {(iaSak.status === "KARTLEGGES" ||
                            iaSak.status === "VI_BISTÅR") &&
                            brukerRolle !== "Lesetilgang" && (
                                <>
                                    <Button
                                        variant="primary"
                                        onClick={() =>
                                            åpneSpørreundersøkelseINyFane(
                                                spørreundersøkelse.id,
                                                "PÅBEGYNT",
                                            )
                                        }
                                    >
                                        Fortsett
                                    </Button>
                                    {brukerErEierAvSak && (
                                        <>
                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    setBekreftFullførBehovsvurderingModalÅpen(
                                                        true,
                                                    )
                                                }
                                            >
                                                Fullfør
                                            </Button>
                                            <Button
                                                variant="secondary-neutral"
                                                onClick={() =>
                                                    setSlettSpørreundersøkelseModalÅpen(
                                                        true,
                                                    )
                                                }
                                                icon={<TrashIcon aria-hidden />}
                                                aria-label="Slett behovsvurdering"
                                            />
                                        </>
                                    )}
                                    <FullførSpørreundersøkelseModal
                                        harNokDeltakere={harNokDeltakere}
                                        erModalÅpen={
                                            bekreftFullførBehovsvurderingModalÅpen
                                        }
                                        lukkModal={() =>
                                            setBekreftFullførBehovsvurderingModalÅpen(
                                                false,
                                            )
                                        }
                                        fullførSpørreundersøkelse={
                                            fullførSpørreundersøkelse
                                        }
                                    />
                                </>
                            )}
                        {brukerRolle && (
                            <SlettSpørreundersøkelseModal
                                spørreundersøkelse={spørreundersøkelse}
                                erModalÅpen={slettSpørreundersøkelseModalÅpen}
                                lukkModal={() =>
                                    setSlettSpørreundersøkelseModalÅpen(false)
                                }
                                slettSpørreundersøkelsen={
                                    slettSpørreundersøkelsen
                                }
                            />
                        )}
                    </ActionButtonsHvisSamarbeidIkkeFullført> */}
                <span className={styles.headerRightContent}>
                    {/* <div className={styles.behovsvurderingStatusWrapper}>
                            <SpørreundersøkelseStatusBadge
                                status={spørreundersøkelse.status}
                            />
                        </div> */}
                    <span className={styles.behovsvurderingDato}>{dato}</span>
                </span>
            </div>
        );
    }
    /* } */
};
