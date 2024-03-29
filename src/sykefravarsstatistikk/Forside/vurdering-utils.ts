import { Statistikk } from "../hooks/useSykefraværAppData";
import { parseVerdi } from "../utils/app-utils";

export type SykefraværVurdering =
  | "UNDER"
  | "MIDDELS"
  | "OVER"
  | "MASKERT"
  | "FEIL_ELLER_INGEN_DATA"
  | "UFULLSTENDIG_DATA";

export const sammenliknSykefravær = (
  statistikk?: Statistikk,
  bransjeEllerNæring?: Statistikk
): SykefraværVurdering => {
  if (statistikk === undefined && bransjeEllerNæring === undefined) {
    console.warn("Virksomhetens og bransjens tall er NaN");
    return "FEIL_ELLER_INGEN_DATA";
  }
  if (statistikk === undefined && bransjeEllerNæring !== undefined)
    return "MASKERT";

  const antallKvartaler = statistikk?.kvartalerIBeregningen.length || 0;

  if (antallKvartaler < 4) return "UFULLSTENDIG_DATA";
  if (
    statistikk?.verdi === undefined ||
    bransjeEllerNæring?.verdi === undefined
  )
    return "UFULLSTENDIG_DATA";

  const virksomhetVerdi = parseVerdi(statistikk.verdi);
  const bransjeEllerNæringVerdi = parseVerdi(bransjeEllerNæring.verdi);

  if (virksomhetVerdi > bransjeEllerNæringVerdi * 1.1) return "OVER";
  if (virksomhetVerdi < bransjeEllerNæringVerdi * 0.9) return "UNDER";
  return "MIDDELS";
};
