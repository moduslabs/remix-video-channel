import { getPlaylistItems } from "./playlistItems";

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

test("playlist API", async () => {
  const data = await getPlaylistItems("");
  expect(fetch).toHaveBeenCalled();
  expect(data).toEqual([mockVideo]);
});
