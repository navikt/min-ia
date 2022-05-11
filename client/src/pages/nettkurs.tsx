import React, { useEffect, useState } from "react";
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
import { IAVideoer, QbrickVideo, Tags } from "../utils/nettkurs-utils";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import Script from "next/script";

interface ListeElement {
  key: Tags;
  tekst: string;
}

type Filters = Tags[];

export default function Nettkurs(props: { page: PageProps }) {
  const organisasjonerBrukerHarTilgangTil = useAltinnOrganisasjoner();
  const sykefraværshistorikk = useSykefraværshistorikk();

  const [filters, setFilters] = useState<Filters>([]);

  const filterListe: ListeElement[] = [
    { key: Tags.PSYKISK_HELSE, tekst: "Psykisk helse (2)" },
    { key: Tags.ARBEIDSMILJØ, tekst: "Arbeidsmiljø (7)" },
    { key: Tags.OPPFØLGING, tekst: "Oppfølging (3)" },
    { key: Tags.MEDVIRKNING, tekst: "Medvirkning (1)" },
    { key: Tags.DIALOGMØTE, tekst: "Dialogmøte (2)" },
    { key: Tags.IA, tekst: "Inkluderende arbeidsliv (3)" },
  ];

  const sorteringListe = [
    { key: "Mest sett", tekst: "Mest sett" },
    { key: "Kortest", tekst: "Kortest" },
    { key: "Nyeste", tekst: "Nyeste" },
  ];

  const getFilteredListOfVideos = (
    filters: Filters,
    videoList: QbrickVideo[]
  ): QbrickVideo[] => {
    if (filters.length === 0) return videoList;

    const [firstFilter, ...restFilters] = filters;
    const filteredVideos = videoList.filter((video) =>
      video.tags.includes(firstFilter)
    );
    return getFilteredListOfVideos(restFilters, filteredVideos);
  };

  const toggleFilters = (key: Tags) => {
    if (filters.includes(key)) {
      setFilters(filters.filter((e) => e !== key));
    } else {
      setFilters([...filters, key]);
    }
  };

  const filterButtomList: Function = (liste: ListeElement[]) => (
    <div className={styles.nettkurs}>
      {liste.map((filter) => {
        const buttonPressed = filters.includes(filter.key);
        return (
          <Button
            variant={buttonPressed ? "primary" : "tertiary"}
            aria-pressed={buttonPressed}
            key={filter.key}
            className={styles.nettkurs__knapp}
            onClick={(e) => {
              document.dispatchEvent(new CustomEvent("forcePausePlayer"));
              toggleFilters(filter.key);
            }}
          >
            {filter.tekst}
          </Button>
        );
      })}
    </div>
  );

  const sortingButtomList: Function = (liste: ListeElement[]) => (
    <div className={styles.nettkurs}>
      {liste.map((sortingOrder) => {
        return (
          <Button
            variant={"tertiary"}
            aria-pressed={false}
            key={sortingOrder.key}
            className={styles.nettkurs__knapp}
            onClick={(e) => {
              //TODO implement sorting of videos
            }}
          >
            {sortingOrder.tekst}
          </Button>
        );
      })}
    </div>
  );
  const skalVideoVises = (video: QbrickVideo) => {
    return getFilteredListOfVideos(filters, IAVideoer).includes(video);
  };
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
            {sortingButtomList(sorteringListe)}
          </div>
          <div className={styles.videoer}>
            {/*TODO sort the returned videos by sortingOrder*/}
            {IAVideoer.map((video, index) => {
              return (
                <div
                  style={{ display: skalVideoVises(video) ? "" : "none" }}
                  key={index}
                >
                  <QbrickVideoPlayer key={video.id} video={video} />
                </div>
              );
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
    <>
      <Script
        src="https://play2.qbrick.com/framework/GoBrain.min.js"
        strategy="beforeInteractive"
      />
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
    </>
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
