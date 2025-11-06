import searchIcon from "../assets/search-icon.svg";

function SearchBar() {
  return (
    <div className="flex-3 flex gap-2 lg:gap-3 justify-start align-center bg-[#F3F3F5] rounded-md px-2 md:px-4 py-2">
      <img src={searchIcon} alt="search-icon" />

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
