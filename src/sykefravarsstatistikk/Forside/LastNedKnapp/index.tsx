import { Button } from "@navikt/ds-react";
import { useReactToPrint } from "react-to-print";
import React, { useRef } from "react";
import { DownloadIcon } from "@navikt/aksel-icons";
import styles from "./LastNedKnapp.module.css";
import { sendKnappEvent } from "../../../analytics/analytics";

export default function LastNedKnapp({
    innholdRef,
}: {
    innholdRef: React.RefObject<HTMLDivElement | null>;
}) {
    const lastNedKnappRef = useRef<HTMLButtonElement | null>(null);
    const printFn = useReactToPrint({
        onBeforePrint: () => {
            sendKnappEvent("skriv ut");
            return Promise.resolve();
        },
        onAfterPrint: () => {
            if (lastNedKnappRef.current) {
                if ("focus" in lastNedKnappRef.current) {
                    lastNedKnappRef.current.focus();
                }
            }
        },
        contentRef: innholdRef,
    });
    return (
        <Button
            variant="secondary"
            lang="nb"
            aria-label="Last ned sykefraværsstatistikken"
            ref={lastNedKnappRef}
            className={`${styles["last-ned-knapp"]}`}
            onClick={() => printFn()}
        >
            <DownloadIcon title={"Nedlastingsikon"} fontSize="1.75rem" />
            Last ned
        </Button>
    );
}
