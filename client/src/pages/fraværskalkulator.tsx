import { PageProps } from "../pageProps";
import {
  erFerdigNedlastet,
  erIkkeFerdigLastet,
  erIkkeInnlogget,
} from "../integrasjoner/rest-status";
import { Kalkulator } from "../komponenter/Kalkulator/Kalkulator/Kalkulator";
import { useAggregertStatistikk } from "../hooks/useAggregertStatistikk";
import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { hentUtKalkulatorData } from "../komponenter/Kalkulator/datauthenting";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { tomtDataobjekt } from "../integrasjoner/aggregert-statistikk-api";
import { Layout } from "../komponenter/Layout/Layout";
import { useEffect } from "react";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";

export function Fraværskalkulator(props: { page: PageProps }) {
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
        url: "/min-ia",
      },
      {
        title: "Fraværskalkulator",
        url: "min-ia/fraværskalkulator",
      },
    ]);
  }, []);

  return (
    <Layout
      title={props.page.title}
      description={props.page.description}
      altinnOrganisasjoner={brukerensOrganisasjoner}
    >
      {erIkkeInnlogget(aggregertStatistikkRespons) ? (
        <Innloggingsside redirectUrl={window.location.href} />
      ) : (
        <Kalkulator
          {...hentUtKalkulatorData(statistikk)}
          nedlastingPågår={erIkkeFerdigLastet(aggregertStatistikkRespons)}
        />
      )}
    </Layout>
  );
}

// NextJS kaller denne ved Client Side Rendering
export async function getStaticProps() {
  // Hvordan få tak i orgnr her? Vil kalle API server side
  const page = {
    title: "Fraværskalkulator",
    description:
      "Her kan du beregne hvor mye sykefraværet koster, og hvor mye du kan spare.",
  };

  return { props: { page } };
}
