import { Icon } from "@iconify/react";
import { Layout } from "./LayoutBuilder";

export default function LayoutCard({ layout }: { layout: Layout }) {
  return (
    <div className="p-2 bg-white rounded shadow-sm outline outline-gray-300 cursor-pointer hover:shadow-md transition-shadow group">
      <div className="flex gap-4">
        <div className="bg-gray-200 flex items-center justify-center rounded h-[6rem] aspect-square group-hover:bg-gray-300 transition-colors">
          <Icon icon="material-symbols:dashboard-outline" fontSize="28" />
        </div>
        <div className="flex-1 flex flex-col">
          <h2 className="text-md font-bold">{layout.layout}</h2>
          <p className="text-gray-600 text-sm line-clamp-2">
            {layout.description}
          </p>
          <span className="text-xs text-gray-400 mt-auto">
            {layout.kpisUsed.length} KPIs · Updated{" "}
            {new Date(layout.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
