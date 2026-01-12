import React, { FunctionComponent } from "react";
import classNames from "classnames";
import SymbolSvg from "./SymbolSvg"

import { getFarge, getSymbol } from "../graf-utils";
import { HistorikkLabel } from "../../../../utils/sykefraværshistorikk-utils";

interface Props {
    linje: HistorikkLabel | undefined;
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
