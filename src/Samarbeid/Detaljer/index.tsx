import { Alert, Bleed, Page, Skeleton, Tabs, HStack } from "@navikt/ds-react";
import Samarbeidsvelger from "../Samarbeidsvelger";
import { SamarbeidsvelgerProvider, useSamarbeidsvelgerContext } from "../Samarbeidsvelger/SamarbeidsvelgerContext";
import React from "react";
import KartleggingFane from "./KartleggingFane";
import Samarbeidsinfo from "../Samarbeidsinfo";
import { RestStatus } from "../../integrasjoner/rest-status";
import styles from './Samarbeidsside.module.scss';
import samarbeidsvelgerStyles from '../Samarbeidsvelger/Samarbeidsvelger.module.scss';

export default function Samarbeidsside({ samarbeidOffentligId, setSamarbeidOffentligId }: {
	samarbeidOffentligId?: string,
	setSamarbeidOffentligId: (id: string) => void
}) {

	return (
		<SamarbeidsvelgerProvider samarbeidOffentligId={samarbeidOffentligId}
			setSamarbeidOffentligId={setSamarbeidOffentligId}>
			<Samarbeidssideinnhold />
		</SamarbeidsvelgerProvider>
	);
}

function Samarbeidssideinnhold() {
	const [valgtFane, setValgtFane] = React.useState("kartlegging");
	const { status, tilgjengeligeSamarbeid } = useSamarbeidsvelgerContext();

	if (status === RestStatus.IkkeLastet || status === RestStatus.LasterInn) {
		return (
			<>
				<Bleed className={samarbeidsvelgerStyles.samarbeidsvelgerBleed} style={{ marginBottom: '1rem' }} data-testid="samarbeidsvelger-skeleton">
					<Page.Block className={samarbeidsvelgerStyles.innhold}>
						<Skeleton variant="rectangle" width="7.5rem" height="1.5rem" style={{ marginBottom: '0.5rem' }} />
						<Skeleton variant="rectangle" width="20rem" height="2.75rem" />
					</Page.Block>
				</Bleed>
				<Page.Block width="xl" className={styles.samarbeidssideBlock} style={{ marginBottom: '5rem' }}>
					<HStack gap="2" style={{ marginBottom: '2rem' }} align="center" justify="start">
						<Skeleton variant="rectangle" width="30rem" height="2rem" />
						<Skeleton variant="rectangle" width="3rem" height="1.5rem" />
					</HStack>
				</Page.Block>
			</>
		);
	}

	if (status === RestStatus.Feil) {
		return (
			<Page.Block>
				<Alert variant="error">Noe gikk galt ved lasting av samarbeid</Alert>
			</Page.Block>
		);
	}

	if (tilgjengeligeSamarbeid.length === 0) {
		return (
			<Bleed className={styles.ingenSamarbeidBleed}>
				<Alert inline className={styles.innhold} variant="warning">Denne virksomheten har ingen aktive samarbeid</Alert>
			</Bleed>
		);
	}

	return (
		<>
			<Samarbeidsvelger />
			<Samarbeidsinfo />
			<Tabs value={valgtFane} onChange={setValgtFane}>
				<Tabs.List aria-hidden /* gjem fra skjermlesere, ettersom vi ikke faktisk har noe tabber her. */>
					<Page.Block width="xl">
						<Tabs.Tab value="kartlegging" label="Kartlegginger" as={UnfocusableTab} />
					</Page.Block>
				</Tabs.List>
				<Page.Block width="xl" gutters className={styles.samarbeidssideBlock}>
					{/* <Tabs.Panel value="kartlegging"> */}
					<KartleggingFane />
					{/* </Tabs.Panel> */}
				</Page.Block>
			</Tabs>
		</>
	);
}

function UnfocusableTab({ ...props }: React.ComponentProps<typeof Tabs.Tab>) {
	// Tabindex -1 funker ikke på Tabs.Tab, så vi må lage en wrapper-komponent.
	// Vi skjuler for skjermlesere da det bare er en fane, og vi har ingen andre faner å bytte til enda.
	return <span {...props} tabIndex={-1} role={undefined} />;
};