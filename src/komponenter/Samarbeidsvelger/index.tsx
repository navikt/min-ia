import { Bleed, BodyShort, Heading, Page, Select } from "@navikt/ds-react";
import React from "react";
import styles from "./Samarbeidsvelger.module.scss";
import { useSamarbeidsvelgerContext } from "./SamarbeidsvelgerContext";


export default function Samarbeidsvelger() {
	const { tilgjengeligeSamarbeid, valgtSamarbeid, setValgtSamarbeid } = useSamarbeidsvelgerContext();

	return (
		<Bleed className={styles.samarbeidsvelgerBleed}>
			<Page.Block className={styles.innhold}>
				<div className={styles.velgerWrapper}>
					<Select className={styles.velger} label="Velg IA-samarbeid" value={valgtSamarbeid ?? ""} onChange={(e) => setValgtSamarbeid(e.target.value)}>
						{
							tilgjengeligeSamarbeid.map((samarbeid) => (
								<option
									key={samarbeid.id}
									value={samarbeid.id}
								>
									{samarbeid.navn}
								</option>
							))
						}
					</Select>
				</div>
				<div className={styles.infoWrapper}>
					<Heading size="medium" className={styles.infoTittel}>IA-samarbeid</Heading>
					<BodyShort>
						Noe mer info om hva IA-samarbeid er, hva, hvorfor, dato?
					</BodyShort>
				</div>
			</Page.Block>
		</Bleed>
	);
}