import { Page, Tabs } from "@navikt/ds-react";
import Samarbeidsvelger from "../Samarbeidsvelger";
import { SamarbeidsvelgerProvider } from "../Samarbeidsvelger/SamarbeidsvelgerContext";
import React from "react";
import KartleggingFane from "./KartleggingFane";
import Samarbeidsinfo from "../Samarbeidsinfo";
import styles from './Samarbeidsside.module.scss';

export default function Samarbeidsside({ samarbeidId, setSamarbeidId }: { samarbeidId?: string, setSamarbeidId: (id: string) => void }) {
	const [valgtFane, setValgtFane] = React.useState("kartlegging");

	return (
		<SamarbeidsvelgerProvider samarbeidId={samarbeidId} setSamarbeidId={setSamarbeidId}>
			<Samarbeidsvelger />
			<Samarbeidsinfo />
			<Tabs value={valgtFane} onChange={setValgtFane}>
				<Tabs.List>
					<Page.Block width="xl">
						<Tabs.Tab value="kartlegging" label="Kartlegginger" />
					</Page.Block>
				</Tabs.List>
				<Page.Block width="xl" gutters className={styles.samarbeidssideBlock}>
					<Tabs.Panel value="kartlegging">
						<KartleggingFane />
					</Tabs.Panel>
				</Page.Block>
			</Tabs>
		</SamarbeidsvelgerProvider>
	);
}