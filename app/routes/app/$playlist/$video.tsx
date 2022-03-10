import { Link, Outlet, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { getVideoData } from "~/videoData";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.video, "expected params.video");
  const videoData = await getVideoData(params.video);

  return videoData;
};

export default function Player() {
  const {
    id,
    statistics: { commentCount, likeCount },
  } = useLoaderData<GoogleApiYouTubeVideoResource>();

  return (
    <div className="h-full flex-1">
      <div className="h-full flex flex-col p-2">
        <iframe
          title="yt-player"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          frameBorder="0"
        ></iframe>
        <div className="flex flex-row w-full pt-2 items-center">
          <h5 className="flex grow text-lg">{`${likeCount} likes`}</h5>
          <Link to="./comments">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-900 bg-gray-300 hover:bg-gray-400">
              {`${commentCount} Comments`}
            </button>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
