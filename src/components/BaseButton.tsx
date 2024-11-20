import React, { ReactNode } from "react";

interface BaseButtonProps {
  icon?: ReactNode;
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const BaseButton: React.FC<BaseButtonProps> = ({
  icon: Icon,
  text,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg bg-white text-black hover:bg-slate-600 hover:text-white transition-all duration-300 ${className}`}
    >
      {Icon}
      {text}
    </button>
  );
};

export default BaseButton;
