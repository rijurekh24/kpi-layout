"use client";
import React from "react";
import KPIBuilder, { KPI } from "../kpis/KPIBuilder";
import LayoutBuilder, { Layout } from "../layouts/LayoutBuilder";

interface Featured {
  kpis: [String];
  layout: [String];
}

const FeaturesBuilder = ({
  features,
  kpis,
  layouts,
}: {
  features: Featured;
  kpis: KPI[];
  layouts: Layout[];
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Featured KPIS</h1>
      <p className="text-gray-600 mb-4">Curated top pickups from this week.</p>
      <KPIBuilder kpis={kpis.filter((kpi) => features.kpis.includes(kpi.id))} />
      <h1 className="text-2xl font-bold mt-12">Trending Layouts</h1>
      <p className="text-gray-600 mb-4">Most populars by community</p>
      <LayoutBuilder
        layouts={layouts.filter((layout) =>
          features.layout.includes(layout.id)
        )}
      />
    </div>
  );
};

export default FeaturesBuilder;
