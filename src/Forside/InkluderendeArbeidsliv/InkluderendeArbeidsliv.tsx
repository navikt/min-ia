import { Bleed, BodyShort, Heading, HStack, Link, List, Page, VStack } from '@navikt/ds-react';
import Image from 'next/image';

import styles from './inkluderendeArbeidsliv.module.scss';
import IALogo from './ia_logo.png';
import { ExternalLink } from '@navikt/ds-icons';
import { IA_REGJERINGEN_URL } from '../../utils/konstanter';

export default function InkluderendeArbeidsliv() {
	return (
		<Bleed className={styles.inkluderendeArbeidsliv__bleed}>
			<Page.Block width="xl" className={styles.inkluderendeArbeidsliv}>
				<HStack gap="2" wrap className={styles.inkluderendeArbeidsliv__hs}>
					<VStack gap="4" className={styles.inkluderendeArbeidsliv__vs}>
						<Heading size="large" level="2">
							Inkluderende arbeidsliv
						</Heading>
						<BodyShort>
							Partene i arbeidslivet har laget en intensjonsavtale for å redusere sykefraværet og hindre frafall fra arbeidslivet.
						</BodyShort>
						<span>
							<BodyShort weight="semibold" className={styles.inkluderendeArbeidsliv__listetittel}>
								Navs innsatsområder i avtalen:
							</BodyShort>
							<List as="ul">
								<List.Item>Få tilskudd til ekspertbistand</List.Item>
								<List.Item>Få hjelp til å redusere sykefraværet</List.Item>
							</List>
						</span>
						<Link href={IA_REGJERINGEN_URL} target="_blank">
							Les mer om IA-avtalen på sidene til regjeringen <ExternalLink fontSize="1rem" aria-hidden />
						</Link>
					</VStack>
					<div className={styles.inkluderendeArbeidsliv__logo__container}>
						<Image src={IALogo} alt="Logo for Inkluderende arbeidsliv" className={styles.inkluderendeArbeidsliv__logo} />
					</div>
				</HStack>
			</Page.Block>
		</Bleed>
	);
}