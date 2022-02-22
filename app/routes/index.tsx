import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useLoaderData } from "remix";
import { getVideos } from "~/videos";

export const loader = async () => {
  return getVideos();
};

export default function Index() {
  const videos = useLoaderData<GoogleApiYouTubeVideoResource[]>();
  console.log(videos);

  return (
    <Grid container spacing={1}>
      {videos.map((video) => {
        const thumbnail = video.snippet.thumbnails.medium;
        return (
          <Grid item xs={12} md={6}>
            <Card sx={{ display: "flex", height: thumbnail.height }}>
              <CardMedia
                component="img"
                image={thumbnail.url}
                sx={{ width: thumbnail.width, height: thumbnail.height }}
              />
              <Box>
                <CardContent>
                  <Typography variant="h5">{video.snippet.title}</Typography>
                  <Typography variant="subtitle1">
                    {video.snippet.description}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
