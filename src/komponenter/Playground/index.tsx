import React from "react";
import styles from "./Playground.module.scss";
import SpørreundersøkelseRad from "../Spørreundersøkelsesresultat/SpørreundersøkelseRad";
import { dummyBehovsvurderinger } from "./dummyData";
import Samarbeidsvelger from "../Samarbeidsvelger";
import { SamarbeidsvelgerProvider } from "../Samarbeidsvelger/SamarbeidsvelgerContext";

export default function Playground() {
	return (
		<SamarbeidsvelgerProvider>
			<div className={styles.wrapper}>
				<Samarbeidsvelger />
				<div className={styles.innhold}>
					{
						dummyBehovsvurderinger.map((behovsvurdering, index) => (
							<SpørreundersøkelseRad
								key={behovsvurdering.id}
								spørreundersøkelse={behovsvurdering}
								dato={behovsvurdering.opprettetTidspunkt.toLocaleDateString("no-NO")}
								defaultOpen={index === 0} // Åpne første rad som standard
							/>
						))
					}
				</div>
			</div>
		</SamarbeidsvelgerProvider>
	);
};
