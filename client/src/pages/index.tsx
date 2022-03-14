import Head from "next/head";
import { getPageProps, PageProps } from "../pageProps";
import { Layout } from "../komponenter/Layout/Layout";
import { Forside } from "../Forside/Forside";
import { navDefaultAmplitudeClient } from "../amplitude/client";

const Home = (props: { page: PageProps }) => {
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
        >
          <Forside amplitudeClient={navDefaultAmplitudeClient} />
        </Layout>
      </main>
      <footer />
    </div>
  );
};

interface StaticProps {
  props: {
    page: PageProps;
  };
  revalidate: number;
}

// NextJS kaller denne
export const getStaticProps = async (): Promise<StaticProps> => {
  const page = await getPageProps(
    "Forebygge sykefravær",
    "SLUG: Du får hjelp til å forebygge sykefravær"
  );

  return {
    props: { page },
    revalidate: 60,
  };
};

export default Home;
