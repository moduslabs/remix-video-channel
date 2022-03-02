import auth from "./auth";

interface CommentSnippet {
  snippet: {
    authorDisplayName: string;
    textDisplay: string;
  };
}
export interface Comment {
  snippet: {
    topLevelComment: CommentSnippet;
  };
  replies: {
    comments: CommentSnippet[];
  };
}

export const getComments = async (videoId: string) => {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&part=replies&videoId=${videoId}&maxResults=20&key=${auth.apiKey}`
  );
  const json = await response.json();

  return json.items as Comment[];
};
