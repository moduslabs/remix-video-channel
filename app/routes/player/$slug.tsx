import { Button, Grid, Typography } from "@mui/material";
import { Link, Outlet, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { getVideoData } from "~/videoData";
import { youtube_v3 } from "@googleapis/youtube";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  const videoData = await getVideoData(params.slug);

  return videoData;
};

export default function Player() {
  const { id, player, statistics } = useLoaderData<youtube_v3.Schema$Video>();

  return (
    <Grid container>
      <Grid item xs={12}>
        <iframe
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          frameBorder="0"
        ></iframe>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6">{`${statistics?.likeCount} likes`}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Button
          component={Link}
          to={`/player/${id}/comments`}
        >{`${statistics?.commentCount} Comments`}</Button>
      </Grid>
      <Outlet />
    </Grid>
  );
}
