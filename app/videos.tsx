import { api } from "./api";

export const getVideos = async () => {
  const response = await api.playlistItems.list({
    part: ["snippet"],
    playlistId: "PUsKwL0-e2eHRNa6Ne99AESw",
    maxResults: 20,
  });
  return response.data.items || [];
};
