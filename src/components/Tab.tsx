import React from "react";

type Props = {
  children: React.ReactNode;
  handleSelect: () => void;
  isSelected: boolean;
};

const Tab = ({ children, handleSelect, isSelected }: Props) => {
  return (
    <button
      className={
        "inline-block pb-3 focus:outline-none transition-all duration-100" +
        (isSelected && " border-b-2 border-primary font-semibold")
      }
      onClick={handleSelect}
    >
      {children}
    </button>
  );
};
export default Tab;
