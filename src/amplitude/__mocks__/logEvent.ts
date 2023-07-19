//eslint-disable-next-line @typescript-eslint/no-explicit-any
export default jest.fn((eventName: string, additionalEventData?: any) => {
  console.log(
    "Mock: sender event",
    eventName,
    " med data ",
    additionalEventData
  );
});
