import React from "react";
import Samarbeidsvelger from ".";
import { SamarbeidsvelgerProvider } from "./SamarbeidsvelgerContext";
import { act, render, screen, waitFor } from "@testing-library/react";
import { OrgnrProvider } from "../../utils/OrgnrContext";
import { fiaSamarbeidMock } from "../../local/fia-samarbeidMock";
import { axe } from "jest-axe";
import { RestStatus } from "../../integrasjoner/rest-status";
import { penskrivIAStatus } from "../SamarbeidsStatusBadge";
import { SamarbeidStatus } from "./samarbeidtyper";
import { sendSamarbeidValgtEvent } from "../../utils/analytics/analytics";
import { useFiaSamarbeid } from "../fiaSamarbeidAPI";

jest.mock("../../utils/analytics/analytics");

const mockdata = fiaSamarbeidMock();

jest.mock("../fiaSamarbeidAPI", () => ({
  useFiaSamarbeid: jest.fn(() => ({
    status: RestStatus.Suksess,
    data: mockdata,
  })),
}));
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: {
        bedrift: "123456789",
      },
      asPath: "",
      replace: jest.fn(),
    };
  },
}));
jest.mock("next/navigation", () => ({
  useSearchParams: () => {
    return {
      get: (key: string) => {
        if (key === "bedrift") {
          return "123456789";
        }
        return null;
      },
      toString: () => "bedrift=123456789",
      size: 1,
      delete: () => {},
    };
  },
}));

