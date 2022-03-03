import Comments, { loader } from "./comments";
import { Comment } from "~/comments";
import { render, screen } from "@testing-library/react";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { NavigateFunction } from "react-router-dom";

const mockComment = {
  snippet: {
    topLevelComment: {
      snippet: {
        authorDisplayName: "Example Author",
        textDisplay: "Example Top Level Comment",
      },
    },
  },
  replies: {
    comments: [
      {
        snippet: {
          authorDisplayName: "Example Reply Author",
          textDisplay: "Example Reply",
        },
      },
    ],
  },
} as Comment;

const mockGetComments = jest.fn(() => [mockComment]);
jest.mock("~/comments", () => ({
  getComments: () => {
    mockGetComments();
  },
}));
jest.mock("remix", () => {
  return {
    useLoaderData: () => {
      return [mockComment];
    },
    useNavigate: () => {
      return {} as NavigateFunction;
    },
    Outlet: () => {
      return <div />;
    },
  };
});
test("Comments", async () => {
  render(<Comments />);
  await loader({
    params: { slug: "example-id" } as unknown,
  } as DataFunctionArgs);
  expect(mockGetComments).toHaveBeenCalled();
  expect(screen.getByText("Example Author")).toBeDefined();
  expect(screen.getByText("Example Top Level Comment")).toBeDefined();
  expect(screen.getByText("Example Reply Author")).toBeDefined();
  expect(screen.getByText("Example Reply")).toBeDefined();
});
