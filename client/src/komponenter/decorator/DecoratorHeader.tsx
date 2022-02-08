export const DecoratorHeader = (props: { html: string }) => (
    <div dangerouslySetInnerHTML={{ __html: props.html }} />
);
