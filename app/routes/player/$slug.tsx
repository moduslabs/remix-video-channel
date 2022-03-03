import { Box, Button, Container, Typography } from "@mui/material";
import { Link, Outlet, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { getVideoData } from "~/videoData";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  const videoData = await getVideoData(params.slug);

  return videoData;
};

export default function Player() {
  const {
    id,
    statistics: { commentCount, likeCount },
  } = useLoaderData<GoogleApiYouTubeVideoResource>();

  return (
    <Container>
      <Box
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "640px",
          display: "block",
        }}
      >
        <iframe
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          frameBorder="0"
        ></iframe>
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >{`${likeCount} likes`}</Typography>
          <Button
            component={Link}
            to={`/player/${id}/comments`}
          >{`${commentCount} Comments`}</Button>
        </Box>
      </Box>
      <Outlet />
    </Container>
  );
}
