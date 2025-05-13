import { Calculator } from "@navikt/ds-icons";
import { BodyShort, Button, Heading, Page } from "@navikt/ds-react";
import styles from "./fraværskalkulator.module.scss";

export default function Fraværskalkulator() {
	return (
		<Page.Block width="xl">
			<div className={styles.fraværskalkulator_brick}>
				<Heading size="medium" level="2">
					Fraværskalkulatoren
				</Heading>
				<BodyShort>
					Beregn hvor mye sykefraværet koster og sett mål for sykefraværet
				</BodyShort>
				<Button
					icon={<Calculator aria-hidden />}
					variant="secondary"
					role="link"
					as="a"
					href="/forebygge-fravar/kalkulator"
					className={styles.fraværskalkulator_lenke}>
					Fraværskalkulator
				</Button>
			</div>
		</Page.Block>
	);
}