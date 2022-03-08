import auth from "./auth";

export const getVideoData = async (videoId: string) => {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=player&part=statistics&id=${videoId}&key=${auth.apiKey}`
  );
  const json = await response.json();

  if (json.items[0] === undefined) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json.items[0] as GoogleApiYouTubeVideoResource;
};
