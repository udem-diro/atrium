import { FaSearch } from "react-icons/fa";
import { useStore } from "../../hooks/useStore.ts";
import { getStore } from "../../utils/Store.ts";

type SearchBarProps = {
  placeholder?: string;
};

function SearchBar({ placeholder }: SearchBarProps) {
  const selectedTab = useStore((s) => s.selectedTab);
  const store = getStore();

  let placeholderText = "";

  if (selectedTab === "Opportunities") {
    placeholderText = "Search opportunities by title, skills, department...";
  } else if (selectedTab === "Professors") {
    placeholderText = "Search professors by name or research area...";
  } else if (selectedTab === "Students") {
    placeholderText = "Search students by name, interests, or projects...";
  }
  return (
    <div className="flex-3 flex gap-2 lg:gap-3 justify-start items-center bg-[#F3F3F5] rounded-md px-2 md:px-4 py-2">
      <div className="flex justify-center items-center">
        <FaSearch className="text-gray-400" />
      </div>

      <input
        type="text"
        id="searchText"
        name="search"
        onChange={(e) => store.setSearchQuery(e.target.value)}
        placeholder={placeholder || placeholderText}
        className=" flex-1 text-[#848484]  font-semibold text-xs md:text-md lg:text-lg focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;
