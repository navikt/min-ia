import React from "react";
import Plan, { IngenPlanTilgjengelig, PlanFeil, PlanSkeleton } from "../../../komponenter/Plan";
import { useDokumenterPåValgtSamarbeid } from "../../Samarbeidsvelger/SamarbeidsvelgerContext";
import { FiaSamarbeidDokument } from "../../fiaSamarbeidAPI";
import { useFiaDokument } from "../../fiaSamarbeidDokumenterAPI";
import { PlanType } from "../../../komponenter/Plan/typer";

export default function PlanFane() {
	const dokumenter = useDokumenterPåValgtSamarbeid();

	const planDokument = dokumenter.find((d) => d.type === "SAMARBEIDSPLAN");

	if (!planDokument) {
		return <IngenPlanTilgjengelig />;
	}

	return <PlanMedDokumenthenting planDokument={planDokument} />;
}

function PlanMedDokumenthenting({ planDokument }: { planDokument: FiaSamarbeidDokument }) {
	const fiaDokument = useFiaDokument({ dokumentId: planDokument.dokumentId });
	if (fiaDokument.status !== "Suksess") {
		return <PlanSkeleton />;
	}
	if (!fiaDokument.data) {
		return <PlanFeil />;
	}

	const plan = fiaDokument.data.innhold as PlanType;

	return <Plan plan={plan} />;
}