import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { getComments } from "../../../comments";
import { youtube_v3 } from "@googleapis/youtube";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");

  return getComments(params.slug);
};

export default function Comments() {
  const comments = useLoaderData<youtube_v3.Schema$CommentThread[]>();

  console.log(comments);
  return (
    <Container
      sx={{
        bgcolor: "background.paper",
        overflowY: "auto",
        width: "80%",
        height: "80%",
      }}
    >
      <List>
        {comments.map(({ snippet, replies }) => (
          <ListItem sx={{ display: "block" }}>
            <Typography variant="subtitle2">
              {snippet?.topLevelComment?.snippet?.authorDisplayName}
            </Typography>
            <ListItemText>
              {snippet?.topLevelComment?.snippet?.textDisplay}
            </ListItemText>
            {replies && (
              <div>
                <List>
                  {replies?.comments?.map(({ snippet }) => (
                    <ListItem sx={{ display: "block" }}>
                      <Typography variant="subtitle2">
                        {snippet?.authorDisplayName}
                      </Typography>
                      <ListItemText>{snippet?.textDisplay}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </div>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
