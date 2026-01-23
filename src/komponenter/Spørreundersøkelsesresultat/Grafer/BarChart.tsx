"use client";
import styles from "./grafer.module.scss";
import React from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSpørsmålMedSorterteSvaralternativer } from "../sorterSvaralternativer";
import { SpørsmålResultat } from "../SpørreundersøkelseRad";
import { BodyShort, Heading } from "@navikt/ds-react";

export default function BarChart({
  spørsmål,
  erIEksportMode = false,
  horizontal = false,
  farge = "var(--a-blue-500)",
}: {
  spørsmål: SpørsmålResultat;
  erIEksportMode?: boolean;
  horizontal?: boolean;
  farge?: string;
}) {
  const spørsmålMedSorterteAlternativer =
    useSpørsmålMedSorterteSvaralternativer(spørsmål);

  const options = React.useMemo(
    () =>
      genererChartOptionsFraSpørsmålOgSvar(
        spørsmålMedSorterteAlternativer,
        erIEksportMode,
        horizontal,
        farge,
      ),
    [spørsmålMedSorterteAlternativer],
  );

  if (spørsmål.svarListe.some((svar) => svar.antallSvar > 0) === false) {
    return (
      <>
        <Heading
          level="4"
          size="small"
          spacing
          className={styles.tomGrafTittel}
        >
          {spørsmål.tekst}
        </Heading>
        <BodyShort className={styles.tomtSpørsmålBeskrivelse}>
          For få deltakere til å vise resultater.
        </BodyShort>
      </>
    );
  }

  return (
    <>
      <div aria-hidden>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType={"chart"}
        />
      </div>
      <UUVennligOpplesningAvBarChart
        spørsmålMedSorterteAlternativer={spørsmålMedSorterteAlternativer}
      />
    </>
  );
}

function UUVennligOpplesningAvBarChart({
  spørsmålMedSorterteAlternativer,
}: {
  spørsmålMedSorterteAlternativer: SpørsmålResultat;
}) {
  return (
    <>
      <Heading
        level="4"
        size="small"
        spacing
        className={styles.kunForSkjermleser}
      >
        {spørsmålMedSorterteAlternativer.tekst}
      </Heading>
      <ul className={styles.kunForSkjermleser}>
        {spørsmålMedSorterteAlternativer.svarListe.map((svar) => (
          <li key={svar.id}>
            {svar.tekst}: {svar.antallSvar} svar
          </li>
        ))}
      </ul>
    </>
  );
}

function genererChartOptionsFraSpørsmålOgSvar(
  spørsmål: SpørsmålResultat,
  erIEksportMode: boolean,
  horizontal: boolean,
  farge: string,
): Highcharts.Options {
  return {
    chart: {
      type: horizontal ? "bar" : "column",
    },
    title: {
      text: spørsmål.tekst,
      align: "left",
      margin: 35,
    },
    subtitle: {
      text: spørsmål.flervalg ? "(flere valg er mulig)" : undefined,
      style: {
        textAlign: "left",
      },
    },
    plotOptions: {
      series: {
        animation: !erIEksportMode,
      },
      column: {
        borderWidth: 2,
        borderRadius: 0,
        crisp: true,
      },
    },
    series: [
      {
        type: "column",
        name: "Antall svar",
        data: spørsmål.svarListe.map((svar) =>
          svar.antallSvar > 0
            ? {
                y: svar.antallSvar,
                color: farge,
              }
            : null,
        ),
      },
    ],
    xAxis: {
      categories: spørsmål.svarListe.map((svar) => svar.tekst),
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: "Antall svar",
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
  };
}
