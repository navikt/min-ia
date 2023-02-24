import { PageProps } from "../pageProps";
import { Forside, ForsideProps } from "../Forside/Forside";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { RestStatus } from "../integrasjoner/rest-status";
import { Layout } from "../komponenter/Layout/Layout";
import Head from "next/head";
import React from "react";
import { ManglerRettighetRedirect } from "../utils/Redirects";

const Home = (props: { page: PageProps; forsideProps: ForsideProps }) => {
  const organisasjonerBrukerHarTilgangTil = useAltinnOrganisasjoner();
  const trengerInnlogging =
    organisasjonerBrukerHarTilgangTil.status === RestStatus.IkkeInnlogget;

  const harIngenOrganisasjoner =
    organisasjonerBrukerHarTilgangTil.status === RestStatus.Suksess &&
    organisasjonerBrukerHarTilgangTil.data.length === 0;

  if (harIngenOrganisasjoner) {
    return <ManglerRettighetRedirect />;
  }

  const forsideEllerInnloggingsside = trengerInnlogging ? (
    <Innloggingsside redirectUrl={window.location.href} />
  ) : (
    <Forside {...props.forsideProps} />
  );

  return (
    <>
      <Head>
        <title>{props.page.title}</title>
        <meta property="og:title" content="Page title" key="title" />
      </Head>
      <Layout
        title={props.page.title}
        description={props.page.description}
        altinnOrganisasjoner={
          organisasjonerBrukerHarTilgangTil.status === RestStatus.Suksess
            ? organisasjonerBrukerHarTilgangTil.data
            : []
        }
      >
        {forsideEllerInnloggingsside}
      </Layout>
    </>
  );
};

// NextJS kaller denne ved Server Side Rendering (SSR)
export const getServerSideProps = async () => {
  const page: PageProps = {
    title: "Forebygge fravær",
    description:
      "Her får du informasjon om hvordan du kan forebygge fravær på arbeidsplassen",
  };

  const samtalestøtteUrl = process.env.SAMTALESTOTTE_URL || "#";
  const forebyggingsplanUrl = process.env.FOREBYGGINGSPLAN_URL || "#";

  const sykefraværsstatistikkUrl =
    process.env.SYKEFRAVARSSTATISTIKK_URL || "#";

  const forsideProps: ForsideProps = {
    samtalestøtteUrl,
    forebyggingsplanUrl,
    sykefraværsstatistikkUrl,
  };

  return {
    props: { page, forsideProps },
  };
};

export default Home;
