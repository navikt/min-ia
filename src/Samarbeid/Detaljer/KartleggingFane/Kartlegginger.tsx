import SpørreundersøkelseRad from "../../../komponenter/Spørreundersøkelsesresultat/SpørreundersøkelseRad";
import { FiaSamarbeidDokument } from "../../fiaSamarbeidAPI";

export default function Kartlegginger({ dokumenter }: { dokumenter: FiaSamarbeidDokument[] }) {
	return dokumenter
		.sort(({ dato: opprettetA }, { dato: opprettetB }) => opprettetB.valueOf() - opprettetA.valueOf())
		.map((dokument) => (
			<SpørreundersøkelseRad
				key={dokument.dokumentId}
				dato={new Date(dokument.dato).toLocaleDateString("no-NO")}
				dokument={dokument}
			/>
		));
}