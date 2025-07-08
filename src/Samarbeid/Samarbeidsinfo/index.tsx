import { Bleed, Heading, HStack, Page, Tag } from "@navikt/ds-react";
import { SamarbeidStatus, useSamarbeidsvelgerContext } from "../Samarbeidsvelger/SamarbeidsvelgerContext";
import styles from './Samarbeidsinfo.module.scss';

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

function SamarbeidsStatusBadge({ status }: { status: SamarbeidStatus }) {
	return (
		<Tag variant={hentVariantForIAStatus(status)} size="small">
			{penskrivIAStatus(status)}
		</Tag>
	);
}


function penskrivIAStatus(status: SamarbeidStatus) {
	switch (status) {
		case "AKTIV":
			return "Aktiv";
		case "FULLFØRT":
			return "Fullført";
		case "SLETTET":
			return "Slettet";
		case "AVBRUTT":
			return "Avbrutt";
		default:
			return status;
	}
}
function hentVariantForIAStatus(
	status: SamarbeidStatus
) {
	switch (status) {
		case "SLETTET":
		default:
			return "neutral-moderate";
		case "FULLFØRT":
			return "success-moderate";
		case "AKTIV":
			return "info-moderate";
	}
};

