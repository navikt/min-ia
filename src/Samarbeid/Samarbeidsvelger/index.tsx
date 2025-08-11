import { ActionMenu, Bleed, Button, Label, Page } from "@navikt/ds-react";
import React from "react";
import styles from "./Samarbeidsvelger.module.scss";
import { useSamarbeidsvelgerContext } from "./SamarbeidsvelgerContext";
import { SamarbeidsStatusBadge } from "../SamarbeidsStatusBadge";
import { Samarbeid } from "./samarbeidtyper";
import { ChevronDownIcon } from "@navikt/aksel-icons";


export default function Samarbeidsvelger() {
	const { tilgjengeligeSamarbeid, valgtSamarbeid, setValgtSamarbeid } = useSamarbeidsvelgerContext();

	return (
		<Bleed className={styles.samarbeidsvelgerBleed}>
			<Page.Block className={styles.innhold}>
				<Samarbeidsdropdown
					tilgjengeligeSamarbeid={tilgjengeligeSamarbeid}
					valgtSamarbeid={valgtSamarbeid}
					setValgtSamarbeid={setValgtSamarbeid}
				/>
			</Page.Block>
		</Bleed>
	);
}

function Samarbeidsdropdown({
	tilgjengeligeSamarbeid,
	valgtSamarbeid,
	setValgtSamarbeid,
}: {
	tilgjengeligeSamarbeid: Samarbeid[];
	valgtSamarbeid: string;
	setValgtSamarbeid: (value: string) => void;
}) {
	const sorterteSamarbeid = React.useMemo(() => tilgjengeligeSamarbeid.sort(
		(a, b) => {
			if (a.status === b.status) {
				return a.navn.localeCompare(b.navn);
			}
			const statusOrder = {
				"AKTIV": 1,
				"FULLFØRT": 2,
				"SLETTET": 3,
				"AVBRUTT": 4,
			};
			return (statusOrder[a.status] || 5) - (statusOrder[b.status] || 5);
		}
	), [tilgjengeligeSamarbeid]);

	const valgtSamarbeidObjekt = tilgjengeligeSamarbeid.find((s) => s.id === valgtSamarbeid);

	return (
		<ActionMenu>
			<Label htmlFor="samarbeidsvelger">
				Velg samarbeid
			</Label>
			<ActionMenu.Trigger>
				<Button
					id="samarbeidsvelger"
					variant="secondary-neutral"
					icon={<ChevronDownIcon aria-hidden />}
					iconPosition="right"
					size="small"
					className={styles.menyknapp}
				>
					{valgtSamarbeidObjekt ? valgtSamarbeidObjekt.navn : "Velg samarbeid"}
				</Button>
			</ActionMenu.Trigger>
			<ActionMenu.Content className={styles.samarbeidsvelgermeny}>
				{
					sorterteSamarbeid.map((samarbeid) => (
						<ActionMenu.Item
							key={samarbeid.id}
							className={styles.menyItem}
							onSelect={() => setValgtSamarbeid(samarbeid.id)}
						>
							{samarbeid.navn} <SamarbeidsStatusBadge status={samarbeid.status} />
						</ActionMenu.Item>
					))
				}
			</ActionMenu.Content>
		</ActionMenu>
	);
}