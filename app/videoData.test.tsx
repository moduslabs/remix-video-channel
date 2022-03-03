import { getVideoData } from "./videoData";
import { installGlobals } from "@remix-run/node";

installGlobals();

const mockVideoData = {} as GoogleApiYouTubeVideoResource;

const mockFetch = jest.spyOn(global, "fetch").mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [mockVideoData],
      }),
  } as Response)
);

test("video data API", async () => {
  const data = await getVideoData("mock-id");
  expect(mockFetch).toHaveBeenCalled();
  expect(data).toEqual(mockVideoData);
});
