import { StatusType } from "./AktivitetData";

export const oppdaterStatus = async (
  aktivitetId: string,
  orgnr: string,
  status: StatusType
) => {
  return await fetch(
    `forebyggingsplan/api/aktivitet/${aktivitetId}/orgnr/${orgnr}/oppdater`,
    {
      method: "POST",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
