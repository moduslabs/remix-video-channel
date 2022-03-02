import {
  Box,
  Button,
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
            resourceId: { videoId: id },
          },
        }) => (
          <Grid item xs={12} xl={6} key={id}>
            <Button
              component={Link}
              to={`/player/${id}`}
              sx={{ textTransform: "none" }}
            >
              <Card
                sx={{
                  display: "flex",
                  height: thumbnail.height,
                  minWidth: "750px",
                }}
              >
                <CardMedia
                  component="img"
                  image={thumbnail.url}
                  sx={{ width: thumbnail.width, height: thumbnail.height }}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {description}
                  </Typography>
                </CardContent>
              </Card>
            </Button>
          </Grid>
        )
      )}
    </Grid>
  );
}
