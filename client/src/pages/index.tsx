import { PageProps } from "../pageProps";
import { Forside, ForsideProps } from "../Forside/Forside";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { RestStatus } from "../integrasjoner/rest-status";
import { Layout } from "../komponenter/Layout/Layout";
import Head from "next/head";
import React from "react";
import { hentUrlFraMiljøvariabel, isMockApp } from "../utils/envUtils";
import { Alert } from "@navikt/ds-react";

interface HomeProps {
  page: PageProps;
  forsideProps: ForsideProps;
  minSideArbeidsgiverUrl: string;
  kjørerMockApp: boolean;
}

const Home = (props: HomeProps) => {
  const organisasjonerBrukerHarTilgangTil = useAltinnOrganisasjoner();
  const trengerInnlogging =
    organisasjonerBrukerHarTilgangTil.status === RestStatus.IkkeInnlogget;

  const harIngenOrganisasjoner =
    organisasjonerBrukerHarTilgangTil.status === RestStatus.Suksess &&
    organisasjonerBrukerHarTilgangTil.data.length === 0;

  if (harIngenOrganisasjoner) {
    window?.location.replace(props.minSideArbeidsgiverUrl);
    return null;
  }

  const forsideEllerInnloggingsside = trengerInnlogging ? (
    <Innloggingsside redirectUrl={window.location.href} />
  ) : (
    <Forside {...props.forsideProps}>
      {organisasjonerBrukerHarTilgangTil.status === RestStatus.Feil && (
        <Alert variant="error">
          Det har skjedd en feil ved innlasting av dine virksomheter. Vennligst
          prøv igjen.
        </Alert>
      )}
    </Forside>
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
        kjørerMockApp={props.kjørerMockApp}
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

  const kjørerMockApp = isMockApp();
  const minSideArbeidsgiverUrl = hentUrlFraMiljøvariabel(
    "Min Side Arbeidsgiver"
  );

  const forsideProps: ForsideProps = {
    samtalestøtteUrl: hentUrlFraMiljøvariabel("Samtalestøtte"),
    forebyggingsplanUrl: hentUrlFraMiljøvariabel("Forebyggingsplan"),
    sykefraværsstatistikkUrl: hentUrlFraMiljøvariabel("Sykefraværsstatistikk"),
    kontaktOssUrl: hentUrlFraMiljøvariabel("Kontakt Oss"),
  };

  const props: HomeProps = {
    page,
    forsideProps,
    minSideArbeidsgiverUrl,
    kjørerMockApp,
  };

  return { props };
};

export default Home;
