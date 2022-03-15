import { Form } from "remix";
import { SearchIcon } from "@heroicons/react/solid";

export default function Search() {
  return (
    <Form action="/app/search">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="search"
          name="query"
          className="block w-full rounded-md pl-10 pr-4 py-2 border-gray-400"
          placeholder="Search"
          type="search"
        />
      </div>
    </Form>
  );
}
