"use client";
import React from "react";
import KPIBuilder, { KPI } from "../kpis/KPIBuilder";
import LayoutBuilder, { Layout } from "../layouts/LayoutBuilder";
import StoryboardBuilder, { Storyboard } from "../storyboards/StoryboardBuilder";

interface Featured {
  kpis: [String];
  layout: [String];
  stories?: [String];
}

const FeaturesBuilder = ({
  features,
  kpis,
  layouts,
  storyboards,
}: {
  features: Featured | null;
  kpis: KPI[];
  layouts: Layout[];
  storyboards?: Storyboard[];
}) => {
  // Early return if features is not loaded yet
  if (!features) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading featured content...</p>
      </div>
    );
  }

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
      {storyboards && features?.stories && features.stories.length > 0 && (
        <>
          <h1 className="text-2xl font-bold mt-12">Featured Storyboards</h1>
          <p className="text-gray-600 mb-4">Narratives curated for quick reviews</p>
          <StoryboardBuilder
            storyboards={storyboards.filter((s) => features.stories?.includes(s.id))}
          />
        </>
      )}
    </div>
  );
};

export default FeaturesBuilder;
