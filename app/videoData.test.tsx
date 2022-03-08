import { getVideoData } from "./videoData";

const mockVideoData = {} as GoogleApiYouTubeVideoResource;

// eslint-disable-next-line no-global-assign
global.fetch = jest.fn((input: RequestInfo) => {
  if (input.toString().includes("mock-id")) {
    return Promise.resolve({
      json: () => Promise.resolve({ items: [mockVideoData] }),
    } as Response);
  } else {
    return Promise.resolve({
      json: () => Promise.resolve({ items: [] }),
    } as Response);
  }
});

test("video data API", async () => {
  const data = await getVideoData("mock-id");
  expect(fetch).toHaveBeenCalled();
  expect(data).toEqual(mockVideoData);
  expect(async () => await getVideoData("mock-invalid-id")).rejects.toThrow();
});
