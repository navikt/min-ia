import { StatusType } from "./AktivitetData";
import {API_BASE_PATH} from "../utils/konstanter";

export const oppdaterStatus = async (
  aktivitetId: string,
  orgnr: string,
  status: StatusType
) => {
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
