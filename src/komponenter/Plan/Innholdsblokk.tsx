import React from 'react';
import { Accordion, BodyLong } from "@navikt/ds-react";
import styles from './plan.module.scss';
import { PlanTema } from "./typer";
import { sendPlanUndertemaÅpnet } from '../../utils/analytics/analytics';

export default function Innholdsblokk({ tema }: { tema: PlanTema }) {
	const filtrerteUndertemaer = React.useMemo(() => tema.undertemaer.filter((undertema) => undertema.inkludert)
		.sort((a, b) => {
			return a.id - b.id;
		}), [tema]);

	return (
		<Accordion className={styles.styledAccordion}>
			<div className={styles.labelRad} aria-hidden>
				<span className={styles.innholdLabel}>Tema</span>
				<span className={styles.varighetLabel}>Periode</span>
				<span className={styles.statusLabel}>Status</span>
			</div>
			{
				filtrerteUndertemaer.map((undertema) => (
					<Innholdsrad
						key={undertema.id}
						undertema={undertema}
					/>
				))
			}
		</Accordion>
	);
}

function Innholdsrad({ undertema }: { undertema: PlanTema['undertemaer'][number] }) {
	return (
		<Accordion.Item className={styles.styledAccordionItem} onOpenChange={(open) => {
			if (open) {
				sendPlanUndertemaÅpnet(undertema.navn, undertema.status);
			}
		}}>
			<Accordion.Header className={styles.styledAccordionHeader}>
				<span className={styles.styledInnholdsTittel} aria-label={`Tema: ${undertema.navn}`}>
					{undertema.navn}
				</span>
				<span aria-label={`fra ${nullSafeLokalDatoMedLangTekstmåned(undertema.startDato)} til ${nullSafeLokalDatoMedLangTekstmåned(undertema.sluttDato)}`}>
					{undertema.startDato && <PrettyInnholdsDato date={undertema.startDato} />}
					{undertema.startDato && undertema.sluttDato && " - "}
					{undertema.sluttDato && <PrettyInnholdsDato date={undertema.sluttDato} />}
				</span>
				<PrettyPrintUndertemaStatus status={undertema.status} />
			</Accordion.Header>
			<Accordion.Content className={styles.styledAccordionContent}>
				<BodyLong>
					{undertema.målsetning}
				</BodyLong>
			</Accordion.Content>
		</Accordion.Item>
	);
}

function PrettyPrintUndertemaStatus({ status }: { status: PlanTema['undertemaer'][number]['status'] }) {
	switch (status) {
		case "PÅGÅR":
			return <span>Pågår</span>;
		case "FULLFØRT":
			return <span>Fullført</span>;
		case "AVBRUTT":
			return <span>Avbrutt</span>;
		case "PLANLAGT":
			return <span>Planlagt</span>;
		default:
			return <span>Ukjent status</span>;
	}
}


function PrettyInnholdsDato({
	date,
	visNesteMåned = false,
}: {
	date: string;
	visNesteMåned?: boolean;
}) {
	return React.useMemo(() => {
		const nyDato = new Date(date);
		if (visNesteMåned) {
			nyDato.setDate(nyDato.getDate() - 1);
		}

		return lokalDatoMedKortTekstmåned(nyDato);
	}, [visNesteMåned, date]);
}

const dateFormatDatoMedKortTekstmåned = new Intl.DateTimeFormat("nb-NO", {
	month: "short",
	day: "numeric",
	year: "2-digit",
});

const dateFormatDatoMedLangTekstmåned = new Intl.DateTimeFormat("nb-NO", {
	month: "long",
	day: "numeric",
	year: "numeric",
});

function lokalDatoMedKortTekstmåned(input: Date) {
	return dateFormatDatoMedKortTekstmåned.format(new Date(input));
}

function lokalDatoMedLangTekstmåned(input: Date) {
	return dateFormatDatoMedLangTekstmåned.format(new Date(input));
}

function nullSafeLokalDatoMedLangTekstmåned(input: string | null | undefined) {
	if (!input) {
		return "ukjent dato";
	}
	return lokalDatoMedLangTekstmåned(new Date(input));
}