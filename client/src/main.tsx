import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  injectDecoratorClientSide,
  setBreadcrumbs,
  setParams,
} from "@navikt/nav-dekoratoren-moduler";
import {navDefaultAmplitudeClient} from "./amplitude/client";

const init = async () => {
  await injectDecoratorClientSide({
    env: import.meta.env.prod ? "prod" : "dev",
  });

  await setBreadcrumbs([
    {
      title: "Min side arbeidsgiver",
      url: "https://arbeidsgiver.nav.no/min-side-arbeidsgiver",
    },
    {
      title: "Forebygge sykefravær ",
      url: "https://arbeidsgiver.nav.no/min-ia/",
    },
  ]);

  await setParams({
    context: "arbeidsgiver",
    simple: false,
    chatbot: false,
  });

  ReactDOM.render(
    <React.StrictMode>
      <App amplitudeClient={navDefaultAmplitudeClient} />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

init();
