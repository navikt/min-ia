export function mockContainerSize() {
  jest.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(100);
  jest.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(100);
}
