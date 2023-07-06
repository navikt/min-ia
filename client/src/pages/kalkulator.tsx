import { PageProps } from "../pageProps";
import {
  erFerdigNedlastet,
  erIkkeFerdigLastet,
  erIkkeInnlogget,
} from "../integrasjoner/rest-status";
import { Fraværskalulator } from "../komponenter/Kalkulator/Kalkulator";
import { useAggregertStatistikk } from "../hooks/useAggregertStatistikk";
import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { hentUtKalkulatorData } from "../komponenter/Kalkulator/datauthenting";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { tomtDataobjekt } from "../integrasjoner/aggregert-statistikk-api";
import { Layout } from "../komponenter/Layout/Layout";
import { useEffect } from "react";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import Head from "next/head";
import { isMockApp } from "../utils/envUtils";

export default function Kalkulator(props: {
  page: PageProps;
  kjørerMockApp: boolean;
}) {
  const organisasjonerRespons = useAltinnOrganisasjoner();
  const brukerensOrganisasjoner = erFerdigNedlastet(organisasjonerRespons)
    ? organisasjonerRespons.data
    : [];

  const aggregertStatistikkRespons = useAggregertStatistikk();
  const statistikk = erFerdigNedlastet(aggregertStatistikkRespons)
    ? aggregertStatistikkRespons.data
    : tomtDataobjekt;

  // TODO: lag en useBreadcrumbs-hook
  useEffect(() => {
    setBreadcrumbs([
      {
        title: "Forebygge fravær",
        url: "/forebygge-fravar",
      },
      {
        title: "Fraværskalkulator",
        url: "/forebygge-fravar/kalkulator",
      },
    ]);
  }, []);

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

  return { props: { page, kjørerMockApp: isMockApp() } };
}
