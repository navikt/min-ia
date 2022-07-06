import { PageProps } from "../pageProps";
import { Forside } from "../Forside/Forside";
import * as Sentry from "@sentry/browser";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { RestStatus } from "../integrasjoner/rest-status";
import { Layout } from "../komponenter/Layout/Layout";
import Head from "next/head";
import React from "react";

const Home = (props: { page: PageProps }) => {
  initialiserSentry();
  const organisasjonerBrukerHarTilgangTil = useAltinnOrganisasjoner();
  const trengerInnlogging =
    organisasjonerBrukerHarTilgangTil.status === RestStatus.IkkeInnlogget;

  const harNoenOrganisasjoner =
    organisasjonerBrukerHarTilgangTil.status === RestStatus.Suksess;
  const forsideEllerInnloggingsside = trengerInnlogging ? (
    <Innloggingsside redirectUrl={window.location.href} />
  ) : (
    <Forside harNoenOrganisasjoner={harNoenOrganisasjoner} />
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

function initialiserSentry() {
  Sentry.init({
    dsn: "https://fd232b69e0994f30872d69130d694491@sentry.gc.nav.no/122",
    environment: process.env.NODE_ENV,
    enabled: process.env.NODE_ENV === "production",
  });
}

// NextJS kaller denne ved Server Side Rendering (SSR)
export const getServerSideProps = async () => {
  const page = {
    title: "Forebygge fravær",
    description:
      "Her får du informasjon om hvordan du kan forebygge fravær på arbeidsplassen",
  };

  return {
    props: { page },
  };
};

export default Home;
