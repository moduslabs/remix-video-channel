import youtube from "@googleapis/youtube";
import auth from "./auth";

export const api = youtube.youtube({
  auth: auth.apiKey,
  version: "v3",
});
