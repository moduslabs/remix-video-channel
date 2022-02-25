import {
  Container,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { useLoaderData, useNavigate } from "remix";
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
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const createCommentMarkup = (text: string) => {
    return { __html: text };
  };

  return (
    <Modal open onClose={handleClose}>
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
                <div
                  dangerouslySetInnerHTML={createCommentMarkup(
                    snippet?.topLevelComment?.snippet?.textDisplay as string
                  )}
                />
              </ListItemText>

              {replies && (
                <List>
                  {replies?.comments?.map(({ snippet }) => (
                    <ListItem sx={{ display: "block" }}>
                      <Typography variant="subtitle2">
                        {snippet?.authorDisplayName}
                      </Typography>
                      <ListItemText>
                        <div
                          dangerouslySetInnerHTML={createCommentMarkup(
                            snippet?.textDisplay as string
                          )}
                        />
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              )}
            </ListItem>
          ))}
        </List>
      </Container>
    </Modal>
  );
}
