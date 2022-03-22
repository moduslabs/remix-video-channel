import { getPlaylistItems } from "./playlistItems";

const mockVideo = {
  snippet: {
    description: "example description",
    title: "example title",
    resourceId: { videoId: "" },
    thumbnails: { medium: { url: "" } },
  },
} as GoogleApiYouTubePlaylistItemResource;

// eslint-disable-next-line no-global-assign
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [mockVideo],
      }),
    ok: true,
  } as Response)
);

test("playlist API", async () => {
  await getPlaylistItems("", { YT_API_KEY: "mock-key" });
  expect(fetch).toHaveBeenCalled();
});
