export default jest.fn((eventName: string, additionalEventData?: any) => {
  console.log(
    "Mock: sender event",
    eventName,
    " med data ",
    additionalEventData
  );
});
