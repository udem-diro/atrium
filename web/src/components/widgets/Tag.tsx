type TagProps = {
  tagText: string;
};

function Tag({ tagText }: TagProps) {
  return (
    <div className="px-2  py-0.5 md:px-4 bg-[#FFE0D5] text-[#A12500] rounded-full flex justify-center items-center text-center text-[10px]">
      {tagText}
    </div>
  );
}

export default Tag;
