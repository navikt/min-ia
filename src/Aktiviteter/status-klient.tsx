import { StatusType } from "./AktivitetData";
import { API_BASE_PATH } from "../utils/konstanter";
import { erGyldigOrgnr } from "../hooks/useOrgnr";

export const oppdaterStatus = async (
  aktivitetId: string,
  orgnr: string,
  status: StatusType
) => {
  if (!erGyldigOrgnr(orgnr)) {
    throw new Error("Ugyldig orgnr ved oppdatering av aktivitetstatus");
  }

  return await fetch(
      `${API_BASE_PATH}/aktivitet/${aktivitetId}/orgnr/${orgnr}/oppdater`,
    {
      method: "POST",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
