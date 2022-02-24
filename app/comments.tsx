import { api } from "./api";

export const getComments = async (videoId: string) => {
  const response = await api.commentThreads.list({
    part: ["snippet", "replies"],
    videoId: videoId,
    maxResults: 20,
  });

  return response.data.items || [];
};
