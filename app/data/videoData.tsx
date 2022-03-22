export const getVideoData = async (videoId: string, { YT_API_KEY }: ENV) => {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=player&part=statistics&id=${videoId}&key=${YT_API_KEY}`,
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
  const json = await response.json<
    GoogleApiYouTubePaginationInfo<GoogleApiYouTubeVideoResource>
  >();

  if (json.items[0] === undefined) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json.items[0];
};
