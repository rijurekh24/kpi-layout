import { Icon } from "@iconify/react";
import type { KPI } from "./KPIBuilder";

export default function KpiCard({ ...kpi }: KPI) {
  return (
    <div className="flex flex-col items-center p-5 rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer w-64 h-64">
      <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md mb-4">
        <Icon icon={kpi.displayIcon} fontSize="30" />
      </div>

      <h2 className="text-lg font-bold text-gray-800 text-center mb-2 line-clamp-1">
        {kpi.label}
      </h2>

      <p className="text-sm text-gray-600 text-center line-clamp-3 flex-grow">
        {kpi.shortDescription}
      </p>
    </div>
  );
}
