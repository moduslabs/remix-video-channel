import Player, { loader } from "./$video";
import { render, screen } from "@testing-library/react";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { LinkProps } from "remix";

const mockVideo = {
  id: "example-id",
  statistics: {
    commentCount: 111,
    likeCount: 222,
  },
} as GoogleApiYouTubeVideoResource;

const mockGetVideoData = jest.fn(() => mockVideo);
jest.mock("~/videoData", () => ({
  getVideoData: () => {
    mockGetVideoData();
  },
}));
jest.mock("remix", () => {
  return {
    useLoaderData: () => {
      return mockVideo;
    },
    Outlet: () => {
      return <div />;
    },
    Link: ({ children }: LinkProps) => <div>{children}</div>,
  };
});
test("Player", async () => {
  render(<Player />);
  await loader({
    params: { video: "example-id" } as unknown,
  } as DataFunctionArgs);
  expect(mockGetVideoData).toHaveBeenCalled();
  expect(screen.getByText("111 Comments")).toBeDefined();
  expect(screen.getByText("222 likes")).toBeDefined();
});
