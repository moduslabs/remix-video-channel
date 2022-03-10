import { NavLink, Outlet } from "remix";

export default function Playlist() {
  const playlists = [
    {
      title: "Popular",
      id: "PUsKwL0-e2eHRNa6Ne99AESw",
    },
    {
      title: "Recent",
      id: "UUsKwL0-e2eHRNa6Ne99AESw",
    },
  ];

  return (
    <div>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-700">
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {playlists.map(({ title, id }) => (
                <NavLink
                  key={id}
                  to={`./${id}`}
                  className={({ isActive }) =>
                    isActive
                      ? "group flex items-center px-2 py-2 text-white font-medium rounded-md bg-gray-900"
                      : "group flex items-center px-2 py-2 text-white font-medium rounded-md"
                  }
                >
                  {title}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}