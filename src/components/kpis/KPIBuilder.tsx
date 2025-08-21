"use client";

import { useState } from "react";
import KPI from "./KPI";
import KPIModal from "./KPIModal";

export interface BusinessQuestion {
  question: string;
  description: string;
}

export interface DataPoint {
  x: string | number;
  y: number;
}

export interface KPI {
  id: string;
  label: string;
  api: string;
  unit: string;
  calculation: string;
  shortDescription: string;
  description: string;
  businessQuestions: BusinessQuestion[];
  visualsAvailable: string[];
  affiliateApplicability: string[];
  displayIcon: string;
  dataPoints?: DataPoint[];
}

export default function KPIBuilder({ kpis }: { kpis: KPI[] }) {
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
      {kpis.map((kpi) => (
        <div
          onClick={() => {
            setSelectedKPI(kpi);
          }}
          key={kpi.id}
        >
          <KPI {...kpi} />
        </div>
      ))}

      {selectedKPI && (
        <KPIModal
          isOpen={selectedKPI !== null}
          onClose={() => setSelectedKPI(null)}
          kpi={selectedKPI}
        />
      )}
    </div>
  );
}
