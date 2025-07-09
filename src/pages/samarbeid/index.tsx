import { PageProps } from "../../pageProps";
import {
	erFerdigNedlastet,
	erIkkeInnlogget,
} from "../../integrasjoner/rest-status";
import { useAggregertStatistikk } from "../../hooks/useAggregertStatistikk";
import { Innloggingsside } from "../../Innlogginsside/Innloggingsside";
import { Layout } from "../../komponenter/Layout/Layout";
import React from "react";
import Head from "next/head";
import { getGrafanaUrl, getProdUrl, isMockApp } from "../../utils/envUtils";
import { doInitializeFaro } from "../../utils/initializeFaro";
import useBreadcrumbs from "../../utils/useBreadcrumbs";
import { useSendIaMetrikkEtterFemSekunder } from "../../hooks/useSendIaTjenesteMetrikkEtterFemSekunder";
import { useOrganisasjoner } from "../../hooks/useOrganisasjoner";
import Samarbeidsoversikt from "../../Samarbeid/Samarbeidsoversikt";

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
			title: "Samarbeid",
			url: "/forebygge-fravar/samarbeid",
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
					<Samarbeidsoversikt />
				)}
			</Layout>
		</>
	);
}

export async function getServerSideProps() {
	const page = {
		title: "Forebygge og redusere fravær",
		description:
			"Dine samarbeid med NAV for å forebygge sykefravær.",
	};

	return {
		props: {
			page,
			kjørerMockApp: isMockApp(),
			grafanaAgentUrl: getGrafanaUrl(),
			prodUrl: getProdUrl("samarbeid"),
		},
	};
}
