import { Page, Tabs } from "@navikt/ds-react";
import Samarbeidsvelger from "../Samarbeidsvelger";
import { SamarbeidsvelgerProvider } from "../Samarbeidsvelger/SamarbeidsvelgerContext";
import React from "react";
import KartleggingFane from "./KartleggingFane";
import Samarbeidsinfo from "../Samarbeidsinfo";
import PlanFane from "./PlanFane";

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
				<Page.Block width="xl">
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