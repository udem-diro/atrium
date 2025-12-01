type TagProps = {
  tagText: string;
};

// Hash function to convert string to a number
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Generate consistent colors based on tag text
function getTagColors(text: string) {
  const hash = hashString(text.toLowerCase());

  // Predefined color pairs (background, text) for better readability
  const colorPairs = [
    { bg: "#FFE0D5", text: "#A12500" }, // Orange/Red
    { bg: "#E0F2FE", text: "#0369A1" }, // Light Blue/Blue
    { bg: "#DCFCE7", text: "#166534" }, // Light Green/Green
    { bg: "#FEF3C7", text: "#854D0E" }, // Light Yellow/Brown
    { bg: "#F3E8FF", text: "#6B21A8" }, // Light Purple/Purple
    { bg: "#FCE7F3", text: "#9F1239" }, // Light Pink/Rose
    { bg: "#DBEAFE", text: "#1E40AF" }, // Sky Blue/Deep Blue
    { bg: "#FED7AA", text: "#9A3412" }, // Peach/Dark Orange
    { bg: "#D1FAE5", text: "#065F46" }, // Mint/Dark Green
    { bg: "#E9D5FF", text: "#7C3AED" }, // Lavender/Violet
  ];

  // Use hash to pick a color pair consistently
  const index = hash % colorPairs.length;
  return colorPairs[index];
}

function Tag({ tagText }: TagProps) {
  const colors = getTagColors(tagText);

  return (
    <div
      className="px-2 py-0.5 md:px-2 rounded-full flex justify-center items-center text-center text-[10px]"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      {tagText}
    </div>
  );
}

export default Tag;
