interface CommentSnippet {
  snippet: {
    authorDisplayName: string;
    authorProfileImageUrl: string;
    etag: string;
    textDisplay: string;
  };
}
export interface Comment {
  snippet: {
    topLevelComment: CommentSnippet;
  };
  replies: {
    comments: CommentSnippet[];
  };
}

export const getComments = async (videoId: string, { YT_API_KEY }: ENV) => {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&part=replies&videoId=${videoId}&maxResults=20&key=${YT_API_KEY}`,
    {
      cf: {
        cacheTtl: 3600,
        cacheEverything: true,
      },
    }
  );
  if (!response.ok) {
    throw response;
  }
  const json = await response.json<GoogleApiYouTubePaginationInfo<Comment>>();

  return json.items;
};
