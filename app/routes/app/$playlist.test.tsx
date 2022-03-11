import Playlist, { loader } from "./$playlist";
import { render, screen } from "@testing-library/react";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { LinkProps } from "remix";

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

const mockGetPlaylistItems = jest.fn(() => mockPlaylistItem);
jest.mock("~/playlistItems", () => ({
  getPlaylistItems: () => {
    mockGetPlaylistItems();
  },
}));
jest.mock("remix", () => {
  return {
    useLoaderData: () => {
      return [mockPlaylistItem];
    },
    Outlet: () => <div />,
    Link: ({ children }: LinkProps) => <div>{children}</div>,
  };
});
test("Playlist", async () => {
  render(<Playlist />);
  await loader({
    params: { playlist: "example-id" } as unknown,
  } as DataFunctionArgs);
  expect(mockGetPlaylistItems).toHaveBeenCalled();
  expect(screen.getByText("Example Title")).toBeDefined();
});
