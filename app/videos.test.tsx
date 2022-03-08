import { getVideos } from "./videos";

const mockVideo = {} as GoogleApiYouTubePlaylistItemResource;

// eslint-disable-next-line no-global-assign
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [mockVideo],
      }),
  } as Response)
);

test("videos API", async () => {
  const data = await getVideos();
  expect(fetch).toHaveBeenCalled();
  expect(data).toEqual([mockVideo]);
});
