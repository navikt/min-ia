import { Lenkeflis } from "../../Lenkeflis/Lenkeflis";

export const InngangTilSykefraværsstatistikk = (props: {
  sykefravarsstatistikkUrl: string;
  useMobileVersion: boolean;
}) => {
  return (
    <Lenkeflis
      overskrift={"Se statistikk"}
      brødtekst={
        "Ved å sammenligne dere med andre og vite årsakene til fraværet, kan dere forebygge og redusere sykefravær."
      }
      href={props.sykefravarsstatistikkUrl}
      visBrødtekstPåMobil={true}
      infographicLenkeflis={true}
    />
  );
};
