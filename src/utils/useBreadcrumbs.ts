import React from "react";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";

type DecoratorBreadcrumb = {
  url: string;
  title: string;
  analyticsTitle?: string;
  handleInApp?: boolean;
};
export default function useBreadcrumbs(breadcrumbs: DecoratorBreadcrumb[]) {
  React.useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, [breadcrumbs]);
}
