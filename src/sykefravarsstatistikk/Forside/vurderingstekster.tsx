import React from "react";
import { SykefraværVurdering } from "./vurdering-utils";
import { formaterProsent } from "../utils/app-utils";

export enum SammenligningsType {
  TOTALT = "TOTALT",
  LANGTID = "LANGTID",
  KORTTID = "KORTTID",
  GRADERT = "GRADERT",
}

const GRØNN_FAKTOR = 0.9;
const RØD_FAKTOR = 1.1;

export const sammenliknSykefraværstekst = (
  harBransje: boolean,
  sykefraværResultat: SykefraværVurdering,
  sammenligningsType: SammenligningsType,
) => {
  switch (sammenligningsType) {
    case SammenligningsType.TOTALT:
      return sammenliknSykefraværstekstTotalt(harBransje, sykefraværResultat);
    case SammenligningsType.LANGTID:
      return sammenliknSykefraværstekstLangtid(harBransje, sykefraværResultat);
    case SammenligningsType.KORTTID:
      return sammenliknSykefraværstekstKorttid(harBransje, sykefraværResultat);
    case SammenligningsType.GRADERT:
      return sammenliknSykefraværstekstGradert(harBransje, sykefraværResultat);
  }
};

const maskertForklaring = (
  <>
    Markert grå: Det er <strong>for få</strong> som har denne typen sykefravær i
    din bedrift til at vi kan vise statistikken. Dette gjør vi for å ivareta
    personvernet.
  </>
);

const sammenliknSykefraværstekstGradert = (
  harBransje: boolean,
  sykefraværResultat: SykefraværVurdering,
) => {
  switch (sykefraværResultat) {
    case "OVER":
      return (
        <>
          Markert grønn: Du bruker <strong>mer gradert sykefravær</strong> enn
          andre i {harBransje ? "din bransje" : "din næring"}
        </>
      );
    case "MIDDELS":
      return (
        <>
          Markert gul: Du bruker{" "}
          <strong>omtrent like mye gradert sykefravær</strong> som andre i{" "}
          {harBransje ? "din bransje" : "din næring"}
        </>
      );
    case "UNDER":
      return (
        <>
          Markert rød: Du bruker <strong>mindre gradert sykefravær</strong> enn
          andre i din {harBransje ? "din bransje" : "din næring"}
        </>
      );
    case "MASKERT":
      return maskertForklaring;
    case "UFULLSTENDIG_DATA":
      return (
        <>
          Markert grå:{" "}
          <strong>Vi mangler dine tall for deler av perioden</strong> med
          sammenligning.
        </>
      );
    case "FEIL_ELLER_INGEN_DATA":
      return (
        <>
          Markert grå: Vi <strong>kan ikke finne tall</strong> for virksomheten
          din.
        </>
      );
  }
};

const sammenliknSykefraværstekstTotalt = (
  harBransje: boolean,
  sykefraværResultat: SykefraværVurdering,
) => {
  switch (sykefraværResultat) {
    case "UNDER":
      return (
        <>
          Markert grønn: Du har <strong>lavere sykefravær</strong> enn{" "}
          {harBransje ? "bransjen" : "næringen"}
        </>
      );
    case "MIDDELS":
      return (
        <>
          Markert gul: Du har <strong>omtrent likt sykefravær</strong> som
          {harBransje ? "bransjen" : "næringen"}
        </>
      );
    case "OVER":
      return (
        <>
          Markert rød: Du har <strong>høyere sykefravær</strong> enn{" "}
          {harBransje ? "bransjen" : "næringen"}
        </>
      );
    case "MASKERT":
      return maskertForklaring;
    case "UFULLSTENDIG_DATA":
      return (
        <>
          Markert grå:{" "}
          <strong>Vi mangler dine tall for deler av perioden</strong> med
          sammenligning.
        </>
      );
    case "FEIL_ELLER_INGEN_DATA":
      return (
        <>
          Markert grå: Vi <strong>finner ikke tall</strong> for virksomheten
          din.
        </>
      );
  }
};

