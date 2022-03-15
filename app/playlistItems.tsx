import auth from "./auth";

export interface GenericYouTubeVideoListItem {
  title: string;
  description: string;
  thumbnail: string;
  id: string;
}

export const getPlaylistItems = async (playlistId: string) => {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=20&key=${auth.apiKey}`
  );
  if (!response.ok) {
    throw response;
  }
  const json = await response.json<
    GoogleApiYouTubePaginationInfo<GoogleApiYouTubePlaylistItemResource>
  >();

  return json.items.map(
    ({ snippet }): GenericYouTubeVideoListItem => ({
      description: snippet.description,
      title: snippet.title,
      thumbnail: snippet.thumbnails.medium.url,
      id: snippet.resourceId.videoId,
    })
  );
};

export const getSearchResults = async (query: string) => {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCsKwL0-e2eHRNa6Ne99AESw&q=${query}&type=video&maxResults=20&key=${auth.apiKey}`
  );

  if (!response.ok) {
    throw response;
  }

  const json = await response.json<
    GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>
  >();

  return json.items.map(
    (item): GenericYouTubeVideoListItem => ({
      description: item.snippet.description,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      id: item.id.videoId,
    })
  );
};
