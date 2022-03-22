import Playlist, { loader } from "./$playlist";
import { render, screen } from "@testing-library/react";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { LinkProps } from "remix";
import { GenericYouTubeVideoListItem } from "~/data/playlistItems";

const mockPlaylistItem = {
  title: "Example Title",
  id: "unique",
} as GenericYouTubeVideoListItem;

const mockGetPlaylistItems = jest.fn(() => mockPlaylistItem);
jest.mock("~/data/playlistItems", () => ({
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
    useLocation: () => {
      return { search: "" };
    },
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
