import { Icon } from "@iconify/react";
import { Layout } from "./LayoutBuilder";

export default function LayoutCard({ layout }: { layout: Layout }) {
  return (
    <div className="flex flex-col items-center p-5 rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer w-64 h-70">
      <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md mb-4">
        <Icon icon="material-symbols:dashboard-outline" fontSize="30" />
      </div>

      <h2 className="text-lg font-bold text-gray-800 text-center mb-2 line-clamp-1">
        {layout.layout}
      </h2>

      <p className="text-sm text-gray-600 text-center line-clamp-3 flex-grow">
        {layout.description}
      </p>

      <div className="mt-auto flex items-center justify-between w-full pt-3 border-t border-gray-100">
        <span className="px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded-full">
          {layout.kpisUsed.length} KPIs
        </span>
        <span className="text-xs text-gray-400">
          {new Date(layout.lastUpdated).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
