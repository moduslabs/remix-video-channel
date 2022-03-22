import { Link, LoaderFunction, Outlet, useLoaderData, useLocation } from 'remix';
import invariant from 'tiny-invariant';
import {
  GenericYouTubeVideoListItem,
  getPlaylistItems,
  getSearchResults,
} from '~/data/playlistItems';

export const loader: LoaderFunction = async ({ params, request, context }) => {
  invariant(params.playlist, 'expected params.playlist');
  if (params.playlist === 'search') {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') as string;
    const searchResults = await getSearchResults(query, context);

    return searchResults;
  }
  const playlistData = await getPlaylistItems(params.playlist, context);

  return playlistData;
};

export default function Playlist() {
  const videos = useLoaderData<GenericYouTubeVideoListItem[]>();
  const { search } = useLocation();

  return (
    <div className="flex flex-col h-screen divide-y items-center">
      <Outlet />
      <div className="flex-1 grow overflow-y-auto p-1 sm:p-2 md:p-4">
        <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          {videos.map(({ description, title, thumbnail, id }) => (
            <li
              key={id}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 px-1"
            >
              <Link to={{ pathname: `./${id}`, search: search }}>
                <div className="md:w-full flex md:flex-row flex-col items-center justify-between">
                  <img src={thumbnail} alt={title} className="w-32 h-18 rounded-l-lg" />
                  <div className="flex-1 p-2 md:truncate">
                    <p className="text-gray-900 text-sm md:truncate">{title}</p>
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
