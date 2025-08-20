"use client";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";

interface SearchbarProps {
  placeholder?: string;
  className?: string;
  inputClass?: string;
  onchange?: (value: string) => void;
  value?: string;
}

const Searchbar = ({
  className,
  inputClass,
  placeholder,
  onchange,
  value,
}: SearchbarProps) => {
  const handleChange = (val: string) => {
    onchange?.(val);
  };

  return (
    <div
      className={clsx(
        "flex items-center gap-2 px-4 py-2",
        "bg-gray-100 rounded-full shadow-sm transition-all",
        "focus-within:ring-2 focus-within:ring-gray-500",
        "hover:bg-gray-200",
        className
      )}
    >
      <MagnifyingGlassIcon className="text-gray-500" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        className={clsx(
          "w-full bg-transparent focus:outline-none text-gray-700 text-sm md:text-base",
          inputClass
        )}
        autoComplete="off"
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onchange?.(value ?? "");
          }
        }}
      />
    </div>
  );
};

export default Searchbar;
