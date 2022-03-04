import Comments, { loader } from "./comments";
import { Comment } from "~/comments";
import { fireEvent, render, screen } from "@testing-library/react";
import { DataFunctionArgs } from "@remix-run/server-runtime";

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
const mockUseNavigate = jest.fn();
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
      return mockUseNavigate;
    },
    Outlet: () => {
      return <div />;
    },
  };
});
beforeEach(async () => {
  render(<Comments />);
  await loader({
    params: { slug: "example-id" } as unknown,
  } as DataFunctionArgs);
  expect(mockGetComments).toHaveBeenCalled();
});
describe("Comments component", () => {
  test("should display comments", async () => {
    expect(screen.getByText("Example Author")).toBeDefined();
    expect(screen.getByText("Example Top Level Comment")).toBeDefined();
    expect(screen.getByText("Example Reply Author")).toBeDefined();
    expect(screen.getByText("Example Reply")).toBeDefined();
  });
  test("should navigate away on close", async () => {
    fireEvent.keyDown(screen.getByRole("presentation"), {
      key: "Escape",
      code: "Escape",
    });
    expect(mockUseNavigate).toHaveBeenCalledWith("../");
  });
});