const sammenliknSykefraværstekstKorttid = (
  harBransje: boolean,
  resultat: SykefraværVurdering,
) => {
  switch (resultat) {
    case "UNDER":
      return (
        <>
          Markert grønn: Du har et{" "}
          <strong>lavere legemeldt korttidsfravær</strong> enn{" "}
          {harBransje ? "bransjen" : "næringen"}
        </>
      );
    case "MIDDELS":
      return (
        <>
          Markert gul: Du har{" "}
          <strong>omtrent likt legemeldt korttidsfravær</strong> som{" "}
          {harBransje ? "bransjen" : "næringen"}
        </>
      );
    case "OVER":
      return (
        <>
          Markert rød: Du har et{" "}
          <strong>høyere legemeldt korttidsfravær</strong> enn{" "}
          {harBransje ? "bransjen" : "næringen"}
        </>
      );
    case "MASKERT":
      return maskertForklaring;
    case "UFULLSTENDIG_DATA":
    case "FEIL_ELLER_INGEN_DATA":
      return (
        <>
          Markert grå:{" "}
          <strong>Vi mangler dine tall for deler av perioden</strong> med
          sammenligning.
        </>
      );
  }
};

export const sammenliknSykefraværstekstLangtid = (
  harBransje: boolean,
  resultat: SykefraværVurdering,
) => {
  switch (resultat) {
    case "UNDER":
      return (
        <>
          Markert grønn: Du har et <strong>lavere langtidsfravær</strong> enn
          {harBransje ? "bransjen" : "næringen"}.
        </>
      );
    case "MIDDELS":
      return (
        <>
          Markert gul: Du har <strong>omtrent likt langtidsfravær</strong> som
          {harBransje ? "bransjen" : "næringen"}.
        </>
      );
    case "OVER":
      return (
        <>
          Markert rød: Du har et <strong>høyere langtidsfravær</strong> enn
          {harBransje ? "bransjen" : "næringen"}.
        </>
      );
    case "MASKERT":
      return maskertForklaring;
    case "UFULLSTENDIG_DATA":
    case "FEIL_ELLER_INGEN_DATA":
      return (
        <>
          Markert grå:{" "}
          <strong>Vi mangler dine tall for deler av perioden</strong> med
          sammenligning.
        </>
      );
  }
};

export const getForklaringAvVurdering = (
  harBransje: boolean,
  resultat: SykefraværVurdering,
  bransjensProsent: number | null | undefined,
  antallKvartaler: number,
) => {
  if (bransjensProsent === null || bransjensProsent === undefined) {
    return (
      <>
        Sammenligningen din er blitt markert som grå fordi vi ikke finner tall
        for {harBransje ? "bransjen" : "næringen"} din. Vi viser dine tall når
        de publiseres.
      </>
    );
  }

  switch (resultat) {
    case "UNDER":
      return (
        <>
          <>
            Sammenligningen din er blitt markert som grønn på en skala av grønn,
            gul og rød.
          </>
          <>
            Dette skjer når ditt sykefravær er lavere enn{" "}
            {formaterProsent(bransjensProsent * GRØNN_FAKTOR)} prosent.
          </>
        </>
      );
    case "MIDDELS":
      return (
        <>
          <>
            Sammenligningen din er blitt markert som gul på en skala av grønn,
            gul og rød.
          </>
          <>
            Dette skjer når ditt sykefravær er mellom{" "}
            {formaterProsent(bransjensProsent * GRØNN_FAKTOR)} og{" "}
            {formaterProsent(bransjensProsent * RØD_FAKTOR)} prosent.
          </>
        </>
      );
    case "OVER":
      return (
        <>
          <>
            Sammenligningen din er blitt markert som rød på en skala av grønn,
            gul og rød.
          </>
          <>
            Dette skjer når ditt sykefravær er høyere enn{" "}
            {formaterProsent(bransjensProsent * RØD_FAKTOR)} prosent.
          </>
        </>
      );
    case "MASKERT":
      return maskertForklaring;
    case "UFULLSTENDIG_DATA":
      return (
        <>
          <strong>Din virksomhet</strong> har sykefraværsstatistikk for{" "}
          <strong>{antallKvartaler} av 4</strong> kvartaler. Tallet for{" "}
          <strong>{harBransje ? "bransjen" : "næringen"}</strong> regnes ut fra
          de fire siste kvartalene. Vi sammenlikner deg med{" "}
          {harBransje ? "bransjen" : "næringen"} når vi har dine tall for hele
          perioden.
        </>
      );
    case "FEIL_ELLER_INGEN_DATA":
      return (
        <>
          Sammenligningen din er blitt markert som grå fordi vi ikke finner tall
          for virksomheten din. Vi viser dine tall når de publiseres.
        </>
      );
  }
};
