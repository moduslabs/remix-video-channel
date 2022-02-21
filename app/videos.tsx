export const getVideos = async () => {
  const videoDataExample = {
    snippet: {
      title: "Example title",
      description: "Example description",
      thumbnails: {
        default: {
          url: "",
          width: 120,
          height: 90,
        },
      },
    },
  } as GoogleApiYouTubeVideoResource;
  const videos: GoogleApiYouTubeVideoResource[] = [
    videoDataExample,
    videoDataExample,
  ];

  return videos;
};
