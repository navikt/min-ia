import { Bleed, Heading, HStack, Page } from "@navikt/ds-react";
import { useSamarbeidsvelgerContext } from "../Samarbeidsvelger/SamarbeidsvelgerContext";
import styles from './Samarbeidsinfo.module.scss';
import { SamarbeidsStatusBadge } from "../SamarbeidsStatusBadge";

export default function Samarbeidsinfo() {
	const { valgtSamarbeid, tilgjengeligeSamarbeid } = useSamarbeidsvelgerContext();

	const samarbeid = tilgjengeligeSamarbeid.find((s) => s.id === valgtSamarbeid);
	if (!samarbeid) {
		return <div>Ingen samarbeid valgt</div>;
	}

	return (
		<Bleed className={styles.samarbeidsinfo}>
			<Page.Block width="xl">
				<HStack justify="start" align="center" gap="4">
					<Heading level="2" size="medium">
						{samarbeid.navn}
					</Heading>
					<SamarbeidsStatusBadge status={samarbeid.status} />
				</HStack>
			</Page.Block>
		</Bleed>
	);
}


