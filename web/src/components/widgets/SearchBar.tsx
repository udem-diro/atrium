import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="flex-3 flex gap-2 lg:gap-3 justify-start items-center bg-[#F3F3F5] rounded-md px-2 md:px-4 py-2">
      <div className="flex justify-center items-center">
        <FaSearch className="text-gray-400" />
      </div>

      <input
        type="text"
        id="searchText"
        name="search"
        placeholder="Search opportunities, departments or professors..."
        className=" flex-1 text-[#848484]  font-semibold text-xs md:text-md lg:text-lg focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;
