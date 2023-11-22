import { sammenliknSykefravær } from "./vurdering-utils";
import { Statistikkategori } from "../domene/statistikkategori";
import { siste2KvartalerMock, siste4KvartalerMock } from "../mockdata";

function sykefraværVirksomhet(prosent: string) {
  return {
    statistikkategori: Statistikkategori.VIRKSOMHET,
    label: "virksomhetens navn",
    verdi: prosent,
    antallPersonerIBeregningen: 15,
    kvartalerIBeregningen: siste4KvartalerMock,
  };
}

function sykefraværBransje(prosent: string) {
  return {
    statistikkategori: Statistikkategori.BRANSJE,
    label: "bransjens navn",
    verdi: prosent,
    antallPersonerIBeregningen: 15,
    kvartalerIBeregningen: siste4KvartalerMock,
  };
}

it("sammenliknSykefravær skal gi riktig vurdering", () => {
  expect(
    sammenliknSykefravær(sykefraværVirksomhet("5.51"), sykefraværBransje("5.0"))
  ).toEqual("OVER");
  expect(
    sammenliknSykefravær(sykefraværVirksomhet("5.50"), sykefraværBransje("5.0"))
  ).toEqual("MIDDELS");
  expect(
    sammenliknSykefravær(sykefraværVirksomhet("4.5"), sykefraværBransje("5.0"))
  ).toEqual("MIDDELS");
  expect(
    sammenliknSykefravær(sykefraværVirksomhet("4.49"), sykefraværBransje("5.0"))
  ).toEqual("UNDER");
});

it("sammenliknSykefravær skal gi vurdering INGEN_DATA hvis data tilsier det", () => {
  const consoleWarnMock = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});

  expect(sammenliknSykefravær(undefined, undefined)).toEqual(
    "FEIL_ELLER_INGEN_DATA"
  );

  consoleWarnMock.mockRestore();
});

it("sammenliknSykefravær - skal gi vurdering UFULLSTENDIG_DATA hvis data tilsier det", () => {
  const bareToKvartaler = {
    ...sykefraværVirksomhet("10.0"),
    kvartalerIBeregningen: siste2KvartalerMock,
  };

  expect(
    sammenliknSykefravær(bareToKvartaler, sykefraværBransje("10.0"))
  ).toEqual("UFULLSTENDIG_DATA");
});

it("sammenliknSykefravær - skal gi vurdering MASKERT hvis data inneholder bransjetall, men ikke virksomhetstall", () => {
  expect(sammenliknSykefravær(undefined, sykefraværBransje("10.0"))).toEqual(
    "MASKERT"
  );
});
