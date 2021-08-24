import { SearchIcon, MenuIcon } from '@heroicons/react/solid';

export default function SearchBar() {
  return (
    <div className="flex items-center">
      <div className="flex flex-wrap  w-full relative h-16 rounded-lg my-4 border-gray-100 border-2 justify-items-center">
        <div className="flex -mr-px justify-center w-15  py-3 px-2">
          <span className="flex items-center leading-normal  rounded rounded-r-none text-xl px-1 whitespace-no-wrap text-gray-600">
            <SearchIcon className="h-auto w-7 text-gray-500" />
          </span>
        </div>
        <input
          type="text"
          className="flex-shrink flex-grow  leading-normal w-px flex-1 border-0 h-10 px-1 relative self-center font-roboto text-xs lg:text-xl outline-none font-semibold focus:ring-0"
          placeholder="Search for restaurants, dishes.."
        />
      </div>
      {/* filter */}
      <div className="px-3 mx-2 border-2 h-16 flex items-center rounded-lg border-gray-100">
        <MenuIcon className="h-auto w-7 text-brand-red" />
      </div>
    </div>
  );
}
