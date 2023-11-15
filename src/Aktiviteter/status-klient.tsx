import { StatusType } from "./AktivitetData";

export const oppdaterStatus = async (
  aktivitetId: string,
  orgnr: string,
  status: StatusType
) => {
  return await fetch(
    `forebygge-fravar/api/aktivitet/${aktivitetId}/orgnr/${orgnr}/oppdater`,
    {
      method: "POST",
      body: JSON.stringify({ status, aktivitetstype: "OPPGAVE" }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
