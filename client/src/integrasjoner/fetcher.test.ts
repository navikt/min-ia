import { fetcher } from './fetcher';

// Mock the fetch function
global.fetch = jest.fn();

describe('fetcher', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should return data and status when successful', async () => {
        const mockData = { key: 'value' };
        fetch.mockResolvedValueOnce(new Response(JSON.stringify(mockData), { status: 200 }));

        const result = await fetcher('/api/success');

        expect(fetch).toHaveBeenCalledWith('/api/success', {
            method: 'GET',
            credentials: 'include',
        });
        expect(result).toEqual({ status: RestStatus.Suksess, data: mockData });
    });

    it('should return RestStatus.IkkeInnlogget when 401 status', async () => {
        fetch.mockResolvedValueOnce(new Response(null, { status: 401 }));

        const result = await fetcher('/api/unauthorized');

        expect(fetch).toHaveBeenCalledWith('/api/unauthorized', {
            method: 'GET',
            credentials: 'include',
        });
        expect(result).toEqual({ status: RestStatus.IkkeInnlogget });
    });

    it('should return RestStatus.IngenTilgang when 403 status', async () => {
        fetch.mockResolvedValueOnce(new Response(null, { status: 403 }));

        const result = await fetcher('/api/forbidden');

        expect(fetch).toHaveBeenCalledWith('/api/forbidden', {
            method: 'GET',
            credentials: 'include',
        });
        expect(result).toEqual({ status: RestStatus.IngenTilgang });
    });

    it('should return RestStatus.Feil when other status', async () => {
        fetch.mockResolvedValueOnce(new Response(null, { status: 500 }));

        const result = await fetcher('/api/internal-error');

        expect(fetch).toHaveBeenCalledWith('/api/internal-error', {
            method: 'GET',
            credentials: 'include',
        });
        expect(result).toEqual({ status: RestStatus.Feil });
    });
});
