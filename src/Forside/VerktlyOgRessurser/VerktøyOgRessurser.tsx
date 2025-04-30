import { BodyShort, Button, Heading, HStack, Page, VStack } from "@navikt/ds-react";
import { ExternalLink } from "@navikt/ds-icons";
import React from "react";

import styles from "./verktøyOgRessurser.module.scss";

export default function VerktøyOgRessurser() {
	return (
		<Page.Block width="xl" className={styles.verktøyOgRessurser}>
			<Heading size="medium" level="2" align="center" className={styles.verktøyOgRessurserTittel}>
				Gode verktøy og ressurser
			</Heading>
			<VStack gap="4" className={styles.verktøyStack}>
				<Verktøykort lenke="" lenketekst="Arbeidsmiljøportalen">
					<b>Arbeidsmiljøportalen</b> har gode verktøy for å bedre arbeidsmiljøet
				</Verktøykort>
				<Verktøykort lenke="" lenketekst="Idébanken">
					På <b>Idébanken</b> finner du ideer, erfaringer og verktøy for bedre arbeidsmiljø og lavere sykefravær

				</Verktøykort>
				<Verktøykort lenke="" lenketekst="nav.no">
					<b>Samtalestøtten</b> gir gode råd for gjennomføring av samtaler med ansatte
				</Verktøykort>
			</VStack>
		</Page.Block>
	);
}

function Verktøykort({
	children,
	lenke,
	lenketekst,
}: {
	children: React.ReactNode;
	lenke: string;
	lenketekst: string;
}) {
	return (
		<HStack className={styles.verktøykort} justify="space-between" align="center">
			<BodyShort>{children}</BodyShort>
			<Button
				as="a"
				href={lenke}
				className={styles.lenke}
				variant="secondary"
				size="small"
				icon={<ExternalLink fontSize="1rem" aria-hidden />}
				iconPosition="right">
				{lenketekst}
			</Button>
		</HStack>
	);
}