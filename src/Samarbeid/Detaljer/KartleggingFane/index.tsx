import { useDokumenterPåValgtSamarbeid } from "../../Samarbeidsvelger/SamarbeidsvelgerContext";
import Kartlegginger from "./Kartlegginger";

export default function KartleggingFane() {
	const dokumenter = useDokumenterPåValgtSamarbeid();

	return (
		<Kartlegginger dokumenter={dokumenter} />
	);
}