describe("Samarbeidsvelger", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Render uten å krasje", () => {
    let valgtSamarbeid = `${mockdata[0].offentligId}`;

    const { container } = render(
      <OrgnrProvider>
        <SamarbeidsvelgerProvider
          samarbeidOffentligId={valgtSamarbeid}
          setSamarbeidOffentligId={(offentligId: string) => {
            valgtSamarbeid = offentligId;
          }}
        >
          <Samarbeidsvelger />
        </SamarbeidsvelgerProvider>
      </OrgnrProvider>,
    );
    expect(container).toBeInTheDocument();
  });

  it("Endrer verdi ved klikk", async () => {
    let valgtSamarbeid = mockdata[0].offentligId;

    const { container } = render(
      <OrgnrProvider>
        <SamarbeidsvelgerProvider
          samarbeidOffentligId={valgtSamarbeid}
          setSamarbeidOffentligId={(offentligId: string) => {
            valgtSamarbeid = offentligId;
          }}
        >
          <Samarbeidsvelger />
        </SamarbeidsvelgerProvider>
      </OrgnrProvider>,
    );
    expect(container).toBeInTheDocument();

    const knapper = container.querySelectorAll("button");
    expect(knapper.length).toBeGreaterThan(0);
    expect(knapper[0]).toBeInTheDocument();
    expect(knapper[0].textContent).toBe(mockdata[0].navn);

    act(() => knapper[0].click());
    const samarbeid2 = await waitFor(() => screen.getByText(mockdata[2].navn));

    expect(samarbeid2).toBeInTheDocument();

    act(() => samarbeid2.click());

    expect(valgtSamarbeid).toBe(mockdata[2].offentligId);
    waitFor(() => {
      return expect(screen.getByText(mockdata[2].navn)).toBeInTheDocument();
    });
  });

  it("Viser riktig status for samarbeid", async () => {
    let valgtSamarbeid = ``;
    const { container } = render(
      <OrgnrProvider>
        <SamarbeidsvelgerProvider
          samarbeidOffentligId={valgtSamarbeid}
          setSamarbeidOffentligId={(offentligId: string) => {
            valgtSamarbeid = offentligId;
          }}
        >
          <Samarbeidsvelger />
        </SamarbeidsvelgerProvider>
      </OrgnrProvider>,
    );

    expect(container).toBeInTheDocument();

    const knapper = container.querySelectorAll("button");
    expect(knapper.length).toBeGreaterThan(0);
    act(() => knapper[0].click());

    const samarbeid1 = await waitFor(() =>
      screen.getByRole("menuitem", {
        name: `${mockdata[0].navn} ${penskrivIAStatus(mockdata[0].status as SamarbeidStatus)}`,
      }),
    );
    expect(samarbeid1).toBeInTheDocument();

    for (const samarbeid of mockdata) {
      const status = penskrivIAStatus(samarbeid.status as SamarbeidStatus);
      expect(
        screen.getByRole("menuitem", { name: `${samarbeid.navn} ${status}` }),
      ).toBeInTheDocument();
    }
  });

  it("Sender metrikk ved valg av samarbeid", async () => {
    expect(sendSamarbeidValgtEvent).not.toHaveBeenCalled();
    let valgtSamarbeid = `${mockdata[0].offentligId}`;
    const { container } = render(
      <OrgnrProvider>
        <SamarbeidsvelgerProvider
          samarbeidOffentligId={valgtSamarbeid}
          setSamarbeidOffentligId={(offentligId: string) => {
            valgtSamarbeid = offentligId;
          }}
        >
          <Samarbeidsvelger />
        </SamarbeidsvelgerProvider>
      </OrgnrProvider>,
    );
    expect(container).toBeInTheDocument();

    const knapper = container.querySelectorAll("button");
    expect(knapper.length).toBeGreaterThan(0);
    expect(knapper[0]).toBeInTheDocument();
    expect(knapper[0].textContent).toBe(mockdata[0].navn);

    act(() => knapper[0].click());
    const samarbeid2 = await waitFor(() => screen.getByText(mockdata[2].navn));
    expect(samarbeid2).toBeInTheDocument();

    act(() => samarbeid2.click());

    expect(sendSamarbeidValgtEvent).toHaveBeenCalledTimes(1);
    expect(sendSamarbeidValgtEvent).toHaveBeenCalledWith(mockdata[2].status);
  });

  it("Sorterer aktive samarbeid først", async () => {
    (useFiaSamarbeid as jest.Mock).mockImplementationOnce(() => ({
      status: RestStatus.Suksess,
      data: [
        {
          ...mockdata[2],
          status: "AKTIV",
          sistEndret: "2024-01-01T12:00:00Z",
          dokumenter: [],
        },
        {
          ...mockdata[0],
          status: "FULLFØRT",
          sistEndret: "2024-02-02T12:00:00Z",
          dokumenter: [],
        },
        {
          ...mockdata[1],
          status: "AKTIV",
          sistEndret: "2024-03-03T12:00:00Z",
          dokumenter: [],
        },
      ],
    }));

    const { container } = render(
      <OrgnrProvider>
        <SamarbeidsvelgerProvider
          samarbeidOffentligId={mockdata[0].offentligId}
          setSamarbeidOffentligId={() => null}
        >
          <Samarbeidsvelger />
        </SamarbeidsvelgerProvider>
      </OrgnrProvider>,
    );

    expect(container).toBeInTheDocument();

    const knapper = container.querySelectorAll("button");
    expect(knapper.length).toBeGreaterThan(0);
    expect(knapper[0]).toBeInTheDocument();
    expect(knapper[0].textContent).toBe(mockdata[0].navn);

    act(() => knapper[0].click());
    const samarbeidItems = await waitFor(() => screen.getAllByRole("menuitem"));

    expect(samarbeidItems.length).toBe(3);

    expect(samarbeidItems[0].textContent).toContain(mockdata[1].navn); // AKTIV, sistEndret 2024-03-03
    expect(samarbeidItems[1].textContent).toContain(mockdata[2].navn); // AKTIV, sistEndret 2024-01-01
    expect(samarbeidItems[2].textContent).toContain(mockdata[0].navn); // FULLFØRT, sistEndret 2024-02-02
  });

  it("Sorterer på dato innenfor samme status", async () => {
    (useFiaSamarbeid as jest.Mock).mockImplementationOnce(() => ({
      status: RestStatus.Suksess,
      data: [
        {
          ...mockdata[0],
          status: "AKTIV",
          sistEndret: "2024-01-01T12:00:00Z",
          dokumenter: [],
        },
        {
          ...mockdata[1],
          status: "AKTIV",
          sistEndret: "2024-03-03T12:00:00Z",
          dokumenter: [],
        },
        {
          ...mockdata[2],
          status: "AKTIV",
          sistEndret: "2024-02-02T12:00:00Z",
          dokumenter: [],
        },
      ],
    }));

    const { container } = render(
      <OrgnrProvider>
        <SamarbeidsvelgerProvider
          samarbeidOffentligId={mockdata[0].offentligId}
          setSamarbeidOffentligId={() => null}
        >
          <Samarbeidsvelger />
        </SamarbeidsvelgerProvider>
      </OrgnrProvider>,
    );

    expect(container).toBeInTheDocument();

    const knapper = container.querySelectorAll("button");
    expect(knapper.length).toBeGreaterThan(0);
    expect(knapper[0]).toBeInTheDocument();
    expect(knapper[0].textContent).toBe(mockdata[0].navn);

    act(() => knapper[0].click());
    const samarbeidItems = await waitFor(() => screen.getAllByRole("menuitem"));

    expect(samarbeidItems.length).toBe(3);
    expect(samarbeidItems[0].textContent).toContain(mockdata[1].navn); // sistEndret 2024-03-03
    expect(samarbeidItems[1].textContent).toContain(mockdata[2].navn); // sistEndret 2024-02-02
    expect(samarbeidItems[2].textContent).toContain(mockdata[0].navn); // sistEndret 2024-01-01
  });

  it("Sorterer basert på dokumentdato når nyere enn sistEndret", async () => {
    (useFiaSamarbeid as jest.Mock).mockImplementationOnce(() => ({
      status: RestStatus.Suksess,
      data: [
        {
          ...mockdata[0],
          status: "AKTIV",
          sistEndret: "2024-01-01T12:00:00Z",
          dokumenter: [{ dato: "2024-05-05T12:00:00Z" }],
        },
        {
          ...mockdata[1],
          status: "AKTIV",
          sistEndret: "2024-02-02T12:00:00Z",
          dokumenter: [],
        },
        {
          ...mockdata[2],
          status: "AKTIV",
          sistEndret: "2024-03-03T12:00:00Z",
          dokumenter: [{ dato: "2024-01-01T12:00:00Z" }],
        },
        {
          ...mockdata[3],
          status: "AKTIV",
          sistEndret: "2024-04-04T12:00:00Z",
          dokumenter: [],
        },
      ],
    }));

    const { container } = render(
      <OrgnrProvider>
        <SamarbeidsvelgerProvider
          samarbeidOffentligId={mockdata[0].offentligId}
          setSamarbeidOffentligId={() => null}
        >
          <Samarbeidsvelger />
        </SamarbeidsvelgerProvider>
      </OrgnrProvider>,
    );

    expect(container).toBeInTheDocument();

    const knapper = container.querySelectorAll("button");
    expect(knapper.length).toBeGreaterThan(0);
    expect(knapper[0]).toBeInTheDocument();
    expect(knapper[0].textContent).toBe(mockdata[0].navn);

    act(() => knapper[0].click());
    const samarbeidItems = await waitFor(() => screen.getAllByRole("menuitem"));

    expect(samarbeidItems.length).toBe(4);
    expect(samarbeidItems[0].textContent).toContain(mockdata[0].navn); // dokumentdato 2024-05-05
    expect(samarbeidItems[1].textContent).toContain(mockdata[3].navn); // sistEndret 2024-04-04
    expect(samarbeidItems[2].textContent).toContain(mockdata[2].navn); // sistEndret 2024-03-03
    expect(samarbeidItems[3].textContent).toContain(mockdata[1].navn); // sistEndret 2024-02-02
  });

  it("Ingen UU-feil fra axe", async () => {
    let valgtSamarbeid = `${mockdata[0].offentligId}`;

    const { container } = render(
      <OrgnrProvider>
        <SamarbeidsvelgerProvider
          samarbeidOffentligId={valgtSamarbeid}
          setSamarbeidOffentligId={(offentligId: string) => {
            valgtSamarbeid = offentligId;
          }}
        >
          <Samarbeidsvelger />
        </SamarbeidsvelgerProvider>
      </OrgnrProvider>,
    );
    expect(container).toBeInTheDocument();

    //uten åpen meny
    expect(await axe(container)).toHaveNoViolations();

    const knapper = container.querySelectorAll("button");
    expect(knapper.length).toBeGreaterThan(0);
    act(() => knapper[0].click());

    const samarbeid1 = await waitFor(() =>
      screen.getByRole("menuitem", {
        name: `${mockdata[0].navn} ${penskrivIAStatus(mockdata[0].status as SamarbeidStatus)}`,
      }),
    );
    expect(samarbeid1).toBeInTheDocument();

    //med åpen meny
    expect(await axe(container)).toHaveNoViolations();
  });
});
