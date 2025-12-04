import { Alert, Bleed, Page, Skeleton, Tabs, HStack } from "@navikt/ds-react";
import Samarbeidsvelger from "../Samarbeidsvelger";
import { SamarbeidsvelgerProvider, useDokumenterPåValgtSamarbeid, useSamarbeidsvelgerContext } from "../Samarbeidsvelger/SamarbeidsvelgerContext";
import React from "react";
import KartleggingFane from "./KartleggingFane";
import Samarbeidsinfo from "../Samarbeidsinfo";
import { RestStatus } from "../../integrasjoner/rest-status";
import styles from './Samarbeidsside.module.scss';
import samarbeidsvelgerStyles from '../Samarbeidsvelger/Samarbeidsvelger.module.scss';
import PlanFane from "./PlanFane";
import { sendDefaultTabValgt, sendFaneByttetEvent } from "../../utils/analytics/analytics";
import { UXSignalsWidget } from "../../Forside/UXSignalsWidget";

export default function Samarbeidsside({ samarbeidOffentligId, setSamarbeidOffentligId, kjørerMockApp }: {
	samarbeidOffentligId?: string,
	setSamarbeidOffentligId: (id: string) => void
	kjørerMockApp: boolean;
}) {

	return (
		<>
			<SamarbeidsvelgerProvider samarbeidOffentligId={samarbeidOffentligId}
				setSamarbeidOffentligId={setSamarbeidOffentligId}>
				<Samarbeidssideinnhold key={samarbeidOffentligId} kjørerMockApp={kjørerMockApp} />
			</SamarbeidsvelgerProvider>
		</>
	);
}

function Samarbeidssideinnhold({ kjørerMockApp }: { kjørerMockApp: boolean }) {
	const [valgtFane, setValgtFane] = React.useState<string | null>(null);
	const dokumenter = useDokumenterPåValgtSamarbeid();
	const harPlan = dokumenter.some(d => d.type === "SAMARBEIDSPLAN");
	const { status, tilgjengeligeSamarbeid } = useSamarbeidsvelgerContext();

	React.useEffect(() => {
		if (valgtFane === null && status === RestStatus.Suksess) {
			sendDefaultTabValgt(harPlan ? "samarbeidsplan" : "kartlegging");
			setValgtFane(harPlan ? "samarbeidsplan" : "kartlegging");
		}
	}, [harPlan, valgtFane, status]);

	function setValgtFaneOgLogg(fane: string) {
		sendFaneByttetEvent(valgtFane, fane);
		setValgtFane(fane);
	}

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
			<UXSignalsWidget eriDev={kjørerMockApp} id={"panel-xnxt8og5p1"} />
			<Samarbeidsinfo />
			<Tabs value={valgtFane || "kartlegging"} onChange={setValgtFaneOgLogg}>
				<Tabs.List>
					<Page.Block width="xl">
						<Tabs.Tab value="samarbeidsplan" label="Samarbeidsplan" />
						<Tabs.Tab value="kartlegging" label="Kartlegginger" />
					</Page.Block>
				</Tabs.List>
				<Page.Block width="xl" gutters className={styles.samarbeidssideBlock}>
					<Tabs.Panel value="kartlegging">
						<KartleggingFane />
					</Tabs.Panel>
					<Tabs.Panel value="samarbeidsplan">
						<PlanFane />
					</Tabs.Panel>
				</Page.Block>
			</Tabs>
		</>
	);
}