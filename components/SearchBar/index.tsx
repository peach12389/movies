import { IoSearch } from 'react-icons/io5';
import { HiMenu } from 'react-icons/hi';

export default function SearchBar() {
  return (
    <div className="flex items-center  max-w-[700px] mx-auto py-5">
      <div className="min-h-[34px] sm:min-h-[45px] flex w-full rounded-lg border-gray-100 border-2 px-2 items-center">
        <IoSearch className="text-2xl text-gray-500" />
        <input
          type="text"
          className="h-full focus:ring-0 outline-none border-0 w-full"
          placeholder="Search for restaurants, dishes..."
        />
      </div>
      {/* filter */}
      <div className="cursor-pointer flex items-center ml-3 min-h-[38px]  sm:min-h-[45px] rounded-lg border-gray-100 border-2 px-2">
        <HiMenu className="text-3xl  text-brand-red" />
      </div>
    </div>
  );
}
