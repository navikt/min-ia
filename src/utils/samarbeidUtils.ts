import { FiaSamarbeidDto } from "../Samarbeid/fiaSamarbeidAPI";

export function sorterSamarbeidsliste(
  samarbeidsliste: FiaSamarbeidDto[],
): FiaSamarbeidDto[] {
  return samarbeidsliste.sort((a, b) => {
    // If ikke samme status && en av dem er AKTIV, så skal den være først
    if (a.status !== b.status) {
      if (a.status === "AKTIV") return -1;
      if (b.status === "AKTIV") return 1;
    }

    // siste item.sisteDato = max([...item.dokumenter.map(d => d.dato), item.sistEndret])
    const aSisteDato = Math.max(
      ...a.dokumenter.map((d) => new Date(d.dato).getTime()),
      new Date(a.sistEndret).getTime(),
    );
    const bSisteDato = Math.max(
      ...b.dokumenter.map((d) => new Date(d.dato).getTime()),
      new Date(b.sistEndret).getTime(),
    );

    return bSisteDato - aSisteDato;
  });
}
