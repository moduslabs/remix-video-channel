import Index, { loader } from "./index";
import { render, screen } from "@testing-library/react";

const mockPlaylistItem = {
  snippet: {
    title: "Example Title",
    thumbnails: {
      medium: {
        height: 180,
        width: 320,
      },
    },
    resourceId: {
      videoId: "example-id",
    },
  },
} as GoogleApiYouTubePlaylistItemResource;

const mockGetVideos = jest.fn(() => mockPlaylistItem);
jest.mock("../videos", () => ({
  getVideos: () => {
    mockGetVideos();
  },
}));
jest.mock("remix", () => {
  return {
    useLoaderData: () => {
      return [mockPlaylistItem];
    },
  };
});
test("Index", async () => {
  render(<Index />);
  await loader();
  expect(mockGetVideos).toHaveBeenCalled();
  expect(screen.getByText("Example Title")).toBeDefined();
});
