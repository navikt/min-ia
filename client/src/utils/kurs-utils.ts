import { Kurs } from "./kurs-api";
import { erSuksess, RestRessurs } from "../integrasjoner/rest-status";

export const getNesteNettkurs = (
  kursliste: RestRessurs<Kurs[]>
): Kurs | null => {
  if (!erSuksess(kursliste)) {
    return null;
  }
  const today = new Date();
  return kursliste.data
    .filter((kurs) => kurs.tema === "Inkluderende arbeidsliv (IA)")
    .filter((kurs) => kurs.start.getTime() >= today.getTime())
    .sort(
      (kurs1, kurs2) =>
        new Date(kurs1.start).getTime() - new Date(kurs2.start).getTime()
    )[0];
};

const måneder = [
  "jan",
  "feb",
  "mar",
  "apr",
  "mai",
  "jun",
  "jul",
  "aug",
  "sep",
  "okt",
  "nov",
  "des",
];

export const formatterKursdato = (kursdato: Date | undefined): string => {
  if (kursdato) {
    return `${kursdato.getDate()}. ${
      måneder[kursdato.getMonth()]
    } ${kursdato.getFullYear()} kl. ${kursdato.getHours().toLocaleString("nb", {
      minimumIntegerDigits: 2,
    })}.${kursdato
      .getMinutes()
      .toLocaleString("nb", { minimumIntegerDigits: 2 })}`;
  } else {
    return "";
  }
};
