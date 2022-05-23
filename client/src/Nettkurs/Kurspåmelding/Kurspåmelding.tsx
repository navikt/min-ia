import { FunctionComponent } from "react";
import { Kurs } from "../../utils/kurs-api";
import {Lenkepanel, LenkepanelProps} from "../../komponenter/Lenkepanel/Lenkepanel";
import {KursKalenderIkon} from "../ikoner/KursKalenderIkon";


export interface Kurspåmelding  {
    tittel: string;
    undertekst: string;
    undertekstUtenKurs: string;
    lenke: LenkepanelProps;
}
interface Props{
kurspåmelding:Kurspåmelding|null;
nesteNettkurs:Kurs| undefined;
}
export const Kurspåmelding: FunctionComponent<Props> = ({ kurspåmelding,nesteNettkurs }: Props) => {
  return <>{
      nesteNettkurs&&kurspåmelding!==null?
      <>
          <div>{kurspåmelding.tittel}</div>
          <div>
              {kurspåmelding.undertekst}</div>
          <Lenkepanel
              tittel={kurspåmelding.lenke.tittel}
              ikon={KursKalenderIkon}
              href={kurspåmelding.lenke.href}
          /></>:<div>{kurspåmelding?.undertekstUtenKurs}</div>
  }</>;
};
