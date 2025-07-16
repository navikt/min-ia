import SpørreundersøkelseRad, { Spørreundersøkelse } from "../../../komponenter/Spørreundersøkelsesresultat/SpørreundersøkelseRad";

export default function Kartlegginger({ kartlegginger }: { kartlegginger: Spørreundersøkelse[] }) {
	return kartlegginger
		.sort(({ opprettetTidspunkt: opprettetA }, { opprettetTidspunkt: opprettetB }) => opprettetB.valueOf() - opprettetA.valueOf())
		.map((kartlegging, index) => (
			<SpørreundersøkelseRad
				key={kartlegging.id}
				spørreundersøkelse={kartlegging}
				dato={kartlegging.opprettetTidspunkt.toLocaleDateString("no-NO")}
				defaultOpen={index === 0} // Åpne første rad som standard
			/>
		));
}