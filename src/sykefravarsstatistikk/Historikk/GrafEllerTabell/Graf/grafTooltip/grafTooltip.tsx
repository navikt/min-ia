import React from "react";
import { Tooltip } from "recharts";
import styles from "./grafTooltip.module.css";
import { getTooltipsnavn } from "../graf-utils";
import { GrafSymbol } from "../GrafSymbol/GrafSymbol";
import { HistorikkLabel } from "../../../../utils/sykefraværshistorikk-utils";

const grafTooltip = () => (
  <Tooltip
    formatter={(value: number, name: HistorikkLabel) => [
      <span className={styles["tooltip__item-wrapper"]} key={`tooltip-${name}`}>
        <GrafSymbol linje={name} className={styles["tooltip__ikon"]} />
        <div className={styles["tooltip__item-navn-og-verdi"]}>
          <span className={styles["tooltip__item-navn"]}>
            {getTooltipsnavn(name)}
          </span>
          <span className={styles["tooltip__item-verdi"]}>{value + " %"}</span>
        </div>
      </span>,
    ]}
    allowEscapeViewBox={{ x: true, y: true }}
    contentStyle={{ border: "2px solid #254B6D", borderRadius: "0.25rem" }}
    labelStyle={{ paddingBottom: "0.5rem" }}
    itemStyle={{ paddingTop: 0, paddingBottom: 0 }}
    cursor={{ stroke: "#254B6D", strokeWidth: 3, type: "dot" }}
  />
);

export default grafTooltip;
