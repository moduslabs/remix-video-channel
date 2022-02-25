import { Button, Grid } from "@mui/material";
import { Link, Outlet, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return params.slug;
};

export default function Player() {
  const id = useLoaderData();

  return (
    <Grid container>
      <Grid item xs={12}>
        <iframe
          id="ytplayer"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          frameBorder="0"
        ></iframe>
      </Grid>
      <Grid item xs={8}></Grid>
      <Grid item xs={4}>
        <Link to={`/player/${id}/comments`}>
          <Button>Comments</Button>
        </Link>
      </Grid>
      <Outlet />
    </Grid>
  );
}
