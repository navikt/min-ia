import { ActionMenu, Bleed, Button, Label, Page } from "@navikt/ds-react";
import React from "react";
import styles from "./Samarbeidsvelger.module.scss";
import { useSamarbeidsvelgerContext } from "./SamarbeidsvelgerContext";
import { SamarbeidsStatusBadge } from "../SamarbeidsStatusBadge";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { sorterSamarbeidsliste } from "../../utils/samarbeidUtils";
import { FiaSamarbeidDto } from "../fiaSamarbeidAPI";

export default function Samarbeidsvelger() {
  const { tilgjengeligeSamarbeid, valgtSamarbeid, setValgtSamarbeid } =
    useSamarbeidsvelgerContext();

  return (
    <Bleed className={styles.samarbeidsvelgerBleed}>
      <Page.Block className={styles.innhold}>
        <Samarbeidsdropdown
          tilgjengeligeSamarbeid={tilgjengeligeSamarbeid}
          valgtSamarbeid={valgtSamarbeid}
          setValgtSamarbeid={setValgtSamarbeid}
        />
      </Page.Block>
    </Bleed>
  );
}

function Samarbeidsdropdown({
  tilgjengeligeSamarbeid,
  valgtSamarbeid,
  setValgtSamarbeid,
}: {
  tilgjengeligeSamarbeid: FiaSamarbeidDto[];
  valgtSamarbeid?: string;
  setValgtSamarbeid: (value: string) => void;
}) {
  const sorterteSamarbeid = React.useMemo(
    () => sorterSamarbeidsliste(tilgjengeligeSamarbeid),
    [tilgjengeligeSamarbeid],
  );

  const valgtSamarbeidObjekt = tilgjengeligeSamarbeid.find(
    (s) => s.offentligId === valgtSamarbeid,
  );

  return (
    <ActionMenu>
      <Label htmlFor="samarbeidsvelger">Velg samarbeid</Label>
      <ActionMenu.Trigger>
        <Button
          id="samarbeidsvelger"
          variant="secondary-neutral"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
          size="small"
          className={styles.menyknapp}
        >
          {valgtSamarbeidObjekt ? valgtSamarbeidObjekt.navn : "Velg samarbeid"}
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content className={styles.samarbeidsvelgermeny}>
        {sorterteSamarbeid.map((samarbeid) => (
          <ActionMenu.Item
            key={samarbeid.offentligId}
            className={styles.menyItem}
            onSelect={() => setValgtSamarbeid(samarbeid.offentligId)}
          >
            {samarbeid.navn} <SamarbeidsStatusBadge status={samarbeid.status} />
          </ActionMenu.Item>
        ))}
      </ActionMenu.Content>
    </ActionMenu>
  );
}
