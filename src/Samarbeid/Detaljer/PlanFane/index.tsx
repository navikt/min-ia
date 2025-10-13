import React from "react";
import Plan from "../../../komponenter/Plan";
import { useDokumenterPåValgtSamarbeid } from "../../Samarbeidsvelger/SamarbeidsvelgerContext";
import { FiaSamarbeidDokument } from "../../fiaSamarbeidAPI";
import { useFiaDokument } from "../../fiaSamarbeidDokumenterAPI";
import { PlanType } from "../../../komponenter/Plan/typer";

export default function PlanFane() {
	const dokumenter = useDokumenterPåValgtSamarbeid();

	const planDokument = dokumenter.find((d) => d.type === "SAMARBEIDSPLAN");

	if (!planDokument) {
		// TODO: Legg til "ingen plan" komponent
		return <div>Ingen plan tilgjengelig</div>;
	}

	return <PlanMedDokumenthenting planDokument={planDokument} />;
}

function PlanMedDokumenthenting({ planDokument }: { planDokument: FiaSamarbeidDokument }) {
	const fiaDokument = useFiaDokument({ dokumentId: planDokument.dokumentId });
	if (fiaDokument.status !== "Suksess") {
		return <div>Laster plan...</div>;
	}
	if (!fiaDokument.data) {
		return <div>Kunne ikke hente plan</div>;
	}

	const plan = fiaDokument.data.innhold as PlanType;

	console.log('plan', plan);

	return <Plan plan={plan} />;
}
