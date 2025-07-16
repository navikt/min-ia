import { Page, Tabs } from "@navikt/ds-react";
import Samarbeidsvelger from "../Samarbeidsvelger";
import { SamarbeidsvelgerProvider } from "../Samarbeidsvelger/SamarbeidsvelgerContext";
import React from "react";
import KartleggingFane from "./KartleggingFane";
import Samarbeidsinfo from "../Samarbeidsinfo";
import PlanFane from "./PlanFane";
import styles from './Samarbeidsside.module.scss';

export default function Samarbeidsside() {
	const [valgtFane, setValgtFane] = React.useState("samarbeid");

	return (
		<SamarbeidsvelgerProvider>
			<Samarbeidsvelger />
			<Samarbeidsinfo />
			<Tabs value={valgtFane} onChange={setValgtFane}>
				<Tabs.List>
					<Page.Block width="xl">
						<Tabs.Tab value="samarbeid" label="Samarbeidsplan" />
						<Tabs.Tab value="kartlegging" label="Kartlegginger" />
					</Page.Block>
				</Tabs.List>
				<Page.Block width="xl" gutters className={styles.samarbeidssideBlock}>
					<Tabs.Panel value="kartlegging">
						<KartleggingFane />
					</Tabs.Panel>
					<Tabs.Panel value="samarbeid">
						<PlanFane />
					</Tabs.Panel>
				</Page.Block>
			</Tabs>
		</SamarbeidsvelgerProvider>
	);
}