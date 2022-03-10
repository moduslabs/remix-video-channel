import auth from "./auth";

export const getPlaylistItems = async (playlistId: string) => {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=20&key=${auth.apiKey}`
  );
  const json = await response.json<
    GoogleApiYouTubePaginationInfo<GoogleApiYouTubePlaylistItemResource>
  >();

  return json.items as GoogleApiYouTubePlaylistItemResource[];
};
