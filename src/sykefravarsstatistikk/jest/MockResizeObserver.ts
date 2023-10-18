export class MockResizeObserver {
  private readonly ResizeObserver;

  constructor() {
    this.ResizeObserver = window.ResizeObserver;
  }
  startmock() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ResizeObserver' does not exist on type 'Window'.
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  }
  stopmock() {
    window.ResizeObserver = this.ResizeObserver;
  }
}
