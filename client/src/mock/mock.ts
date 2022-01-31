import fetchMock, {
  MockMatcher,
  MockOptionsMethodGet,
  MockRequest,
  MockResponse,
  MockResponseFunction,
} from "fetch-mock";
import { AltinnOrganisasjon } from "../api/altinnorganisasjon-api";

let delayfaktor = 0;

const fleskOgFisk: AltinnOrganisasjon[] = [
  {
    Name: "FLESK OG FISK AS",
    Type: "Enterprise",
    OrganizationNumber: "111111111",
    OrganizationForm: "AS",
    Status: "Active",
    ParentOrganizationNumber: "",
  },
];

const mockGetAndLog = (
  matcher: MockMatcher,
  response: MockResponse | MockResponseFunction,
  options?: MockOptionsMethodGet
): fetchMock.FetchMockStatic => {
  let responseFunction: MockResponseFunction;
  if (response instanceof Function) {
    responseFunction = (url: string, opts: MockRequest) => {
      const responseValue = response(url, opts);
      console.log("%c" + url, "color:lightblue;font-weight:bold;", {
        response: responseValue,
      });
      return responseValue;
    };
  } else {
    responseFunction = (url) => {
      console.log("%c" + url, "color:lightblue;font-weight:bold;", {
        response,
      });
      return response;
    };
  }
  return fetchMock.get(matcher, responseFunction, options);
};

mockGetAndLog("/min-ia/api/organisasjoner", fleskOgFisk, {
  delay: 1000 * delayfaktor,
});

fetchMock.spy();
