import { Lenkeflis } from "../../Lenkeflis/Lenkeflis";
import {DataFilled} from "@navikt/ds-icons";

export const InngangTilSykefraværsstatistikk = (props: {
  sykefravarsstatistikkUrl: string;
  useMobileVersion: boolean;
}) => {
  return (
    <Lenkeflis
      overskrift={"Sykefraværsstatistikken"}
      href={props.sykefravarsstatistikkUrl}
      infographicLenkeflis={true}
      ikon={ikon()}
    />
  );
};

const ikon = () => {
  return <DataFilled/>
}
