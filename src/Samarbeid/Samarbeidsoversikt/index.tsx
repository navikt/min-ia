import { Alert, BodyShort, Button, Heading, HStack, Page, VStack } from "@navikt/ds-react";
import styles from './Samarbeidsoversikt.module.scss';
import { penskrivIAStatus, SamarbeidsStatusBadge } from "../SamarbeidsStatusBadge";
import Link from "next/link";
import { ArrowRightIcon, BellDotFillIcon, ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import React from "react";
import { useFiaSamarbeid } from "../fiaSamarbeidAPI";
import { RestStatus } from "../../integrasjoner/rest-status";
import { Samarbeid, Samarbeidhendelse } from "../Samarbeidsvelger/samarbeidtyper";
import Samarbeidstidslinje from "./Samarbeidstidslinje";

const DEFAULT_MAKS_VISIBLE_SAMARBEID = 3;

export default function Samarbeidsoversikt() {
	const samarbeidsliste = useFiaSamarbeid();

	const tilgjengeligeSamarbeid: Samarbeid[] = React.useMemo(() => {
		if (samarbeidsliste.status !== RestStatus.Suksess || !samarbeidsliste.data) {
			return [];
		}
		return samarbeidsliste?.data?.map((samarbeid) => ({
			id: samarbeid.id,
			saksnummer: samarbeid.saksnummer,
			navn: samarbeid.navn,
			status: samarbeid.status,
			opprettet: new Date(samarbeid.opprettet),
			sistEndret: new Date(samarbeid.sistEndret),
			hendelser: [] // Placeholder for hendelser, kan utvides senere
		})) || [];
	}, [samarbeidsliste]);

	if (samarbeidsliste.status === RestStatus.LasterInn || samarbeidsliste.status === RestStatus.IkkeLastet) {
		return null; // Ikke alle har denne komponenten, så vi kan returnere null for å ikke vise loader for noe de fleste (?) ikke har.
	}

	if (samarbeidsliste.status === RestStatus.Feil || samarbeidsliste.status === RestStatus.IkkeInnlogget || samarbeidsliste.status === RestStatus.IngenTilgang) {
		return (
			<Page.Block width="xl" className={styles.samarbeidslisteSide} gutters>
				<Alert variant="error">
					Kunne ikke laste samarbeid. Vennligst prøv igjen senere.
				</Alert>
			</Page.Block>
		);
	}

	if (tilgjengeligeSamarbeid.length === 0) {
		return null; // Ingen samarbeid å vise
	}

	return (
		<Page.Block width="xl" className={styles.samarbeidslisteSide} gutters>
			<Heading level="2" size="large" className={styles.samarbeidslisteTittel} spacing>
				IA-samarbeid med Nav arbeidslivssenter
			</Heading>
			<Samarbeidsliste tilgjengeligeSamarbeid={tilgjengeligeSamarbeid} />
		</Page.Block>
	);
}

function Samarbeidsliste({ tilgjengeligeSamarbeid }: { tilgjengeligeSamarbeid: Samarbeid[] }) {
	const [erEkspandert, setErEkspandert] = React.useState(false);
	if (tilgjengeligeSamarbeid.length > DEFAULT_MAKS_VISIBLE_SAMARBEID && !erEkspandert) {
		return (
			<VStack className={styles.samarbeidsliste} gap="4">
				<Samarbeidslisteinnhold tilgjengeligeSamarbeid={tilgjengeligeSamarbeid.slice(0, DEFAULT_MAKS_VISIBLE_SAMARBEID)} />
				<Button
					variant="tertiary"
					onClick={() => setErEkspandert(true)}
					icon={<ChevronDownIcon aria-hidden />}>
					Se alle ({tilgjengeligeSamarbeid.length})
				</Button>
			</VStack>
		);
	}

	return (
		<VStack className={styles.samarbeidsliste} gap="4">
			<Samarbeidslisteinnhold tilgjengeligeSamarbeid={tilgjengeligeSamarbeid} />
			{
				tilgjengeligeSamarbeid.length > DEFAULT_MAKS_VISIBLE_SAMARBEID && erEkspandert && (
					<Button
						variant="tertiary"
						onClick={() => setErEkspandert(false)}
						icon={<ChevronUpIcon aria-hidden />}
					>
						Vis færre
					</Button>
				)
			}
		</VStack>
	);
}
function Samarbeidslisteinnhold({ tilgjengeligeSamarbeid }: { tilgjengeligeSamarbeid: Samarbeid[] }) {
	return tilgjengeligeSamarbeid.map((samarbeid) => (
		<SamarbeidslisteElement key={samarbeid.id} samarbeid={samarbeid} />
	));
}

function SamarbeidslisteElement({ samarbeid }: { samarbeid: Samarbeid }) {
	return (
		<VStack className={styles.samarbeidslisteElement} gap="2">
			<HStack justify="space-between" align="center" gap="4">
				<Heading level="3" size="medium">{samarbeid.navn}</Heading>
				<HStack gap="6" align="stretch" as={BodyShort}>
					<SamarbeidsStatusBadge status={samarbeid.status} />
					<Button
						as={Link}
						href={`/samarbeid/${samarbeid.id}`}
						icon={<ArrowRightIcon aria-hidden />}
						iconPosition="right"
						size="small">
						Se samarbeid
					</Button>
				</HStack>
			</HStack>
			<SisteSamarbeidshendelse hendelser={samarbeid.hendelser} />
			<Samarbeidstidslinje hendelser={samarbeid.hendelser} />
		</VStack>
	);
}

function SisteSamarbeidshendelse({ hendelser }: { hendelser: Samarbeidhendelse[] }) {
	if (hendelser.length === 0) {
		return null;
	}

	const sisteHendelse = hendelser.reduce((nyeste, nåværende) => {
		return nåværende.dato > nyeste.dato ? nåværende : nyeste;
	}, hendelser[0]);

	return (
		<HStack gap="2" align="center">
			<BellDotFillIcon fontSize="1.5rem" aria-hidden /> <b>{penskrivSamarbeidshendelse(sisteHendelse)}</b> {sisteHendelse.dato.toLocaleDateString("nb-NO")}
		</HStack>
	);
}

function penskrivSamarbeidshendelse(hendelse: Samarbeidhendelse): string {
	switch (hendelse.type) {
		case "SAMARBEID_STATUSENDRING":
			return `Samarbeid statusendring: ${penskrivIAStatus(hendelse.nyStatus)}`;
		case "SAMARBEIDSPLAN":
			return "Samarbeidsplan opprettet";
		case "BEHOVSVURDERING":
			return "Behovsvurdering gjennomført";
		case "EVALUERING":
			return "Evaluering gjennomført";
		default:
			return "Ukjent hendelse";
	}
};