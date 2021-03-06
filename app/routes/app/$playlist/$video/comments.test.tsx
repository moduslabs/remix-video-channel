import Comments, { loader } from "./comments";
import { Comment } from "~/data/comments";
import { render, screen } from "@testing-library/react";
import { DataFunctionArgs } from "@remix-run/server-runtime";

const mockComment = {
  snippet: {
    topLevelComment: {
      snippet: {
        authorDisplayName: "Example Author",
        textDisplay: "Example Top Level Comment",
        etag: "mock-etag",
      },
    },
  },
  replies: {
    comments: [
      {
        snippet: {
          authorDisplayName: "Example Reply Author",
          textDisplay: "Example Reply",
          etag: "mock-etag",
        },
      },
    ],
  },
} as Comment;

const mockGetComments = jest.fn(() => [mockComment]);
jest.mock("~/data/comments", () => ({
  getComments: () => {
    mockGetComments();
  },
}));
jest.mock("remix", () => {
  return {
    useLoaderData: () => {
      return [mockComment];
    },
    Link: () => <div />,
    useLocation: () => {
      return { search: "" };
    },
  };
});
describe("Comments component", () => {
  test("should display comments", async () => {
    render(<Comments />);
    await loader({
      params: { video: "example-id" } as unknown,
    } as DataFunctionArgs);
    expect(mockGetComments).toHaveBeenCalled();
    expect(screen.getByText("Example Author")).toBeDefined();
    expect(screen.getByText("Example Top Level Comment")).toBeDefined();
    expect(screen.getByText("Example Reply Author")).toBeDefined();
    expect(screen.getByText("Example Reply")).toBeDefined();
  });
});
