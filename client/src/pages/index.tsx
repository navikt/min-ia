import { getPageProps, PageProps } from "../pageProps";
import { Layout } from "../komponenter/Layout/Layout";
import { Forside } from "../Forside/Forside";
import * as Sentry from "@sentry/browser";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { RestStatus } from "../integrasjoner/rest-status";
import { GetServerSideProps } from "next";
import {Layout2} from "../komponenter/Layout/Layout2";

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
    <Forside
      harNoenOrganisasjoner={harNoenOrganisasjoner}
    />
  );

  return (
    <Layout2
      altinnOrganisasjoner={
        organisasjonerBrukerHarTilgangTil.status === RestStatus.Suksess
          ? organisasjonerBrukerHarTilgangTil.data
          : []
      }
    >
      {forsideEllerInnloggingsside}
    </Layout2>
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
  return {
    props: {},
  }
};

export default Home;
