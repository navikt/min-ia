import { render, screen } from "@testing-library/react";
import { StatistikkPanel } from "./StatistikkPanel";
import { axe } from "jest-axe";

describe("StatistikkPanel", () => {
  it("Har ingen axe feil når bakgrunn er hvit", async () => {
    const { container } = render(
      <StatistikkPanel
        sykefravær="10"
        tittel="Sykefravær i virksomhet"
        tooltip="Din virksomhet"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Har ingen axe feil når bakgrunn er grå", async () => {
    const { container } = render(
      <StatistikkPanel
        sykefravær="10"
        tittel="Sykefravær i virksomhet"
        tooltip="Din virksomhet"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Viser 'uendret trend' når trend ikke er gitt til komponenten", async () => {
    render(
      <StatistikkPanel
        sykefravær="10"
        tittel="Sykefravær i virksomhet"
        tooltip="Din virksomhet"
      />,
    );
    expect(screen.getByText("uendret trend")).toBeInTheDocument();
  });

  it("Viser stigende trend", async () => {
    render(
      <StatistikkPanel
        sykefravær="10"
        tittel="Sykefravær i virksomhet"
        tooltip="Din virksomhet"
        trend="2"
      />,
    );
    expect(screen.getByText("stigende trend")).toBeInTheDocument();
  });

  it("Viser synkende trend", async () => {
    render(
      <StatistikkPanel
        sykefravær="10"
        tittel="Sykefravær i virksomhet"
        tooltip="Din virksomhet"
        trend="-2"
      />,
    );
    expect(screen.getByText("synkende trend")).toBeInTheDocument();
  });
});
