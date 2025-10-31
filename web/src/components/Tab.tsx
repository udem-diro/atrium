type TabProps = {
  tabText: string;
  isActive: boolean;
  onClick: () => void;
};

function Tab({ tabText, isActive, onClick }: TabProps) {
  let tabStyle = "bg-[#F5F5F5]  hover:bg-[#FFFFFF] hover:text-black";
  if (isActive) {
    tabStyle = "bg-white";
  }

  return (
    <button
      onClick={onClick}
      className={`flex-1 flex px-2 py-1 justify-center align-center rounded-sm text-xs md:text-md lg:text-lg text-black font-bold ${tabStyle}`}
    >
      {tabText}
    </button>
  );
}

export default Tab;
