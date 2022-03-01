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
import { Comment, getComments } from "../../../comments";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");

  return getComments(params.slug);
};

export default function Comments() {
  const comments = useLoaderData<Comment[]>();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("../");
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
          {comments.map(
            ({
              snippet: {
                topLevelComment: {
                  snippet: { authorDisplayName, textDisplay },
                },
              },
              replies,
            }) => (
              <ListItem sx={{ display: "block" }}>
                <Typography variant="subtitle2">{authorDisplayName}</Typography>
                <ListItemText>
                  <div
                    dangerouslySetInnerHTML={createCommentMarkup(textDisplay)}
                  />
                </ListItemText>
                {replies && (
                  <List>
                    {replies.comments.map(
                      ({ snippet: { authorDisplayName, textDisplay } }) => (
                        <ListItem sx={{ display: "block" }}>
                          <Typography variant="subtitle2">
                            {authorDisplayName}
                          </Typography>
                          <ListItemText>
                            <div
                              dangerouslySetInnerHTML={createCommentMarkup(
                                textDisplay
                              )}
                            />
                          </ListItemText>
                        </ListItem>
                      )
                    )}
                  </List>
                )}
              </ListItem>
            )
          )}
        </List>
      </Container>
    </Modal>
  );
}
