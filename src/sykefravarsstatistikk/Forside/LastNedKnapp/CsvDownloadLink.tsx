import {
  HistorikkLabels,
  KvartalsvisSammenligning,
} from "../../utils/sykefraværshistorikk-utils";
import React, { FunctionComponent } from "react";
import { Button, Link } from "@navikt/ds-react";
import { DownloadIcon } from "@navikt/aksel-icons";
import { formaterProsent } from "../../Historikk/GrafEllerTabell/Tabell/tabell-utils";
import styles from "./LastNedKnapp.module.css";

const buildCsvDataUrl = (
  labels: HistorikkLabels,
  data: KvartalsvisSammenligning[],
  harOverordnetEnhet: boolean,
) => {
  const csvHeaders = [
    "År",
    "Kvartal",
    `Din virksomhet ${labels.virksomhet}`,
    harOverordnetEnhet ? labels.overordnetEnhet : undefined,
    `Bransje ${labels.næringEllerBransje}`,
    `Sektor ${labels.sektor}`,
    labels.land,
  ]
    .filter((i) => i !== undefined && i !== null)
    .join(";");

  const csvRows = data.map((rad) =>
    [
      rad.årstall,
      rad.kvartal,
      formaterProsent(rad.virksomhet),
      harOverordnetEnhet ? formaterProsent(rad.overordnetEnhet) : undefined,
      formaterProsent(rad.næringEllerBransje),
      formaterProsent(rad.sektor),
      formaterProsent(rad.land),
    ]
      .filter((i) => i !== undefined && i !== null)
      .join(";"),
  );

  const dataUrlHeaders = "data:text/csv;charset=utf-8,";
  const dataUrlCsv =
    "\uFEFF" + encodeURIComponent([csvHeaders, ...csvRows].join("\r\n"));

  return dataUrlHeaders + dataUrlCsv;
};
type CsvDownloadLinkProps = {
  kvartalsvisSammenligning: KvartalsvisSammenligning[];
  harOverordnetEnhet: boolean;
  historikkLabels: HistorikkLabels;
  onClick?: () => void;
};
export const CsvDownloadLink: FunctionComponent<CsvDownloadLinkProps> = ({
  kvartalsvisSammenligning,
  harOverordnetEnhet,
  historikkLabels,
  onClick,
}) => {
  return (
    <div className={styles["last-ned-knapp-wrapper"]}>
      <Button
        as={Link}
        className={`${styles["last-ned-knapp"]}`}
        href={buildCsvDataUrl(
          historikkLabels,
          kvartalsvisSammenligning,
          harOverordnetEnhet,
        )}
        download={`${historikkLabels.virksomhet}_Sykefraværsstatistikk.csv`}
        target={"_self"}
        onClick={onClick}
        variant="secondary"
      >
        <DownloadIcon title={"Nedlastingsikon"} fontSize="1.75rem" />
        Last ned CSV
      </Button>
    </div>
  );
};
