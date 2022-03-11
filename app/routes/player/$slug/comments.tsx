import { useLoaderData, Link } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { Comment, getComments } from "../../../comments";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");

  return getComments(params.slug);
};

export default function Comments() {
  const comments = useLoaderData<Comment[]>();

  const createCommentMarkup = (text: string) => {
    return { __html: text };
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Link to="../">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Link>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl px-4 pt-5 pb-4 transform text-left">
          <ul className="divide-y divide-gray-200">
            {comments.map(
              ({
                snippet: {
                  topLevelComment: {
                    snippet: {
                      authorDisplayName,
                      authorProfileImageUrl,
                      etag,
                      textDisplay,
                    },
                  },
                },
                replies,
              }) => (
                <li key={etag} className="py-4">
                  <div className="flex space-x-3">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={authorProfileImageUrl}
                      alt={authorDisplayName}
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">
                          {authorDisplayName}
                        </h3>
                      </div>
                      <p
                        className="text-sm text-gray-500"
                        dangerouslySetInnerHTML={createCommentMarkup(
                          textDisplay
                        )}
                      />
                    </div>
                  </div>
                  {replies && (
                    <ul>
                      {replies.comments.map(
                        ({
                          snippet: {
                            authorDisplayName,
                            authorProfileImageUrl,
                            etag,
                            textDisplay,
                          },
                        }) => (
                          <li key={etag} className="pt-4 ml-9">
                            <div className="flex space-x-3">
                              <img
                                className="h-6 w-6 rounded-full"
                                src={authorProfileImageUrl}
                                alt={authorDisplayName}
                              />
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-sm font-medium">
                                    {authorDisplayName}
                                  </h3>
                                </div>
                                <p
                                  className="text-sm text-gray-500"
                                  dangerouslySetInnerHTML={createCommentMarkup(
                                    textDisplay
                                  )}
                                />
                              </div>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
