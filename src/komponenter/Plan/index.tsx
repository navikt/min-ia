import React from "react";
import { PlanType } from "./typer";
import styles from "./plan.module.scss";
import {
  Alert,
  BodyShort,
  Heading,
  HStack,
  Skeleton,
  VStack,
} from "@navikt/ds-react";
import PlanGraf from "./PlanGraf";
import Innholdsblokk from "./Innholdsblokk";

export default function Plan({ plan }: { plan: PlanType }) {
  const filtrerteTemaer = plan.temaer
    .filter((tema) => tema.inkludert)
    .sort((a, b) => {
      return a.id - b.id;
    });
  const sisteEndring = useSisteEndring(plan);

  return (
    <>
      {filtrerteTemaer.map((tema) => (
        <div className={styles.planContainer} key={tema.id}>
          <HStack justify="space-between" align="center">
            <Heading level="3" size="medium" spacing>
              {tema.navn}
            </Heading>
            <BodyShort>Oppdatert {sisteEndring}</BodyShort>
          </HStack>
          <PlanGraf undertemaer={tema.undertemaer} aria-hidden />
          <Innholdsblokk tema={tema} />
        </div>
      ))}
    </>
  );
}

export function PlanSkeleton() {
  return (
    <div
      className={styles.planContainer}
      style={{ paddingBottom: "1.2rem" }}
      data-testid="plan-skeleton"
    >
      <HStack justify="space-between" align="center">
        <Skeleton width="10rem" height="2rem" />
        <Skeleton width="10rem" height="2rem" />
      </HStack>
      <VStack>
        <HStack justify="end" align="center">
          <Skeleton width="calc(100% - 12rem)" height="3rem" />
        </HStack>
        <HStack
          justify="space-between"
          align="center"
          style={{ marginTop: "-0.5rem" }}
        >
          <Skeleton width="11rem" height="2rem" />
          <Skeleton
            variant="rounded"
            width="calc(100% - 12rem)"
            height="2.5rem"
          />
        </HStack>
        <Skeleton width="100%" height="3rem" style={{ marginTop: "1.5rem" }} />
        <Skeleton width="100%" height="5rem" style={{ marginTop: "-1rem" }} />
      </VStack>
    </div>
  );
}

export function IngenPlanTilgjengelig() {
  return (
    <Alert inline variant="info" data-testid="ingen-plan-tilgjengelig">
      Samarbeidsplan er ikke publisert
    </Alert>
  );
}

export function PlanFeil() {
  return (
    <Alert variant="error" data-testid="plan-feil">
      Det oppstod en feil ved henting av samarbeidsplan. Vennligst prøv igjen
      senere.
    </Alert>
  );
}

function useSisteEndring(plan: PlanType) {
  return React.useMemo(() => {
    const sisteEndring = new Date(plan.sistEndret);
    const sistePublisert = new Date(plan.sistPublisert);

    return (
      sisteEndring > sistePublisert ? sisteEndring : sistePublisert
    ).toLocaleDateString("nb-NO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, [plan.sistEndret, plan.sistPublisert]);
}
