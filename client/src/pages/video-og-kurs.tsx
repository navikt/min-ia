import React, { useEffect, useState } from "react";
import { RestStatus } from "../integrasjoner/rest-status";
import { PageProps } from "../pageProps";
import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { GetServerSideProps } from "next";
import { useAggregertStatistikk } from "../hooks/useAggregertStatistikk";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import styles from ".././VideoOgKurs/Nettkurs.module.scss";
import { Button, Heading } from "@navikt/ds-react";
import { QbrickVideoPlayer } from "../EmbeddedVideoPlayer/QbrickVideoPlayer";
import { IAVideoer, QbrickVideo, Tags } from "../utils/nettkurs-utils";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import Script from "next/script";
import { NavIkon } from "../VideoOgKurs/ikoner/NavIkon";
import Kurskalender from ".././VideoOgKurs/Kurskalender/Kurskalender";
import { Layout } from "../komponenter/Layout/Layout";
import { sendNettkursFilterValgtEvent } from "../amplitude/events";
import { useSendIaTjenesteMetrikkOnEvent } from "../hooks/useSendIaTjenesteMetrikkOnEvent";
import { IaTjeneste } from "../integrasjoner/ia-tjenestemetrikker-api";
import {isMockApp} from "../utils/envUtils";

interface ListeElement {
  key: Tags;
  tekst: string;
}

type Filter = Tags;

export default function VideoOgKurs(props: { page: PageProps, kjørerMockApp: boolean }) {
  const organisasjonerBrukerHarTilgangTil = useAltinnOrganisasjoner();
  const aggregertStatistikk = useAggregertStatistikk();
  useSendIaTjenesteMetrikkOnEvent(IaTjeneste.NETTKURS, "videoAvspilles");

  const [filter, setFilter] = useState<Filter>(Tags.ALLE);

  const filterListe: ListeElement[] = [
    { key: Tags.ALLE, tekst: "Alle" },
    { key: Tags.PSYKISK_HELSE, tekst: "Psykisk helse" },
    { key: Tags.ARBEIDSMILJØ, tekst: "Arbeidsmiljø" },
    { key: Tags.OPPFØLGING, tekst: "Oppfølging" },
    { key: Tags.MEDVIRKNING, tekst: "Medvirkning" },
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
      setFilter(Tags.ALLE);
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
              sendNettkursFilterValgtEvent(
                toggleFilter.key,
                toggleFilter.tekst
              );
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
      <Heading size="large" level={"1"}>
        <title>{props.page.title}</title>
        <meta property="og:title" content="Page title" key="title" />
      </Heading>
      {aggregertStatistikk.status === RestStatus.IkkeInnlogget ? (
        <Innloggingsside redirectUrl={window.location.href} />
      ) : (
        <div className={styles.nettkurs}>
          <Heading
            level={"2"}
            size={"medium"}
            className={styles.nettkurs__filter_heading}
          >
            Velg filter
          </Heading>
          <div className={styles.nettkurs__filter_rad}>
            {filterButtonList(filterListe)}
          </div>
          <div className={styles.videoer}>
            {IAVideoer.map((video) => {
              return (
                <div
                  style={{
                    width: "100%",
                    display: skalVideoVises(video) ? "flex" : "none",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  key={video.id}
                >
                  <div
                    title={"Video med tittel ".concat(video.metadata.title)}
                    style={{ display: "initial", width: "100%" }}
                  >
                    <QbrickVideoPlayer key={video.id} video={video} />
                  </div>
                  <div className={styles.nettkurs__ikon_og_tittel}>
                    <div aria-hidden="true" className={styles.nettkurs__ikon}>
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
        url: "/forebygge-fravar",
      },
      {
        title: "Video og kurs",
        url: "/forebygge-fravar/video-og-kurs",
      },
    ]);
  }, []);

  return (
    <>
      <Script
        src="https://play2.qbrick.com/qbrick-player/framework/GoBrain.min.js"
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
        kjørerMockApp={props.kjørerMockApp}
      >
        {innhold}
      </Layout>
    </>
  );
}
// NextJS kaller denne ved Server Side Rendering (SSR)
export const getServerSideProps: GetServerSideProps = async () => {
  const page = {
    title: "Video og kurs",
    description:
      "Her får du informasjon om hvordan du kan forebygge fravær på arbeidsplassen",
  };

  return { props: { page, kjørerMockApp: isMockApp() } };
};
