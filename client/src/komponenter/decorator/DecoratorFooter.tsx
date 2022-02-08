export const DecoratorFooter = (props: { html: string }) => (
    <div dangerouslySetInnerHTML={{ __html: props.html }} />
);
