import styles from './Samarbeidstidslinje.module.scss';
import React from "react";
import { Samarbeidhendelse } from "../../Samarbeidsvelger/samarbeidtyper";
import { penskrivIAStatus } from '../../SamarbeidsStatusBadge';
import { BodyShort, Detail } from '@navikt/ds-react';
import { useTekstplasseringer } from './useTekstplasseringer';

export default function Samarbeidstidslinje({ hendelser }: { hendelser: Samarbeidhendelse[] }) {
	const {
		førsteHendelse,
		sisteHendelse,
		planStart,
		planSlutt,
		ikkePlanHendelser
	} = React.useMemo(() => hendelser.reduce((acc, hendelse) => {
		if (!acc.førsteHendelse || hendelse.dato < acc.førsteHendelse.dato) {
			acc.førsteHendelse = hendelse;
		}
		if (!acc.sisteHendelse || hendelse.dato > acc.sisteHendelse.dato) {
			acc.sisteHendelse = hendelse;
		}
		if (hendelse.type === "SAMARBEIDSPLAN") {
			acc.planStart = hendelse.start;
			acc.planSlutt = hendelse.slutt;

			if (!acc.sisteHendelse || hendelse.slutt > acc.sisteHendelse.dato) {
				acc.sisteHendelse = { ...hendelse, dato: hendelse.slutt };
			}
			if (!acc.førsteHendelse || hendelse.start < acc.førsteHendelse.dato) {
				acc.førsteHendelse = { ...hendelse, dato: hendelse.start };
			}
		} else {
			acc.ikkePlanHendelser.push(hendelse);
		}

		return acc;
	}, {
		førsteHendelse: null as Samarbeidhendelse | null,
		sisteHendelse: null as Samarbeidhendelse | null,
		planStart: null as Date | null,
		planSlutt: null as Date | null,
		ikkePlanHendelser: [] as Samarbeidhendelse[]
	}), [hendelser]);

	return (
		<Tidslinje
			førsteHendelse={førsteHendelse}
			sisteHendelse={sisteHendelse}
			planStart={planStart}
			planSlutt={planSlutt}
			ikkePlanHendelser={ikkePlanHendelser}
		/>
	);
}

function Tidslinje({ førsteHendelse, sisteHendelse, planStart, planSlutt, ikkePlanHendelser }: {
	førsteHendelse: Samarbeidhendelse | null;
	sisteHendelse: Samarbeidhendelse | null;
	planStart: Date | null;
	planSlutt: Date | null;
	ikkePlanHendelser: Samarbeidhendelse[];
}) {
	const tidslinjeRef = React.useRef<HTMLDivElement>(null);
	const [tidslinjeBredde, setTidslinjeBredde] = React.useState(0);

	React.useEffect(() => {
		const oppdaterBredde = () => {
			if (tidslinjeRef.current) {
				setTidslinjeBredde(tidslinjeRef.current.getBoundingClientRect().width);
			}
		};

		window.addEventListener('resize', oppdaterBredde);
		oppdaterBredde();

		return () => {
			window.removeEventListener('resize', oppdaterBredde);
		};
	}, []);

	const { planStartProsent, planSluttProsent, tidMellomStartOgSlutt } = React.useMemo(() => {
		if (!førsteHendelse || !sisteHendelse) {
			return { planStartProsent: 0, planSluttProsent: 0, tidMellomStartOgSlutt: 0 };
		}

		const tidMellom = sisteHendelse.dato.getTime() - førsteHendelse.dato.getTime();

		const startProsent = planStart
			? ((planStart.getTime() - førsteHendelse.dato.getTime()) / tidMellom) * 100
			: 0;

		const sluttProsent = planSlutt
			? ((planSlutt.getTime() - førsteHendelse.dato.getTime()) / tidMellom) * 100
			: 0;

		return {
			planStartProsent: startProsent,
			planSluttProsent: sluttProsent,
			tidMellomStartOgSlutt: tidMellom
		};
	}, [førsteHendelse, sisteHendelse, planStart, planSlutt]);

	const transformerteHendelser = React.useMemo(() => {
		if (!førsteHendelse || !sisteHendelse || tidMellomStartOgSlutt <= 0) {
			return [];
		}
		return ikkePlanHendelser.map(hendelse => ({
			prosent: ((hendelse.dato.getTime() - førsteHendelse.dato.getTime()) / tidMellomStartOgSlutt) * 100,
			hendelse,
		}));
	}, [førsteHendelse, ikkePlanHendelser, sisteHendelse, tidMellomStartOgSlutt]);

	// tekstplasseringer brukes for å hindre overlapping av tekst på tidslinjen
	const tekstplasseringer = useTekstplasseringer(transformerteHendelser, tidslinjeBredde);

	if (!førsteHendelse || !sisteHendelse || tidMellomStartOgSlutt <= 0) {
		return null;
	}

	return (
		<div className={styles.tidslinjeContainer}>
			<div className={styles.tidslinje} ref={tidslinjeRef}>
				{
					planStart && planSlutt && (
						<>
							<BodyShort size="small" className={styles.planbeskrivelse} style={{ left: `${planStartProsent}%` }}>
								<b>Aktiviteter i samarbeidsplan</b> {planStart.toLocaleDateString("nb-NO")} - {planSlutt.toLocaleDateString("nb-NO")}
							</BodyShort>
							<div className={styles.planlinje} style={{ left: `${planStartProsent}%`, right: `${100 - planSluttProsent}%` }} />
						</>
					)
				}
				{
					transformerteHendelser.map(({ hendelse, prosent }, index) => (
						<TidslinjeHendelse
							key={index}
							hendelse={hendelse}
							prosent={prosent}
							tekstplasseringer={tekstplasseringer}
							index={index}
							tidslinjeBredde={tidslinjeBredde}
						/>
					))
				}
			</div>
		</div>
	);
}

