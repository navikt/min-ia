import { PageProps } from "../pageProps";
import { Forside, ForsideProps } from "../Forside/Forside";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { RestRessurs, RestStatus } from "../integrasjoner/rest-status";
import { Layout } from "../komponenter/Layout/Layout";
import Head from "next/head";
import React from "react";
import {
  getGrafanaUrl,
  hentUrlFraMiljøvariabel,
  isMockApp,
} from "../utils/envUtils";
import { Alert } from "@navikt/ds-react";
import { doInitializeFaro } from "../utils/initializeFaro";
import Lasteside from "../Lasteside";
import { AltinnOrganisasjon } from "../integrasjoner/altinnorganisasjon-api";

interface HomeProps {
  page: PageProps;
  forsideProps: ForsideProps;
  minSideArbeidsgiverUrl: string;
  kjørerMockApp: boolean;
  grafanaAgentUrl: string;
}

const Home = (props: HomeProps) => {
  React.useEffect(() => {
    if (!props.kjørerMockApp) {
      doInitializeFaro(props.grafanaAgentUrl);
    }
  });
  const organisasjonerBrukerHarTilgangTil = useAltinnOrganisasjoner();

  const harIngenOrganisasjoner =
    organisasjonerBrukerHarTilgangTil.status === RestStatus.Suksess &&
    organisasjonerBrukerHarTilgangTil.data.length === 0;

  if (harIngenOrganisasjoner) {
    window?.location.replace(props.minSideArbeidsgiverUrl);
    return null;
  }

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
        <Sideinnhold
          forsideProps={props.forsideProps}
          organisasjonerBrukerHarTilgangTil={organisasjonerBrukerHarTilgangTil}
        />
      </Layout>
    </>
  );
};

function Sideinnhold({
  forsideProps,
  organisasjonerBrukerHarTilgangTil,
}: {
  forsideProps: ForsideProps;
  organisasjonerBrukerHarTilgangTil: RestRessurs<AltinnOrganisasjon[]>;
}) {
  if (organisasjonerBrukerHarTilgangTil.status === RestStatus.LasterInn) {
    return <Lasteside />;
  }

  if (organisasjonerBrukerHarTilgangTil.status === RestStatus.IkkeInnlogget) {
    return <Innloggingsside redirectUrl={window.location.href} />;
  }

  return (
    <Forside {...forsideProps}>
      {organisasjonerBrukerHarTilgangTil.status === RestStatus.Feil && (
        <Alert variant="error">
          Det har skjedd en feil ved innlasting av dine virksomheter. Vennligst
          prøv igjen.
        </Alert>
      )}
    </Forside>
  );
}

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
    kjørerMockApp,
  };

  const props: HomeProps = {
    page,
    forsideProps,
    minSideArbeidsgiverUrl,
    kjørerMockApp,
    grafanaAgentUrl: getGrafanaUrl(),
  };

  return { props };
};

export default Home;
