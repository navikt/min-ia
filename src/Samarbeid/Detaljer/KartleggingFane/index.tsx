import { dummyBehovsvurderinger } from "../../dummyData";
import Kartlegginger from "./Kartlegginger";

export default function BehovsvurderingFane() {
	return (
		<Kartlegginger behovsvurderinger={dummyBehovsvurderinger} />
	);
}
