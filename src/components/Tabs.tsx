"use client";
import clsx from "clsx";
import React from "react";

interface TabsProps {
  curTab: string;
  onChange: (tab: string) => void;
  items: string[];
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ curTab, onChange, items, className }) => {
  return (
    <div
      className={clsx(
        "inline-flex bg-gray-100 p-1 rounded-lg space-x-2",
        className
      )}
    >
      {items.map((label) => (
        <button
          key={label}
          onClick={() => onChange(label)}
          className={clsx(
            "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all",
            curTab === label
              ? "bg-white text-black shadow"
              : "text-gray-600 hover:text-black hover:bg-gray-200"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
