import {
  DecoratorParts,
  fetchDecoratorParts,
  LinkAttributes,
} from "./utils/dekorator";

export interface PageProps {
  title: string;
  description: string;
  decorator: DecoratorParts;
}

export const getPageProps = async (
  title: string,
  description: string
): Promise<{
  decorator: {
    decoratorHeader: string;
    decoratorFooter: string;
    decoratorEnv: {
      scriptUrl: string | undefined;
      dataSrc: string | undefined;
    };
    scriptTags: { [p: string]: string }[];
    linkTags: LinkAttributes[];
  };
  description: string;
  title: string;
}> => {
  const breadcrumbs = [
    {
      title: encodeURIComponent(title),
      url: `${process.env.DECORATOR_BREADCRUMB_THIS_PAGE_URL}`,
    },
  ];
  const cacheKey = "index";

  const decorator = await fetchDecoratorParts({
    siteTitle: title,
    cacheKey,
    breadcrumbs,
  });

  return {
    title,
    description,
    decorator,
  };
};
