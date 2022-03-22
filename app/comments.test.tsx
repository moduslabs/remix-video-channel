import { Comment, getComments } from "./comments";

const mockComment = {} as Comment;

// eslint-disable-next-line no-global-assign
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [mockComment],
      }),
    ok: true,
  } as Response)
);

test("comments API", async () => {
  const data = await getComments("mock-id", { YT_API_KEY: "mock-key" });
  expect(fetch).toHaveBeenCalled();
  expect(data).toEqual([mockComment]);
});
