"use client";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { useState, useEffect } from "react";

interface SearchbarProps {
  placeholder?: string;
  className?: string;
  inputClass?: string;
  onchange?: (value: string) => void;
  value?: string;
  showSearchHistoryPanel?: boolean;
  setShowSearchHistoryPanel?: (value: boolean) => void;
  history?: string;
}

const Searchbar = ({
  className,
  inputClass,
  placeholder,
  onchange,
  value,
  showSearchHistoryPanel,
  setShowSearchHistoryPanel,
  history,
}: SearchbarProps) => {
  const [localHistory, setLocalHistory] = useState<string[]>([]);

  useEffect(() => {
    if (history) {
      const stored = localStorage.getItem(history);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setLocalHistory(parsed.slice(0, 5));
          }
        } catch (e) {
          console.error("Invalid history format in localStorage");
        }
      }
    }
  }, [history, showSearchHistoryPanel]);

  const saveToHistory = (term: string) => {
    if (!history || term.trim() === "") return;

    const stored = localStorage.getItem(history);
    let updated: string[] = stored ? JSON.parse(stored) : [];

    updated = updated.filter((item) => item !== term);
    updated.unshift(term);

    localStorage.setItem(history, JSON.stringify(updated.slice(0, 20)));

    setLocalHistory(updated.slice(0, 5));
  };

  const handleChange = (val: string) => {
    onchange?.(val);
  };

  const handleClickHistoryItem = (val: string) => {
    setShowSearchHistoryPanel?.(false);
    onchange?.(val);
    saveToHistory(val);
  };

  return (
    <div
      className={clsx(
        "flex gap-1 items-center px-3",
        "bg-white rounded-3xl shadow-sm transition-shadow",
        "focus-within:shadow-md",
        "relative",
        className,
        showSearchHistoryPanel && "rounded-b-none"
      )}
    >
      <MagnifyingGlassIcon className="text-gray-400" size={22} />
      <input
        type="text"
        placeholder={placeholder}
        onFocus={() => setShowSearchHistoryPanel?.(true)}
        onBlur={() => setTimeout(() => setShowSearchHistoryPanel?.(false), 100)}
        className={clsx(
          "w-full p-2 bg-transparent focus:outline-none",
          inputClass
        )}
        autoComplete="off"
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") saveToHistory(value ?? "");
        }}
      />
      {showSearchHistoryPanel && localHistory.length > 0 && (
        <div className="absolute top-full left-0 bg-white w-full border-t border-gray-300 rounded-b-md shadow-md z-10">
          {localHistory.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClickHistoryItem(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
