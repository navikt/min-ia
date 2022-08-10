export const organisasjoner = [
  {
    Name: "FLESK OG FISK AS [Local server]",
    Type: "Enterprise",
    OrganizationNumber: "111111111",
    OrganizationForm: "AS",
    Status: "Active",
    ParentOrganizationNumber: "",
  },
  {
    Name: "FLESK OG FISK OSLO [Local server]",
    Type: "Business",
    OrganizationNumber: "910969439",
    OrganizationForm: "BEDR",
    Status: "Active",
    ParentOrganizationNumber: "111111111",
  },
  {
    Name: "Trøndelag Tømmerere [Local server]",
    Type: "Enterprise",
    OrganizationNumber: "211111111",
    OrganizationForm: "AS",
    Status: "Active",
    ParentOrganizationNumber: "",
  },
  {
    Name: "Trøndelag Tømmerere avd. OSLO [Local server]",
    Type: "Business",
    OrganizationNumber: "810969439",
    OrganizationForm: "BEDR",
    Status: "Active",
    ParentOrganizationNumber: "211111111",
  },
  {
    Name: "System feil AS",
    Type: "Enterprise",
    OrganizationNumber: "311111111",
    OrganizationForm: "AS",
    Status: "Active",
    ParentOrganizationNumber: "",
  },
  {
    Name: "Krever innlogging",
    Type: "Business",
    OrganizationNumber: "999999998",
    OrganizationForm: "BEDR",
    Status: "Active",
    ParentOrganizationNumber: "311111111",
  },
  {
    Name: "Generell feil",
    Type: "Business",
    OrganizationNumber: "999999997",
    OrganizationForm: "BEDR",
    Status: "Active",
    ParentOrganizationNumber: "311111111",
  },
];

export const aggregertStatistikkMedBransjeMock = {
  prosentSiste4Kvartaler: [
    {
      kategori: "LAND",
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
      kategori: "NÆRING",
      label: "Barnehagenæringen",
      verdi: "10.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      kategori: "BRANSJE",
      label: "Barnehager",
      verdi: "19.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
  trend: [
    {
      kategori: "LAND",
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
      kategori: "NÆRING",
      label: "Barnehagenæringen",
      verdi: "-2.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
    {
      kategori: "BRANSJE",
      label: "Barnehager",
      verdi: "-2.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
};

export const aggregertStatistikkNæringMock = {
  prosentSiste4Kvartaler: [
    {
      kategori: "LAND",
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
      kategori: "NÆRING",
      label: "Barnehagenæringen",
      verdi: "-1.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
  trend: [
    {
      kategori: "LAND",
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
      kategori: "NÆRING",
      label: "Barnehager",
      verdi: "-2.0",
      antallPersonerIBeregningen: 10,
      kvartalerIBeregningen: [
        {
          årstall: 2022,
          kvartal: 1,
        },
      ],
    },
  ],
};
