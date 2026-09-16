import React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ariaLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  ariaLabel,
  className = "",
  ...props
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`cursor-pointer hover:opacity-80 active:scale-95 transition-all p-1 flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
