import { getVideoData } from "./videoData";

const mockVideoData = {} as GoogleApiYouTubeVideoResource;

// eslint-disable-next-line no-global-assign
global.fetch = jest.fn((input: RequestInfo) => {
  if (input.toString().includes("mock-id")) {
    return Promise.resolve({
      json: () => Promise.resolve({ items: [mockVideoData] }),
      ok: true,
    } as Response);
  } else {
    return Promise.resolve({
      json: () => Promise.resolve({ items: [] }),
      ok: true,
    } as Response);
  }
});

test("video data API", async () => {
  const data = await getVideoData("mock-id", { YT_API_KEY: "mock-key" });
  expect(fetch).toHaveBeenCalled();
  expect(data).toEqual(mockVideoData);
  expect(
    async () =>
      await getVideoData("mock-invalid-id", { YT_API_KEY: "mock-key" })
  ).rejects.toThrow();
});
