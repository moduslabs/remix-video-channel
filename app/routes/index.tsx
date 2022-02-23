import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useLoaderData } from "remix";
import { getVideos } from "~/videos";

export const loader = async () => {
  return getVideos();
};

export default function Index() {
  const videos = useLoaderData<GoogleApiYouTubePlaylistItemResource[]>();

  return (
    <Grid container spacing={1}>
      {videos.map(
        ({
          snippet: {
            description,
            title,
            thumbnails: { medium: thumbnail },
            resourceId: { videoId: key },
          },
        }) => (
          <Grid item xs={12} md={6} key={key}>
            <Link to={`/player/${key}`}>
              <Card sx={{ display: "flex", height: thumbnail.height }}>
                <CardMedia
                  component="img"
                  image={thumbnail.url}
                  sx={{ width: thumbnail.width, height: thumbnail.height }}
                />
                <Box>
                  <CardContent>
                    <Typography variant="h5">{title}</Typography>
                    <Typography variant="subtitle1">{description}</Typography>
                  </CardContent>
                </Box>
              </Card>
            </Link>
          </Grid>
        )
      )}
    </Grid>
  );
}
