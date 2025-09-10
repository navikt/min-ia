import { Page, Tabs } from "@navikt/ds-react";
import Samarbeidsvelger from "../Samarbeidsvelger";
import { SamarbeidsvelgerProvider } from "../Samarbeidsvelger/SamarbeidsvelgerContext";
import React from "react";
import KartleggingFane from "./KartleggingFane";
import Samarbeidsinfo from "../Samarbeidsinfo";
import styles from './Samarbeidsside.module.scss';

export default function Samarbeidsside({ samarbeidOffentligId, setSamarbeidOffentligId }: {
	samarbeidOffentligId?: string,
	setSamarbeidOffentligId: (id: string) => void
}) {
	const [valgtFane, setValgtFane] = React.useState("kartlegging");

	return (
		<SamarbeidsvelgerProvider samarbeidOffentligId={samarbeidOffentligId}
			setSamarbeidOffentligId={setSamarbeidOffentligId}>
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
		</SamarbeidsvelgerProvider>
	);
}

function UnfocusableTab({ ...props }: React.ComponentProps<typeof Tabs.Tab>) {
	// Tabindex -1 funker ikke på Tabs.Tab, så vi må lage en wrapper-komponent.
	// Vi skjuler for skjermlesere da det bare er en fane, og vi har ingen andre faner å bytte til enda.
	return <span {...props} tabIndex={-1} role={undefined} />;
};