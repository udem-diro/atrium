import React from "react";

type ButtonProps = {
  buttonText: string;
  variant?: "primary" | "secondary" | "outline" | "view";
  size?: "sm" | "md" | "lg" | "responsive";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  buttonText,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  // Base shared styles
  const base =
    "rounded-lg font-medium transition-colors border hover:cursor-pointer";

  // Variants
  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses =
        "bg-white text-black font-semibold hover:bg-[#005DAA] hover:text-white";
      break;
    case "secondary":
      variantClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300";
      break;
    case "outline":
      variantClasses =
        "border border-gray-600 text-gray-800 font-semibold hover:bg-gray-100";
      break;
    case "view":
      variantClasses =
        "bg-[#005DAA] text-white font-semibold hover:bg-[#004985]";
  }

  // Sizes
  let sizeClasses = "";
  switch (size) {
    case "sm":
      sizeClasses = "px-3 py-1 text-sm";
      break;
    case "md":
      sizeClasses = "px-4 py-2 text-base";
      break;
    case "lg":
      sizeClasses = "px-6 py-3 text-lg";
      break;
    case "responsive":
      sizeClasses =
        "px-3 py-2 text-xs md:px-5 md:py-3 lg:px-6 my-auto md:rounded-xl";
      break;
  }

  return (
    <button
      className={`${base} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {buttonText}
    </button>
  );
}

export default Button;
