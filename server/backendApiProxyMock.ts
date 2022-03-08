import { BASE_PATH } from "./backendApiProxy";

export const backendApiProxyMock = (app) => {
  console.log("========================================");
  console.log("========== Mock Backend API ============");
  console.log("===DETTE SKAL DU IKKE SE I PRODUKSJON===");
  console.log("========================================");

  app.get(`${BASE_PATH}/api/organisasjoner`, (request, response) => {
    response.send([
      {
        Name: "FLESK OG FISK AS",
        Type: "Enterprise",
        OrganizationNumber: "111111111",
        OrganizationForm: "AS",
        Status: "Active",
        ParentOrganizationNumber: "",
      },
      {
        Name: "FLESK OG FISK OSLO",
        Type: "Business",
        OrganizationNumber: "910969439",
        OrganizationForm: "BEDR",
        Status: "Active",
        ParentOrganizationNumber: "111111111",
      },
    ]);
  });

  app.get(`${BASE_PATH}/api/910969439/sykefravarshistorikk/kvartalsvis`, (request, response) => {
    response.send(
      kvartalsvisSykefraværsprosentMock
    );
  });

};

const kvartalsvisSykefraværsprosentMock =
    [
      {
        "type": "LAND",
        "label": "Norge",
        "kvartalsvisSykefraværsprosent": [
          {
            "prosent": 5.2,
            "tapteDagsverk": 5884917.3,
            "muligeDagsverk": 112525690.9,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2014
          },
          {
            "prosent": 5.5,
            "tapteDagsverk": 5880571.7,
            "muligeDagsverk": 107409308.4,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2014
          },
          {
            "prosent": 5.4,
            "tapteDagsverk": 6742042.9,
            "muligeDagsverk": 124694740.8,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2014
          },
          {
            "prosent": 5.4,
            "tapteDagsverk": 6890524.2,
            "muligeDagsverk": 127607137.9,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2015
          },
          {
            "prosent": 4.9,
            "tapteDagsverk": 5991969.6,
            "muligeDagsverk": 122662885.9,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2015
          },
          {
            "prosent": 4.3,
            "tapteDagsverk": 5959018.9,
            "muligeDagsverk": 138890110.1,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2015
          },
          {
            "prosent": 5.1,
            "tapteDagsverk": 6967356.7,
            "muligeDagsverk": 137680453,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2015
          },
          {
            "prosent": 5.2,
            "tapteDagsverk": 6669831.3,
            "muligeDagsverk": 127339213.4,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2016
          },
          {
            "prosent": 4.9,
            "tapteDagsverk": 6388935.4,
            "muligeDagsverk": 131259560.2,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2016
          },
          {
            "prosent": 4.2,
            "tapteDagsverk": 6034239,
            "muligeDagsverk": 142954052.5,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2016
          },
          {
            "prosent": 5.1,
            "tapteDagsverk": 7100497.8,
            "muligeDagsverk": 138297804.4,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2016
          },
          {
            "prosent": 5.5,
            "tapteDagsverk": 7583139.6,
            "muligeDagsverk": 138691199.7,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2017
          },
          {
            "prosent": 4.9,
            "tapteDagsverk": 6138915.4,
            "muligeDagsverk": 125480463.2,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2017
          },
          {
            "prosent": 4.3,
            "tapteDagsverk": 6119874.1,
            "muligeDagsverk": 143372091.6,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2017
          },
          {
            "prosent": 5.2,
            "tapteDagsverk": 7237496.1,
            "muligeDagsverk": 138796863.1,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2017
          },
          {
            "prosent": 5.6,
            "tapteDagsverk": 7552683.6,
            "muligeDagsverk": 136025318.4,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2018
          },
          {
            "prosent": 4.8,
            "tapteDagsverk": 6377350.6,
            "muligeDagsverk": 133386098.2,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2018
          },
          {
            "prosent": 4.2,
            "tapteDagsverk": 6141222.6,
            "muligeDagsverk": 145842198.2,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2018
          },
          {
            "prosent": 5.1,
            "tapteDagsverk": 7357660.9,
            "muligeDagsverk": 143033580.9,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2018
          },
          {
            "prosent": 5.5,
            "tapteDagsverk": 7605099.2,
            "muligeDagsverk": 138978910.7,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2019
          },
          {
            "prosent": 4.5,
            "tapteDagsverk": 6548546.8,
            "muligeDagsverk": 145788910.5,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2019
          }
        ]
      },
      {
        "type": "SEKTOR",
        "label": "Statlig forvaltning",
        "kvartalsvisSykefraværsprosent": [
          {
            "prosent": 4.9,
            "tapteDagsverk": 657853.3,
            "muligeDagsverk": 13558710.9,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2014
          },
          {
            "prosent": 5.2,
            "tapteDagsverk": 656757.2,
            "muligeDagsverk": 12574419,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2014
          },
          {
            "prosent": 5,
            "tapteDagsverk": 751926.4,
            "muligeDagsverk": 14967166.5,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2014
          },
          {
            "prosent": 5.1,
            "tapteDagsverk": 826463.9,
            "muligeDagsverk": 16339321.7,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2015
          },
          {
            "prosent": 4.6,
            "tapteDagsverk": 703017.4,
            "muligeDagsverk": 15419511.7,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2015
          },
          {
            "prosent": 4,
            "tapteDagsverk": 707097.2,
            "muligeDagsverk": 17602733.7,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2015
          },
          {
            "prosent": 4.8,
            "tapteDagsverk": 826120.3,
            "muligeDagsverk": 17297433.3,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2015
          },
          {
            "prosent": 5,
            "tapteDagsverk": 800390.9,
            "muligeDagsverk": 16137011.5,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2016
          },
          {
            "prosent": 4.6,
            "tapteDagsverk": 753482.5,
            "muligeDagsverk": 16438532.3,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2016
          },
          {
            "prosent": 4,
            "tapteDagsverk": 708839.5,
            "muligeDagsverk": 17831825.9,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2016
          },
          {
            "prosent": 4.8,
            "tapteDagsverk": 830456.2,
            "muligeDagsverk": 17240190.2,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2016
          },
          {
            "prosent": 5.1,
            "tapteDagsverk": 882527.9,
            "muligeDagsverk": 17191000.5,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2017
          },
          {
            "prosent": 4.6,
            "tapteDagsverk": 717599.3,
            "muligeDagsverk": 15538707.7,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2017
          },
          {
            "prosent": 4.1,
            "tapteDagsverk": 723862.6,
            "muligeDagsverk": 17690084.5,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2017
          },
          {
            "prosent": 5,
            "tapteDagsverk": 860400.6,
            "muligeDagsverk": 17139415,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2017
          },
          {
            "prosent": 5.3,
            "tapteDagsverk": 895544,
            "muligeDagsverk": 16808611.6,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2018
          },
          {
            "prosent": 4.5,
            "tapteDagsverk": 739268.6,
            "muligeDagsverk": 16347142.5,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2018
          },
          {
            "prosent": 4,
            "tapteDagsverk": 722040.1,
            "muligeDagsverk": 17864354.1,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2018
          },
          {
            "prosent": 4.9,
            "tapteDagsverk": 853895.8,
            "muligeDagsverk": 17570126,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2018
          },
          {
            "prosent": 5.2,
            "tapteDagsverk": 890575,
            "muligeDagsverk": 17196245.2,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2019
          },
          {
            "prosent": 5.2,
            "tapteDagsverk": 890575,
            "muligeDagsverk": 17196245.2,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2019
          }
        ]
      },
      {
        "type": "NÆRING",
        "label": "Produksjon av nærings- og nytelsesmidler",
        "kvartalsvisSykefraværsprosent": [
          {
            "prosent": 5.6,
            "tapteDagsverk": 144324.8,
            "muligeDagsverk": 2562076.9,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2017
          },
          {
            "prosent": 5.1,
            "tapteDagsverk": 118666.1,
            "muligeDagsverk": 2305817.2,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2017
          },
          {
            "prosent": 4.4,
            "tapteDagsverk": 118114.8,
            "muligeDagsverk": 2667592.7,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2017
          },
          {
            "prosent": 5.4,
            "tapteDagsverk": 137611.3,
            "muligeDagsverk": 2561233.5,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2017
          },
          {
            "prosent": 5.7,
            "tapteDagsverk": 141083.9,
            "muligeDagsverk": 2478321.1,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2018
          },
          {
            "prosent": 5,
            "tapteDagsverk": 121009.6,
            "muligeDagsverk": 2417009.6,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2018
          },
          {
            "prosent": 4.4,
            "tapteDagsverk": 117381.3,
            "muligeDagsverk": 2663932.3,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2018
          },
          {
            "prosent": 5.4,
            "tapteDagsverk": 139641.2,
            "muligeDagsverk": 2588943.6,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2018
          },
          {
            "prosent": 5.6,
            "tapteDagsverk": 139625.1,
            "muligeDagsverk": 2483134.2,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2019
          },
          {
            "prosent": 5.1,
            "tapteDagsverk": 118666.1,
            "muligeDagsverk": 2305817.2,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2019
          }
        ]
      },
      {
        "type": "VIRKSOMHET",
        "label": "NAV ARBEID OG YTELSER AVD OSLO",
        "kvartalsvisSykefraværsprosent": [
          {
            "prosent": 25.3,
            "tapteDagsverk": 235.3,
            "muligeDagsverk": 929.3,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2014
          },
          {
            "prosent": 21.3,
            "tapteDagsverk": 219.1,
            "muligeDagsverk": 1026.2,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2014
          },
          {
            "prosent": 14.4,
            "tapteDagsverk": 171.1,
            "muligeDagsverk": 1188.6,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2014
          },
          {
            "prosent": 9.4,
            "tapteDagsverk": 150.3,
            "muligeDagsverk": 1592.5,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2015
          },
          {
            "prosent": 12.4,
            "tapteDagsverk": 172.5,
            "muligeDagsverk": 1392.8,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2015
          },
          {
            "prosent": 1.3,
            "tapteDagsverk": 19.4,
            "muligeDagsverk": 1470.1,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2015
          },
          {
            "prosent": 3.8,
            "tapteDagsverk": 46.5,
            "muligeDagsverk": 1222.3,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2015
          },
          {
            "prosent": 12.9,
            "tapteDagsverk": 140.3,
            "muligeDagsverk": 1086.8,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2016
          },
          {
            "prosent": 10.4,
            "tapteDagsverk": 128.3,
            "muligeDagsverk": 1235,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2016
          },
          {
            "prosent": 5,
            "tapteDagsverk": 79.7,
            "muligeDagsverk": 1587.1,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2016
          },
          {
            "prosent": 7.7,
            "tapteDagsverk": 116.8,
            "muligeDagsverk": 1516.1,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2016
          },
          {
            "prosent": 14.5,
            "tapteDagsverk": 226.5,
            "muligeDagsverk": 1564.1,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2017
          },
          {
            "prosent": 9.8,
            "tapteDagsverk": 143.9,
            "muligeDagsverk": 1474.7,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2017
          },
          {
            "prosent": 11.5,
            "tapteDagsverk": 209.9,
            "muligeDagsverk": 1827.7,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2017
          },
          {
            "prosent": 15.1,
            "tapteDagsverk": 267.5,
            "muligeDagsverk": 1777.5,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2017
          },
          {
            "prosent": 20.9,
            "tapteDagsverk": 320.3,
            "muligeDagsverk": 1532.8,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2018
          },
          {
            "prosent": 7.3,
            "tapteDagsverk": 135.3,
            "muligeDagsverk": 1849.2,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2018
          },
          {
            "prosent": 7.1,
            "tapteDagsverk": 154.2,
            "muligeDagsverk": 2185.8,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2018
          },
          {
            "prosent": 9,
            "tapteDagsverk": 195.9,
            "muligeDagsverk": 2172,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2018
          },
          {
            "prosent": 12.8,
            "tapteDagsverk": 251.4,
            "muligeDagsverk": 1964.4,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2019
          },
          {
            "prosent": 9.6,
            "tapteDagsverk": 191.7,
            "muligeDagsverk": 2001.1,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2019
          },
          {
            "prosent": 3.3,
            "tapteDagsverk": 65.7,
            "muligeDagsverk": 1989.3,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2019
          },
          {
            "prosent": 10.3,
            "tapteDagsverk": 204.5,
            "muligeDagsverk": 1990.3,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2020
          },
          {
            "prosent": 8.3,
            "tapteDagsverk": 166,
            "muligeDagsverk": 1990.3,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2020
          },
          {
            "prosent": 8.3,
            "tapteDagsverk": 166,
            "muligeDagsverk": 1990.3,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2020
          },
          {
            "prosent": 8.3,
            "tapteDagsverk": 166,
            "muligeDagsverk": 1990.3,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2020
          }
        ]
      },
      {
        "type": "OVERORDNET_ENHET",
        "label": "NAV ARBEID OG YTELSER",
        "kvartalsvisSykefraværsprosent": [
          {
            "prosent": 21.5,
            "tapteDagsverk": 2000.3,
            "muligeDagsverk": 9290.3,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2014
          },
          {
            "prosent": 17.5,
            "tapteDagsverk": 1800.1,
            "muligeDagsverk": 10260.2,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2014
          },
          {
            "prosent": 14.4,
            "tapteDagsverk": 1710.1,
            "muligeDagsverk": 11880.6,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2014
          },
          {
            "prosent": 8.2,
            "tapteDagsverk": 1300.3,
            "muligeDagsverk": 15920.5,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2015
          },
          {
            "prosent": 9.5,
            "tapteDagsverk": 1320.5,
            "muligeDagsverk": 13920.8,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2015
          },
          {
            "prosent": 1.3,
            "tapteDagsverk": 190.4,
            "muligeDagsverk": 14700.1,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2015
          },
          {
            "prosent": 7.4,
            "tapteDagsverk": 900.5,
            "muligeDagsverk": 12220.3,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2015
          },
          {
            "prosent": 12,
            "tapteDagsverk": 1300.3,
            "muligeDagsverk": 10860.8,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2016
          },
          {
            "prosent": 9.6,
            "tapteDagsverk": 1186.3,
            "muligeDagsverk": 12341,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2016
          },
          {
            "prosent": 5,
            "tapteDagsverk": 795.7,
            "muligeDagsverk": 15870.1,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2016
          },
          {
            "prosent": 6.6,
            "tapteDagsverk": 1000.8,
            "muligeDagsverk": 15160.1,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2016
          },
          {
            "prosent": 12.8,
            "tapteDagsverk": 1999.5,
            "muligeDagsverk": 15640.1,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2017
          },
          {
            "prosent": 10.9,
            "tapteDagsverk": 1600.9,
            "muligeDagsverk": 14740.7,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2017
          },
          {
            "prosent": 9.3,
            "tapteDagsverk": 1700.9,
            "muligeDagsverk": 18270.7,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2017
          },
          {
            "prosent": 14.1,
            "tapteDagsverk": 2500.5,
            "muligeDagsverk": 17770.5,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2017
          },
          {
            "prosent": 24.2,
            "tapteDagsverk": 3700.3,
            "muligeDagsverk": 15320.8,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2018
          },
          {
            "prosent": 6.5,
            "tapteDagsverk": 1200.3,
            "muligeDagsverk": 18490.2,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2018
          },
          {
            "prosent": 7,
            "tapteDagsverk": 1540.2,
            "muligeDagsverk": 21850.8,
            "erMaskert": false,
            "kvartal": 3,
            "årstall": 2018
          },
          {
            "prosent": 9,
            "tapteDagsverk": 1950.9,
            "muligeDagsverk": 21711,
            "erMaskert": false,
            "kvartal": 4,
            "årstall": 2018
          },
          {
            "prosent": 11.7,
            "tapteDagsverk": 2300.4,
            "muligeDagsverk": 19640.4,
            "erMaskert": false,
            "kvartal": 1,
            "årstall": 2019
          },
          {
            "prosent": 11.5,
            "tapteDagsverk": 2300.3,
            "muligeDagsverk": 20010.1,
            "erMaskert": false,
            "kvartal": 2,
            "årstall": 2019
          }
        ]
      }
    ]
