import { DecoratorParts, fetchDecoratorParts } from "./utils/dekorator";

export interface PageProps {
  title: string;
  description: string;
  decorator: DecoratorParts;
}

export const getPageProps = async (
  title: string,
  description: string
): Promise<PageProps> => {
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
