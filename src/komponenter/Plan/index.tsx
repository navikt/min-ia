import React from "react";
import { PlanType } from "./typer";
import styles from "./plan.module.scss";
import { BodyShort, Heading, HStack } from "@navikt/ds-react";
import PlanGraf from "./PlanGraf";
import Innholdsblokk from "./Innholdsblokk";

export default function Plan({ plan }: { plan: PlanType }) {
	const filtrerteTemaer = plan.temaer.filter((tema) => tema.inkludert)
		.sort((a, b) => {
			return a.id - b.id;
		});
	const sisteEndring = useSisteEndring(plan);

	return (
		<>
			{
				filtrerteTemaer.map((tema) => (
					<div className={styles.planContainer} key={tema.id}>
						<HStack justify="space-between" align="center">
							<Heading level="3" size="medium" spacing>{tema.navn}</Heading>
							<BodyShort>Oppdatert {sisteEndring}</BodyShort>
						</HStack>
						<PlanGraf undertemaer={tema.undertemaer} />
						<Innholdsblokk tema={tema} />
					</div>
				))
			}
		</>
	);
}

function useSisteEndring(plan: PlanType) {
	return React.useMemo(() => {
		const sisteEndring = new Date(plan.sistEndret);
		const sistePublisert = new Date(plan.sistPublisert);

		return (sisteEndring > sistePublisert ? sisteEndring : sistePublisert).toLocaleDateString("nb-NO", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	}, [plan.sistEndret, plan.sistPublisert]);
}