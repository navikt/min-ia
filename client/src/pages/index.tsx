import { PageProps } from "../pageProps";
import { Forside } from "../Forside/Forside";
import * as Sentry from "@sentry/browser";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { RestStatus } from "../integrasjoner/rest-status";
import { Layout } from "../komponenter/Layout/Layout";

const Home = () => {
  initialiserSentry();
  const organisasjonerBrukerHarTilgangTil = useAltinnOrganisasjoner();
  const trengerInnlogging =
    organisasjonerBrukerHarTilgangTil.status === RestStatus.IkkeInnlogget;
  const page = {
    title: "Forebygge fravær",
    description:
        "Her får du informasjon om hvordan du kan forebygge fravær på arbeidsplassen",
  };
  const harNoenOrganisasjoner =
    organisasjonerBrukerHarTilgangTil.status === RestStatus.Suksess;
  const forsideEllerInnloggingsside = trengerInnlogging ? (
    <Innloggingsside redirectUrl={window.location.href} />
  ) : (
    <Forside harNoenOrganisasjoner={harNoenOrganisasjoner} />
  );

  return (
    <Layout
      title={page.title}
      description={page.description}
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
/*
export const getServerSideProps = async () => {


  return {
    props: { page },
  };
};
*/

export default Home;
