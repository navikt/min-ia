import { dummyBehovsvurderinger } from "../../dummyData";
import Kartlegginger from "./Kartlegginger";

export default function KartleggingFane() {
	return (
		<Kartlegginger kartlegginger={dummyBehovsvurderinger} />
	);
}
