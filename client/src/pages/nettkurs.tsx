import React, { useEffect } from "react";
import { RestStatus } from "../integrasjoner/rest-status";
import { Layout } from "../komponenter/Layout/Layout";
import { getPageProps, PageProps } from "../pageProps";
import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { GetServerSideProps } from "next";
import { useSykefraværshistorikk } from "../hooks/useSykefraværshistorikk";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import styles from "../Nettkurs/Nettkurs.module.scss";
import { Button } from "@navikt/ds-react";
import { QbrickVideoPlayer } from "../EmbeddedVideoPlayer/QbrickVideoPlayer";
import { IAVideoer } from "../utils/nettkurs-utils";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";

interface ListeElement {
  key: string;
  tekst: string;
}

export default function Nettkurs(props: { page: PageProps }) {
  const organisasjonerBrukerHarTilgangTil = useAltinnOrganisasjoner();
  const sykefraværshistorikk = useSykefraværshistorikk();

  const filterListe: ListeElement[] = [
    { key: "PsykiskHelse", tekst: "Psykisk helse (2)" },
    { key: "Arbeidsmiljø", tekst: "Arbeidsmiljø (7)" },
    { key: "Oppfølging", tekst: "Oppfølging (3)" },
    { key: "Medvirkning", tekst: "Medvirkning (1)" },
  ];
  const sorteringListe = [
    { key: "Mest sett", tekst: "Mest sett" },
    { key: "Kortest", tekst: "Kortest" },
    { key: "Nyeste", tekst: "Nyeste" },
  ];
  const onClickFunction = (key: string) => {
    //e.preventDefault();
    //alert(key);
    // Her kan vi filtrere eller sortere med switch case on key.
  };
  const filterButtomList: Function = (liste: ListeElement[]) => (
    <div className={styles.nettkurs}>
      {liste.map((filter) => (
        <Button
          variant="tertiary"
          key={filter.key}
          className={styles.nettkurs__knapp}
          onClick={(e) => {
            onClickFunction(filter.key);
          }}
        >
          {filter.tekst}
        </Button>
      ))}
    </div>
  );
  const innhold = (
    <>
      {sykefraværshistorikk.status === RestStatus.IkkeInnlogget ? (
        <Innloggingsside redirectUrl={window.location.href} />
      ) : (
        <div className={styles.nettkurs}>
          <div className={styles.nettkurs__filter_rad}>
            {filterButtomList(filterListe)}
          </div>
          <div className={styles.nettkurs__sortering_rad}>
            {filterButtomList(sorteringListe)}
          </div>
          <div className={styles.videoer}>
            {IAVideoer.map((video) => {
              return <QbrickVideoPlayer videoId={video.id} key={video.id} />;
            })}
          </div>
        </div>
      )}
    </>
  );

  useEffect(() => {
    setBreadcrumbs([
      {
        title: "Forebygge fravær",
        url: "/min-ia",
      },
      {
        title: "Nettkurs",
        url: "/min-ia/nettkurs",
      },
    ]);
  }, []);

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
      {innhold}
    </Layout>
  );
}
// NextJS kaller denne ved Server Side Rendering (SSR)
export const getServerSideProps: GetServerSideProps = async () => {
  const page = await getPageProps(
    "Nettkurs",
    "Her får du informasjon om hvordan du kan forebygge fravær på arbeidsplassen"
  );

  return { props: { page } };
};
