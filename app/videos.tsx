import auth from "./auth";

export const getVideos = async () => {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PUsKwL0-e2eHRNa6Ne99AESw&maxResults=20&key=${auth.apiKey}`
  );
  const json = await response.json();

  return json.items as GoogleApiYouTubePlaylistItemResource[];
};
