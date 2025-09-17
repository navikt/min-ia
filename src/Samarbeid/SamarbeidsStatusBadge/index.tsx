import { Tag } from "@navikt/ds-react";
import { SamarbeidStatus } from "../Samarbeidsvelger/samarbeidtyper";

import styles from "./Samarbeidsstatusbadge.module.scss";

export function SamarbeidsStatusBadge({ status }: { status: SamarbeidStatus; }) {
	return (
		<Tag className={styles.samarbeidsstatusbadge} variant={hentVariantForIAStatus(status)} size="small">
			{penskrivIAStatus(status)}
		</Tag>
	);
}

export function penskrivIAStatus(status: SamarbeidStatus) {
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
}
;
