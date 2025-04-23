import { ActionMenu, Alert, BodyShort, Button, Heading, Link } from "@navikt/ds-react";
import styles from "./TestVersjonBanner.module.css";
import DebugManager, { DebugKeys } from "../../utils/debugManager";
import { ChevronDownIcon } from "@navikt/aksel-icons";

const TestVersjonBanner = ({
  sidenavn,
  prodUrl,
  kjørerMockApp = false,
}: {
  sidenavn: string;
  prodUrl?: string;
  kjørerMockApp?: boolean;
}) => {
  if (!kjørerMockApp) return null;

  return (
    <Alert variant="warning" size="medium" className={styles.alert}>
      <Heading spacing level="2" size="small">
        Dette er en testversjon
      </Heading>
      <BodyShort>
        Her kan du bli bedre kjent med {sidenavn}.
        {prodUrl?.length ? (
          <>
            <br />
            <Link href={prodUrl}>
              Klikk her for å gå til den vanlige siden.
            </Link>
          </>
        ) : null}
      </BodyShort>
      <DebugMenu />
    </Alert>
  );
};

function DebugMenu() {
  const debugMenu = DebugManager.getInstance();
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          variant="tertiary"
          size="small"
          icon={<ChevronDownIcon />}>
          Debugvalg
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.CheckboxItem
          checked={debugMenu.getItemBoolean(DebugKeys.VIS_SE_SAMARBEID_KNAPP)}
          onCheckedChange={(checked) => {
            debugMenu.setItemBoolean(DebugKeys.VIS_SE_SAMARBEID_KNAPP, checked);
          }}
        >
          Vis &quot;Se samarbeid&quot; knapp
        </ActionMenu.CheckboxItem>
      </ActionMenu.Content>
    </ActionMenu>
  )
}

export default TestVersjonBanner;
