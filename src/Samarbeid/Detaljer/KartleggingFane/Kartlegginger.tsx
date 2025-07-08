import SpørreundersøkelseRad, { Spørreundersøkelse } from "../../../komponenter/Spørreundersøkelsesresultat/SpørreundersøkelseRad";

export default function Kartlegginger({ behovsvurderinger }: { behovsvurderinger: Spørreundersøkelse[] }) {
	return behovsvurderinger.map((behovsvurdering, index) => (
		<SpørreundersøkelseRad
			key={behovsvurdering.id}
			spørreundersøkelse={behovsvurdering}
			dato={behovsvurdering.opprettetTidspunkt.toLocaleDateString("no-NO")}
			defaultOpen={index === 0} // Åpne første rad som standard
		/>
	));
}