function TidslinjeHendelse({
	hendelse,
	prosent,
	tekstplasseringer,
	index,
	tidslinjeBredde
}: {
	hendelse: Samarbeidhendelse;
	prosent: number;
	tekstplasseringer: Array<{ start: number; end: number; width: number }>;
	index: number;
	tidslinjeBredde: number;
}) {
	// Hvis hendelsen vil overlappe med forrige hendelse, skjul teksten
	const avstandDisplayTextStyle = React.useMemo(() => {
		if (index > 0 && tekstplasseringer[index - 1].end > tekstplasseringer[index].start) {
			return { display: 'none' };
		}
	}, [index, tekstplasseringer]);

	const textStyle = React.useMemo(() => {
		// Try to center first, but adjust if too close to edges
		if (prosent * tidslinjeBredde / 100 < (tekstplasseringer[index].width / 2)) {
			// Very close to left edge - align text to the left
			return { left: '0', transform: 'none' };
		} else if (prosent * tidslinjeBredde / 100 > (tidslinjeBredde - (tekstplasseringer[index].width / 2))) {
			// Very close to right edge - align text to the right
			return { right: '0', transform: 'none' };
		} else {
			// Center the text on the hendelse item
			return { left: '50%', transform: 'translateX(-50%)' };
		}
	}, [prosent, tidslinjeBredde, tekstplasseringer, index]);

	return (
		<div className={styles.hendelse} style={{ left: `${prosent}%` }}>
			<Hendelsebeskrivelse hendelse={hendelse} textStyle={{ ...textStyle, ...avstandDisplayTextStyle }} />
		</div>
	);
}


function Hendelsebeskrivelse({ hendelse, textStyle }: { hendelse: Samarbeidhendelse; textStyle: React.CSSProperties }) {
	const beskrivelse = hendelseBeskrivelseTekst(hendelse);
	return (
		<Detail className={styles.beskrivelse} style={textStyle}>
			<b>{beskrivelse.boldText}</b>: {beskrivelse.normalText}
		</Detail>
	);
}

export function hendelseBeskrivelseTekst(hendelse: Samarbeidhendelse): {
	boldText: string;
	normalText: string;
} {
	switch (hendelse.type) {
		case "SAMARBEID_STATUSENDRING":
			return { boldText: penskrivIAStatus(hendelse.nyStatus), normalText: hendelse.dato.toLocaleDateString("nb-NO") };
		case "SAMARBEIDSPLAN":
			return { boldText: "Samarbeidsplan", normalText: hendelse.dato.toLocaleDateString("nb-NO") };
		case "BEHOVSVURDERING":
			return { boldText: "Behovsvurdering", normalText: hendelse.dato.toLocaleDateString("nb-NO") };
		case "EVALUERING":
			return { boldText: "Evaluering", normalText: hendelse.dato.toLocaleDateString("nb-NO") };
	}
}