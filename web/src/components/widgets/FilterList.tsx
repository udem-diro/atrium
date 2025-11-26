import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";

type FilterProps = {
  options: string[];
  bgColor: string;
  hoverColor: string;
  onSelect?: (value: string) => void;
};

function FilterList({
  options,
  bgColor = "bg-light-gray",
  hoverColor,
  onSelect,
}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="relative flex-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-full flex justify-center items-center rounded-lg ${bgColor} ${hoverColor} py-2 px-1  md:px-2 lg:px-3 text-xs lg:text-base font-bold text-black`}
      >
        <FaFilter className="text-xs" />
        <span className="w-1 md:w-2"> </span>
        {selected}
        <span className="w-1 md:w-2"> </span>
        <FaChevronDown
          className={`text-xs transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full bg-white shadow-lg rounded-md overflow-hiden z-10">
          {options.map((option) => (
            <li
              key={option}
              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterList;
