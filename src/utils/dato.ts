const dateFormatDato = new Intl.DateTimeFormat("nb-NO", {
  dateStyle: "short",
});

export const nbNoPrintDato = (input: Date) =>
  dateFormatDato.format(new Date(input));
