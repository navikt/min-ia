import { PageProps } from "../pageProps";
import {
  erFerdigNedlastet,
  erIkkeFerdigLastet,
  erIkkeInnlogget,
} from "../integrasjoner/rest-status";
import { Fraværskalulator } from "../components/Kalkulator/Kalkulator";
import { useAggregertStatistikk } from "../hooks/useAggregertStatistikk";
import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { hentUtKalkulatorData } from "../components/Kalkulator/datauthenting";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { tomtDataobjekt } from "../integrasjoner/aggregert-statistikk-api";
import { Layout } from "../components/Layout/Layout";
import React from "react";
import Head from "next/head";
import { getGrafanaUrl, getProdUrl, isMockApp } from "../utils/envUtils";
import { doInitializeFaro } from "../utils/initializeFaro";
import useBreadcrumbs from "../utils/useBreadcrumbs";

export default function Kalkulator(props: {
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
  const organisasjonerRespons = useAltinnOrganisasjoner();
  const brukerensOrganisasjoner = erFerdigNedlastet(organisasjonerRespons)
    ? organisasjonerRespons.data
    : [];

  const aggregertStatistikkRespons = useAggregertStatistikk();
  const statistikk = erFerdigNedlastet(aggregertStatistikkRespons)
    ? aggregertStatistikkRespons.data
    : tomtDataobjekt;

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
      title: "Fraværskalkulator",
      url: "/forebygge-fravar/kalkulator",
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
          <Fraværskalulator
            kjørerMockApp={props.kjørerMockApp}
            prodUrl={props.prodUrl}
            {...hentUtKalkulatorData(statistikk)}
            nedlastingPågår={erIkkeFerdigLastet(aggregertStatistikkRespons)}
          />
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  // Hvordan få tak i orgnr her? Vil kalle API server side
  const page = {
    title: "Fraværskalkulator",
    description:
      "Her kan du beregne hvor mye sykefraværet koster, og hvor mye du kan spare.",
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
