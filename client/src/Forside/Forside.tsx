import {useAltinnOrganisasjoner} from "../hooks/useAltinnOrganisasjoner";
import {RestStatus} from "../api/rest-status";
import {sendSidevisningEvent} from "../amplitude/events";
import styles from "./forside.module.scss";

export const Forside = () => {
  const altinnOrganisasjoner = useAltinnOrganisasjoner();
    console.log("Forside skal kalle sidevisningevent")
    sendSidevisningEvent()

  return (
    <div className={styles.forside}>
      <p>
        Welcome to Min-IA, Du har tilgang til{" "}
        {altinnOrganisasjoner.status === RestStatus.Suksess
          ? altinnOrganisasjoner.data?.length
          : 0}
        organisasjoner{}
      </p>
    </div>
  );
};
