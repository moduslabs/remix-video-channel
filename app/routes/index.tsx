import { redirect } from "remix";
import { playlists } from "~/data/playlists";

export async function loader() {
  return redirect(`./app/${playlists[0].id}`);
}
