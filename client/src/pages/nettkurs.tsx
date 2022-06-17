import React, { useEffect, useState } from "react";
import { RestStatus } from "../integrasjoner/rest-status";
import { PageProps } from "../pageProps";
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
import { NavIkon } from "../Nettkurs/ikoner/NavIkon";
import Kurskalender from "../Nettkurs/Kurskalender/Kurskalender";
import { Layout } from "../komponenter/Layout/Layout";
import {sendNettkursFilterValgtEvent} from "../amplitude/events";

interface ListeElement {
  key: Tags;
  tekst: string;
}

type Filter = Tags;

export default function Nettkurs(props: { page: PageProps }) {
  const organisasjonerBrukerHarTilgangTil = useAltinnOrganisasjoner();
  const sykefraværshistorikk = useSykefraværshistorikk();

  const [filter, setFilter] = useState<Filter>(Tags.MEST_SETT);

  const filterListe: ListeElement[] = [
    { key: Tags.PSYKISK_HELSE, tekst: "Psykisk helse" },
    { key: Tags.ARBEIDSMILJØ, tekst: "Arbeidsmiljø" },
    { key: Tags.OPPFØLGING, tekst: "Oppfølging" },
    { key: Tags.MEDVIRKNING, tekst: "Medvirkning" },
    { key: Tags.ALLE, tekst: "Alle" },
    { key: Tags.MEST_SETT, tekst: "Mest sett" },
    { key: Tags.NYESTE, tekst: "Nyeste" },
  ];

  const getFilteredListOfVideos = (
    filter: Filter,
    videoList: QbrickVideo[]
  ): QbrickVideo[] => {
    if (filter === Tags.ALLE) {
      return videoList;
    }
    return videoList.filter((video) => video.tags.includes(filter));
  };

  const toggleFilters = (key: Tags) => {
    if (filter === key) {
      setFilter(Tags.MEST_SETT);
    } else {
      setFilter(key);
    }
  };

  const filterButtonList: Function = (liste: ListeElement[]) => (
    <>
      {liste.map((toggleFilter) => {
        const buttonPressed = filter === toggleFilter.key;
        return (
          <Button
            variant={buttonPressed ? "primary" : "tertiary"}
            aria-pressed={buttonPressed}
            key={toggleFilter.key}
            className={styles.nettkurs__knapp}
            onClick={() => {
              document.dispatchEvent(new CustomEvent("forcePausePlayer"));
              sendNettkursFilterValgtEvent(toggleFilter.tekst)
              toggleFilters(toggleFilter.key);
            }}
          >
            {toggleFilter.tekst}
          </Button>
        );
      })}
    </>
  );

  const skalVideoVises = (video: QbrickVideo) => {
    return getFilteredListOfVideos(filter, IAVideoer).includes(video);
  };
  const innhold = (
    <>
      {sykefraværshistorikk.status === RestStatus.IkkeInnlogget ? (
        <Innloggingsside redirectUrl={window.location.href} />
      ) : (
        <div className={styles.nettkurs}>
          <div className={styles.nettkurs__filter_rad}>
            {filterButtonList(filterListe)}
          </div>
          <div className={styles.videoer}>
            {IAVideoer.map((video, index) => {
              return (
                <div
                  style={{
                    width: "100%",
                    display: skalVideoVises(video) ? "flex" : "none",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  key={index}
                >
                  <div style={{ display: "initial", width: "100%" }}>
                    <QbrickVideoPlayer key={video.id} video={video} />
                  </div>
                  <div className={styles.nettkurs__ikon_og_tittel}>
                    <div className={styles.nettkurs__ikon}>
                      <NavIkon width={33} height={21} />
                    </div>
                    <div className={styles.nettkurs__tittel}>
                      {video.metadata.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Kurskalender />
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
  const page = {
    title: "Nettkurs",
    description:
      "Her får du informasjon om hvordan du kan forebygge fravær på arbeidsplassen",
  };

  return { props: { page } };
};
