import { PageProps } from "../pageProps";
import {
	erFerdigNedlastet,
	erIkkeInnlogget,
} from "../integrasjoner/rest-status";
import { useAggregertStatistikk } from "../hooks/useAggregertStatistikk";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { Layout } from "../komponenter/Layout/Layout";
import React from "react";
import Head from "next/head";
import { getGrafanaUrl, getProdUrl, isMockApp } from "../utils/envUtils";
import { doInitializeFaro } from "../utils/initializeFaro";
import useBreadcrumbs from "../utils/useBreadcrumbs";
import { useSendIaMetrikkEtterFemSekunder } from "../hooks/useSendIaTjenesteMetrikkEtterFemSekunder";
import Playground from "../komponenter/Playground";
import { useOrganisasjoner } from "../hooks/useOrganisasjoner";

export default function ExperimentPlaygroundPage(props: {
	page: PageProps;
	kjørerMockApp: boolean;
	grafanaAgentUrl: string;
	prodUrl?: string;
}) {
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

	const aggregertStatistikkRespons = useAggregertStatistikk();
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
			title: "Experiment playground",
			url: "/forebygge-fravar/experiment_playground",
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
				{erIkkeInnlogget(aggregertStatistikkRespons) ? (
					<Innloggingsside redirectUrl={window.location.href} />
				) : (
					<Playground />
				)}
			</Layout>
		</>
	);
}

export async function getServerSideProps() {
	// Hvordan få tak i orgnr her? Vil kalle API server side
	const page = {
		title: "Experiment playground",
		description:
			"Her putter vi ting vi tester ut. Ingenting du ser her er ment for sluttbrukere.",
	};

	return {
		props: {
			page,
			kjørerMockApp: isMockApp(),
			grafanaAgentUrl: getGrafanaUrl(),
			prodUrl: getProdUrl("kalkulator"),
		},
	};
}
