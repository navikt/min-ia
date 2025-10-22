import { Alert } from "@navikt/ds-react";
import React from "react";
import SpørreundersøkelseRad from "../../../komponenter/Spørreundersøkelsesresultat/SpørreundersøkelseRad";
import { nbNoPrintDato } from "../../../utils/dato";
import { FiaSamarbeidDokument } from "../../fiaSamarbeidAPI";


export default function Kartlegginger({ dokumenter }: { dokumenter: FiaSamarbeidDokument[] }) {
	if (!dokumenter.some(d => d.type === "BEHOVSVURDERING" || d.type === "EVALUERING")) {
		return <IngenKartleggingerTilgjengelig />;
	}
	return dokumenter
		.filter((dokument) => dokument.type === "BEHOVSVURDERING" || dokument.type === "EVALUERING")
		.sort(({ dato: opprettetA }, { dato: opprettetB }) => new Date(opprettetB).valueOf() - new Date(opprettetA).valueOf())
		.map((dokument) => (
			<SpørreundersøkelseRad
				key={dokument.dokumentId}
				dato={nbNoPrintDato(new Date(dokument.dato))}
				dokument={dokument}
			/>
		));
}

function IngenKartleggingerTilgjengelig() {
	return (
		<Alert inline variant="info" data-testid="ingen-plan-tilgjengelig">
			Ingen kartlegginger er publisert enda
		</Alert>
	);
}
