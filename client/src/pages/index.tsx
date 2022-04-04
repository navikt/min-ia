import { getPageProps, PageProps } from "../pageProps";
import { Layout } from "../komponenter/Layout/Layout";
import { Forside } from "../Forside/Forside";
import * as Sentry from "@sentry/browser";
import { navDefaultAmplitudeClient } from "../amplitude/client";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { RestStatus } from "../integrasjoner/rest-status";
import { GetServerSideProps } from "next";

const Home = (props: { page: PageProps }) => {
  initialiserSentry();

  const organisasjonerBrukerHarTilgangTil = useAltinnOrganisasjoner();
  const trengerInnlogging =
    organisasjonerBrukerHarTilgangTil.status === RestStatus.IkkeInnlogget;

  const forsideEllerInnloggingsside = trengerInnlogging ? (
    <Innloggingsside redirectUrl={window.location.href} />
  ) : (
    <Forside amplitudeClient={navDefaultAmplitudeClient!!} />
  );

  return (
    <Layout
      title={props.page.title}
      description={props.page.description}
      decoratorParts={props.page.decorator}
      altinnOrganisasjoner={
        organisasjonerBrukerHarTilgangTil.status === RestStatus.Suksess
          ? organisasjonerBrukerHarTilgangTil.data
          : []
      }
    >
      {forsideEllerInnloggingsside}
    </Layout>
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
export const getServerSideProps: GetServerSideProps = async () => {
  const page = await getPageProps(
    "Forebygge fravær",
    "Her får du informasjon om hvordan du kan forebygge fravær på arbeidsplassen"
  );

  return { props: { page } };
};

export default Home;
