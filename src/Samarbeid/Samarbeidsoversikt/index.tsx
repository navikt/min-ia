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
import { sendKnappEvent, sendNavigereEvent } from "../../utils/analytics/analytics";

export const DEFAULT_MAKS_VISIBLE_SAMARBEID = 3;

export default function Samarbeidsoversikt() {
	const samarbeidsliste = useFiaSamarbeid();

	const { tilgjengeligeSamarbeid, harInaktive, harAktive }: { tilgjengeligeSamarbeid: Samarbeid[], harInaktive: boolean, harAktive: boolean } = React.useMemo(() => {
		if (samarbeidsliste.status !== RestStatus.Suksess || !samarbeidsliste.data) {
			return { tilgjengeligeSamarbeid: [], harInaktive: false, harAktive: false };
		}
		const sorterteSamarbeid = (samarbeidsliste?.data?.map((samarbeid) => ({
			offentligId: samarbeid.offentligId,
			saksnummer: samarbeid.saksnummer,
			navn: samarbeid.navn,
			status: samarbeid.status,
			opprettet: new Date(samarbeid.opprettet),
			sistEndret: new Date(samarbeid.sistEndret),
			hendelser: [] // Placeholder for hendelser, kan utvides senere
		})) || []).sort((a, b) => {
			if (a.status === b.status) {
				return b.sistEndret.getTime() - a.sistEndret.getTime(); // Nyeste først hvis samme status
			}

			if (a.status === "AKTIV" || b.status === "AKTIV") {
				return a.status === "AKTIV" ? -1 : 1; // Aktive først
			}

			return b.sistEndret.getTime() - a.sistEndret.getTime(); // Deretter nyeste først
		});

		return ({
			tilgjengeligeSamarbeid: sorterteSamarbeid,
			harInaktive: sorterteSamarbeid.some(s => s.status !== "AKTIV"),
			harAktive: sorterteSamarbeid.some(s => s.status === "AKTIV"),
		});
	}, [samarbeidsliste]);

	if (samarbeidsliste.status === RestStatus.LasterInn || samarbeidsliste.status === RestStatus.IkkeLastet) {
		return null; // Ikke alle har denne komponenten, så vi kan returnere null for å ikke vise loader for noe de fleste (?) ikke har.
	}

	if (samarbeidsliste.status === RestStatus.IngenTilgang) {
		return null; // Bruker har ikke tilgang til samarbeid, så vi viser ingenting
	}

	if (samarbeidsliste.status === RestStatus.Feil || samarbeidsliste.status === RestStatus.IkkeInnlogget) {
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
			<Samarbeidsliste tilgjengeligeSamarbeid={tilgjengeligeSamarbeid} harInaktive={harInaktive} harAktive={harAktive} />
		</Page.Block>
	);
}

function Samarbeidsliste({ tilgjengeligeSamarbeid, harInaktive, harAktive }: { tilgjengeligeSamarbeid: Samarbeid[], harInaktive: boolean, harAktive: boolean }) {
	const [erEkspandert, setErEkspandert] = React.useState(false);
	const [harFokusert, setHarFokusert] = React.useState(false);

	const filtrerteSamarbeid = React.useMemo(() => tilgjengeligeSamarbeid.filter(({ status }) => status === "AKTIV").slice(0, DEFAULT_MAKS_VISIBLE_SAMARBEID), [tilgjengeligeSamarbeid]);
	const førsteSamarbeidUnderFold = React.useMemo(() => tilgjengeligeSamarbeid.find(({ offentligId }) => !filtrerteSamarbeid.some(s => s.offentligId === offentligId)), [tilgjengeligeSamarbeid, filtrerteSamarbeid]);

	if (!harAktive && harInaktive) {
		return (
			<VStack className={styles.samarbeidsliste} gap="4">
				<SamarbeidslisteElement samarbeid={{
					hendelser: [],
					offentligId: tilgjengeligeSamarbeid[0].offentligId,
					navn: `Avsluttede samarbeid (${tilgjengeligeSamarbeid.length})`,
					status: "FULLFØRT",
				}} skjulStatus />
			</VStack>
		);
	}
	if ((harInaktive || tilgjengeligeSamarbeid.length > DEFAULT_MAKS_VISIBLE_SAMARBEID) && !erEkspandert) {
		return (
			<VStack className={styles.samarbeidsliste} gap="4">
				<Samarbeidslisteinnhold tilgjengeligeSamarbeid={filtrerteSamarbeid} />
				<Button
					variant="tertiary"
					onClick={() => {
						sendKnappEvent("Vis alle ([antall])");
						setErEkspandert(true);
						setHarFokusert(false);
					}}
					icon={<ChevronDownIcon aria-hidden />}>
					Vis alle ({tilgjengeligeSamarbeid.length})
				</Button>
			</VStack>
		);
	}

	return (
		<VStack className={styles.samarbeidsliste} gap="4">
			<Samarbeidslisteinnhold tilgjengeligeSamarbeid={tilgjengeligeSamarbeid} førsteSamarbeidUnderFold={førsteSamarbeidUnderFold} harFokusert={harFokusert} setHarFokusert={setHarFokusert} />
			{
				(harInaktive || tilgjengeligeSamarbeid.length > DEFAULT_MAKS_VISIBLE_SAMARBEID) && erEkspandert && (
					<Button
						variant="tertiary"
						onClick={() => {
							sendKnappEvent("Vis færre");
							setErEkspandert(false);
						}}
						icon={<ChevronUpIcon aria-hidden />}
					>
						Vis færre
					</Button>
				)
			}
		</VStack>
	);
}
function Samarbeidslisteinnhold({ tilgjengeligeSamarbeid, førsteSamarbeidUnderFold, harFokusert, setHarFokusert }: { tilgjengeligeSamarbeid: Samarbeid[], førsteSamarbeidUnderFold?: Samarbeid, harFokusert?: boolean, setHarFokusert?: (fokusert: boolean) => void }) {
	return tilgjengeligeSamarbeid.map((samarbeid) => (
		<SamarbeidslisteElement key={samarbeid.offentligId} samarbeid={samarbeid} autoFocus={!harFokusert && samarbeid.offentligId === førsteSamarbeidUnderFold?.offentligId} setHarFokusert={setHarFokusert} />
	));
}

function SamarbeidslisteElement({ samarbeid, skjulStatus = false, autoFocus = false, setHarFokusert = () => null }: { samarbeid: Samarbeid, skjulStatus?: boolean, autoFocus?: boolean, setHarFokusert?: (fokusert: boolean) => void }) {
	const linkRef = React.useRef<HTMLAnchorElement>(null);

	// Autofocus på lenka funka ikke. Skal det gjøras årntli må en gjøra det sjøl.
	React.useEffect(() => {
		if (autoFocus && linkRef.current) {
			console.log('autoFocus', autoFocus);
			linkRef.current.focus();
			setHarFokusert(true);
		}
	}, [autoFocus, setHarFokusert]);

	return (
		<VStack className={styles.samarbeidslisteElement} gap="2">
			<HStack justify="space-between" align="center" gap="4">
				<Heading level="3" size="medium">{samarbeid.navn}</Heading>
				<HStack gap="6" align="stretch" as={BodyShort}>
					{!skjulStatus && <SamarbeidsStatusBadge status={samarbeid.status} />}
					<Button
						as={Link}
						ref={linkRef}
						href={`/samarbeid/${samarbeid.offentligId}`}
						icon={<ArrowRightIcon aria-hidden />}
						iconPosition="right"
						onClick={() => sendNavigereEvent("Se samarbeid", "/samarbeid/[SAMARBEID_ID]")}
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
}