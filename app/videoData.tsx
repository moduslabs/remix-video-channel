import { api } from "./api";

export const getVideoData = async (videoId: string) => {
  const response = await api.videos.list({
    part: ["player", "statistics"],
    id: [videoId],
  });

  if (!response.data.items) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return response.data.items[0];
};
