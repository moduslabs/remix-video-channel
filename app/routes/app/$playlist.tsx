import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { getPlaylistItems } from "~/playlistItems";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.playlist, "expected params.playlist");
  const playlistData = await getPlaylistItems(params.playlist);

  return playlistData;
};

export default function Playlist() {
  const videos = useLoaderData<GoogleApiYouTubePlaylistItemResource[]>();

  return (
    <div>
      <div>
        <Outlet />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 h-full">
        {videos.map(
          ({
            snippet: {
              description,
              title,
              thumbnails: { medium: thumbnail },
              resourceId: { videoId: id },
            },
          }) => (
            <div key={id}>
              <Link to={`./${id}`}>
                <div>
                  <img src={thumbnail.url} alt={title} className="w-32 h-18" />
                  <div>
                    <p className="truncate">{title}</p>
                    <p className="truncate">{description}</p>
                  </div>
                </div>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
