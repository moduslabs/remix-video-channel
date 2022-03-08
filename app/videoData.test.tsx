import { getVideoData } from "./videoData";
import { installGlobals } from "@remix-run/node";

installGlobals();

const mockVideoData = {} as GoogleApiYouTubeVideoResource;

const mockFetch = jest
  .spyOn(global, "fetch")
  .mockImplementation((input: RequestInfo) => {
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
  expect(mockFetch).toHaveBeenCalled();
  expect(data).toEqual(mockVideoData);
  expect(async () => (await getVideoData("mock-invalid-id"))).rejects.toBeInstanceOf(Response);
});
