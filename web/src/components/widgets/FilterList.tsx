type FilterProps = {
  filtersList: string;
  bgColor: string;
};

function FilterList({ filtersList, bgColor }: FilterProps) {
  return (
    <div
      className={`flex-1 flex justify-center items-center rounded-lg ${bgColor} py-2 px-1 md:px-2 lg:px-3 text-xs lg:text-base font-bold text-black`}
    >
      {filtersList}
    </div>
  );
}

export default FilterList;
