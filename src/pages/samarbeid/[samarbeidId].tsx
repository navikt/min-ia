import { PageProps } from "../../pageProps";
import {
	erFerdigNedlastet,
	RestRessurs,
	RestStatus,
} from "../../integrasjoner/rest-status";
import { Innloggingsside } from "../../Innlogginsside/Innloggingsside";
import { Layout } from "../../komponenter/Layout/Layout";
import React from "react";
import Head from "next/head";
import { getGrafanaUrl, getProdUrl, isMockApp } from "../../utils/envUtils";
import { doInitializeFaro } from "../../utils/initializeFaro";
import useBreadcrumbs from "../../utils/useBreadcrumbs";
import { useSendIaMetrikkEtterFemSekunder } from "../../hooks/useSendIaTjenesteMetrikkEtterFemSekunder";
import { useOrganisasjoner } from "../../hooks/useOrganisasjoner";
import Samarbeidsdetaljeside from "../../Samarbeid/Detaljer";
import { useRouter } from "next/router";
import { Organisasjon } from "@navikt/virksomhetsvelger";
import Lasteside from "../../Lasteside";

export default function ExperimentPlaygroundPage(props: {
	page: PageProps;
	kjørerMockApp: boolean;
	grafanaAgentUrl: string;
	prodUrl?: string;
}) {
	const { query: { samarbeidId }, replace } = useRouter();
	React.useEffect(() => {
		if (!props.kjørerMockApp) {
			doInitializeFaro(props.grafanaAgentUrl);
		}
	});
	useSendIaMetrikkEtterFemSekunder();

	const organisasjonerRespons = useOrganisasjoner();
	const brukerensOrganisasjoner = erFerdigNedlastet(organisasjonerRespons)
		? organisasjonerRespons.data
		: [];

	const organisasjonerBrukerHarTilgangTil = useOrganisasjoner();
	useBreadcrumbs([
		{
			title: "Min side – arbeidsgiver",
			url: "/min-side-arbeidsgiver",
		},
		{
			title: "Forebygge fravær",
			url: "/forebygge-fravar",
		},
		{
			title: "Detaljer",
			url: "/forebygge-fravar/samarbeid/detaljer",
		},
	]);

	return (
		<>
			<Head>
				<title>{props.page.title}</title>
			</Head>
			<Layout
				title={props.page.title}
				description={props.page.description}
				altinnOrganisasjoner={brukerensOrganisasjoner}
				kjørerMockApp={props.kjørerMockApp}
			>
				<Sideinnhold
					samarbeidId={typeof samarbeidId === "string" ? samarbeidId : undefined}
					setSamarbeidId={(nySamarbeidId: string) => replace(`/samarbeid/${nySamarbeidId}`)}
					organisasjonerBrukerHarTilgangTil={organisasjonerBrukerHarTilgangTil}
				/>
			</Layout>
		</>
	);
}

function Sideinnhold({ samarbeidId, setSamarbeidId, organisasjonerBrukerHarTilgangTil }: {
	samarbeidId: string | undefined;
	setSamarbeidId: (nySamarbeidId: string) => void;
	organisasjonerBrukerHarTilgangTil: RestRessurs<Organisasjon[]>;
}) {
	if (organisasjonerBrukerHarTilgangTil.status === RestStatus.LasterInn) {
		return (
			<Lasteside />
		);
	}

	if (organisasjonerBrukerHarTilgangTil.status === RestStatus.IkkeInnlogget) {
		return (
			<Innloggingsside redirectUrl={window.location.href} />
		);
	}

	return (
		<Samarbeidsdetaljeside samarbeidId={samarbeidId} setSamarbeidId={setSamarbeidId} />
	);
}

export async function getServerSideProps() {
	const page = {
		title: "Samarbeidsdetaljer",
		description:
			"Detaljer om et samarbeid mellom NAV og en arbeidsgiver",
	};

	return {
		props: {
			page,
			kjørerMockApp: isMockApp(),
			grafanaAgentUrl: getGrafanaUrl(),
			prodUrl: getProdUrl("samarbeid/detaljer"),
		},
	};
}
