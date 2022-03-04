import { Comment, getComments } from "./comments";
import { installGlobals } from "@remix-run/node";

installGlobals();

const mockComment = {} as Comment;

const mockFetch = jest.spyOn(global, "fetch").mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [mockComment],
      }),
  } as Response)
);

test("comments API", async () => {
  const data = await getComments("mock-id");
  expect(mockFetch).toHaveBeenCalled();
  expect(data).toEqual([mockComment]);
});
