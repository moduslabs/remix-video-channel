import { Comment, getComments } from "./comments";

const mockComment = {} as Comment;

// eslint-disable-next-line no-global-assign
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [mockComment],
      }),
  } as Response)
);

test("comments API", async () => {
  const data = await getComments("mock-id");
  expect(fetch).toHaveBeenCalled();
  expect(data).toEqual([mockComment]);
});
