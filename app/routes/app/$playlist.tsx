import {
  Link,
  LoaderFunction,
  Outlet,
  useLoaderData,
  useLocation,
} from "remix";
import invariant from "tiny-invariant";
import {
  GenericYouTubeVideoListItem,
  getPlaylistItems,
  getSearchResults,
} from "~/playlistItems";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.playlist, "expected params.playlist");
  if (params.playlist === "search") {
    const url = new URL(request.url);
    const query = url.searchParams.get("query") as string;
    const searchResults = await getSearchResults(query);

    return searchResults;
  }
  const playlistData = await getPlaylistItems(params.playlist);

  return playlistData;
};

export default function Playlist() {
  const videos = useLoaderData<GenericYouTubeVideoListItem[]>();
  const { search } = useLocation();

  return (
    <div className="flex flex-col h-screen divide-y items-center">
      <Outlet />
      <div className="flex-1 grow overflow-y-auto p-4">
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {videos.map(({ description, title, thumbnail, id }) => (
            <li
              key={id}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <Link to={{ pathname: `./${id}`, search: search }}>
                <div className="w-full flex items-center justify-between">
                  <img
                    src={thumbnail}
                    alt={title}
                    className="w-32 h-18 rounded-l-lg"
                  />
                  <div className="flex-1 p-2 truncate">
                    <p className="text-gray-900 text-sm truncate">{title}</p>
                    <p className="text-gray-700 text-xs line-clamp-2 whitespace-normal">
                      {description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
