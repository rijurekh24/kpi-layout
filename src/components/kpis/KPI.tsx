import { Icon } from "@iconify/react";
import type { KPI } from "./KPIBuilder";

export default function KPI({ ...kpi }: KPI) {
  return (
    <div className="p-2 bg-white rounded shadow-sm outline outline-gray-300 cursor-pointer hover:shadow-md transition-shadow group">
      <div className="flex gap-4">
        <div className="bg-gray-200 flex items-center justify-center rounded h-[5rem] aspect-square group-hover:bg-gray-300 transition-colors">
          <Icon icon={kpi.displayIcon} fontSize={"28"} />
        </div>
        <div className="flex-1 flex flex-col">
          <h2 className="text-md font-bold">{kpi.label}</h2>
          <p className="text-gray-600 text-sm">{kpi.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
