"use client";
import React from "react";
import { hendelseBeskrivelseTekst } from ".";
import { Samarbeidhendelse } from "../../Samarbeidsvelger/samarbeidtyper";

// Brukes for å unngå kollisjoner i tekst på tidslinjen. Om det er overlapp vil teksten skjules.
export function useTekstplasseringer(
  transformerteHendelser: { prosent: number; hendelse: Samarbeidhendelse }[],
  tidslinjeBredde: number,
): Array<{
  start: number;
  end: number;
  width: number;
}> {
  return React.useMemo(() => {
    const tekstplasseringer: Array<{
      start: number;
      end: number;
      width: number;
    }> = [];

    for (let i = 0; i < transformerteHendelser.length; i++) {
      const { hendelse, prosent } = transformerteHendelser[i];
      const beskrivelse = hendelseBeskrivelseTekst(hendelse);
      const width = getTextWidth(
        `${beskrivelse.boldText}: ${beskrivelse.normalText}`,
      );

      if ((prosent * tidslinjeBredde) / 100 < width / 2) {
        tekstplasseringer.push({
          start: Math.floor((prosent * tidslinjeBredde) / 100),
          end: Math.ceil((prosent * tidslinjeBredde) / 100 + width),
          width,
        });
      } else if (
        (prosent * tidslinjeBredde) / 100 >
        tidslinjeBredde - width / 2
      ) {
        tekstplasseringer.push({
          start: Math.floor((prosent * tidslinjeBredde) / 100 - width),
          end: Math.ceil((prosent * tidslinjeBredde) / 100),
          width,
        });
      } else {
        tekstplasseringer.push({
          start: Math.floor((prosent * tidslinjeBredde) / 100 - width / 2),
          end: Math.ceil((prosent * tidslinjeBredde) / 100 + width / 2),
          width,
        });
      }
    }

    return tekstplasseringer;
  }, [transformerteHendelser, tidslinjeBredde]);
}

function getTextWidth(text: string) {
  if (typeof document === "undefined") {
    return 200; // Fallback
  }
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return 0; // Fallback
  }

  context.font = getComputedStyle(document.body).font.replace(
    /\d\dpx/g,
    "14px",
  );

  return context.measureText(text).width;
}
