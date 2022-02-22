import youtube from "@googleapis/youtube";
import auth from './auth';

export const getVideos = async () => {
  const api = youtube.youtube({
    auth: auth.apiKey,
    version: "v3",
  });
  const response = await api.playlistItems.list({
    part: ["snippet"],
    playlistId: "UUsKwL0-e2eHRNa6Ne99AESw",
    maxResults: 20,
  })
  return response.data.items;
};
