import styles from "./StatistikkPanel.module.scss";
import { Panel, Tooltip } from "@navikt/ds-react";

interface StatistikkPanelProps {
  trend?: string;
  sykefravær: string;
  tittel: string;
  tooltip: string;
}

export const StatistikkPanel = ({
  sykefravær,
  tittel,
  trend,
  tooltip,
}: StatistikkPanelProps) => {
  return (
    <Tooltip content={tooltip}>
      <Panel className={`${styles.statistikk}`}>
        <span>{tittel}</span>
        <span className={styles.prosent}>{`${sykefravær.replace(
          ".",
          ","
        )}%`}</span>
        <span>{trendBeskrivelse(trend)}</span>
      </Panel>
    </Tooltip>
  );
};

const trendBeskrivelse = (trend: string | undefined): string => {
  const trendNummer = Number(trend);
  if (Number.isNaN(trendNummer) || trendNummer === 0) {
    return "uendret trend";
  } else if (trendNummer < 0) {
    return "synkende trend";
  } else return "stigende trend";
};
