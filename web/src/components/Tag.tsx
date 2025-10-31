type TagProps = {
  tagText: string;
};

function Tag({ tagText }: TagProps) {
  return (
    <div className="px-6 bg-[#FFE0D5] text-[#A12500] rounded-full">
      {tagText}
    </div>
  );
}

export default Tag;
