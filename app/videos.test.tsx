import { getVideos } from "./videos";
import { installGlobals } from "@remix-run/node";

installGlobals();

const mockVideo = {} as GoogleApiYouTubePlaylistItemResource;

const mockFetch = jest.spyOn(global, "fetch").mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [mockVideo],
      }),
  } as Response)
);

test("videos API", async () => {
  const data = await getVideos();
  expect(mockFetch).toHaveBeenCalled();
  expect(data).toEqual([mockVideo]);
});
