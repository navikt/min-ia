import {
  AggregertStatistikkDto,
  Statistikkategori,
} from "../../integrasjoner/aggregert-statistikk-api";

export const mockAggregertStatistikkMedBransjetall: AggregertStatistikkDto = {
  muligeDagsverkTotalt: [],
  tapteDagsverkTotalt: [],
  prosentSiste4KvartalerTotalt: [
    {
      statistikkategori: Statistikkategori.LAND,
      label: "Norge",
      verdi: "9.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      statistikkategori: Statistikkategori.VIRKSOMHET,
      label: "Virksomhet",
      verdi: "8.8",
      antallPersonerIBeregningen: 145,
      kvartalerIBeregningen: [
        { årstall: 2021, kvartal: 2 },
        { årstall: 2021, kvartal: 3 },
        {
          årstall: 2021,
          kvartal: 4,
        },
        { årstall: 2022, kvartal: 1 },
      ],
    },
    {
      statistikkategori: Statistikkategori.NÆRING,
      label: "Næringen til barenhager",
      verdi: "7.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      statistikkategori: Statistikkategori.BRANSJE,
      label: "Barnehager",
      verdi: "5.1",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
  prosentSiste4KvartalerGradert: [
    {
      statistikkategori: Statistikkategori.LAND,
      label: "Norge",
      verdi: "9.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      statistikkategori: Statistikkategori.NÆRING,
      label: "Næringen til barenhager",
      verdi: "7.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      statistikkategori: Statistikkategori.BRANSJE,
      label: "Barnehager",
      verdi: "5.1",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
  prosentSiste4KvartalerKorttid: [
    {
      statistikkategori: Statistikkategori.LAND,
      label: "Norge",
      verdi: "9.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      statistikkategori: Statistikkategori.NÆRING,
      label: "Næringen til barenhager",
      verdi: "7.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      statistikkategori: Statistikkategori.BRANSJE,
      label: "Barnehager",
      verdi: "5.1",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
  prosentSiste4KvartalerLangtid: [
    {
      statistikkategori: Statistikkategori.LAND,
      label: "Norge",
      verdi: "9.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      statistikkategori: Statistikkategori.NÆRING,
      label: "Næringen til barenhager",
      verdi: "7.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      statistikkategori: Statistikkategori.BRANSJE,
      label: "Barnehager",
      verdi: "5.1",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
  trendTotalt: [
    {
      statistikkategori: Statistikkategori.LAND,
      label: "Norge",
      verdi: "2.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      statistikkategori: Statistikkategori.NÆRING,
      label: "Næringen til barenhager",
      verdi: "4.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
        {
          årstall: 2021,
          kvartal: 1,
        },
      ],
    },
    {
      statistikkategori: Statistikkategori.BRANSJE,
      label: "Barenhager",
      verdi: "-2.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
        {
          årstall: 2021,
          kvartal: 1,
        },
      ],
    },
  ],
};
