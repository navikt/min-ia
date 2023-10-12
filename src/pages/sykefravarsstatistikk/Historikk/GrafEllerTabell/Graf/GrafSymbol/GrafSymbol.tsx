import React, { FunctionComponent } from "react";
import classNames from "classnames";
import dynamic from "next/dynamic";

import { getFarge, getSymbol } from "../graf-utils";
import { HistorikkLabel } from "../../../../utils/sykefraværshistorikk-utils";

const SymbolSvg = dynamic(() => import("./SymbolSvg"), { ssr: false });

interface Props {
  linje: HistorikkLabel;
  className?: string;
}

export const GrafSymbol: FunctionComponent<Props> = ({ linje, className }) => (
  <SymbolSvg
    size={18}
    symbolType={getSymbol(linje)}
    fill={getFarge(linje)}
    className={classNames(className)}
  />
);
