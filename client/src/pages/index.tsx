import Head from "next/head";
import { getPageProps, PageProps } from "../pageProps";
import { Layout } from "../komponenter/Layout/Layout";
import { Forside } from "../Forside/Forside";
import * as Sentry from "@sentry/browser";
import { navDefaultAmplitudeClient } from "../amplitude/client";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { RestStatus } from "../integrasjoner/rest-status";
import { GetServerSideProps, GetStaticProps } from "next";

const Home = (props: { page: PageProps }) => {
  Sentry.init({
    dsn: "https://fd232b69e0994f30872d69130d694491@sentry.gc.nav.no/122",
    environment: process.env.NODE_ENV,
    enabled: process.env.NODE_ENV === "production",
  });

  const restAltinnOrganisasjoner = useAltinnOrganisasjoner();
  const trengerInnlogging =
    restAltinnOrganisasjoner.status === RestStatus.IkkeInnlogget;

  const innhold = trengerInnlogging ? (
    <Innloggingsside redirectUrl={window.location.href} />
  ) : (
    <Forside amplitudeClient={navDefaultAmplitudeClient!!} />
  );

  return (
    <div>
      <Head>
        <title>{props.page.appTitle}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main>
        <Layout
          title={props.page ? props.page.title : "kunne ikke hente tittel"}
          isFrontPage={true}
          decoratorParts={props.page.decorator}
          altinnOrganisasjoner={
            restAltinnOrganisasjoner.status === RestStatus.Suksess
              ? restAltinnOrganisasjoner.data
              : []
          }
        >
          {innhold}
        </Layout>
      </main>
      <footer />
    </div>
  );
};

// NextJS kaller denne ved Server Side Rendering (SSR)
export const getServerSideProps: GetServerSideProps = async () => {
  const page = await getPageProps(
    "Forebygge sykefravær",
    "SLUG: Du får hjelp til å forebygge sykefravær"
  );

  return { props: { page } };
};

export default Home;
