"use client";

import { useState } from "react";
import StoryboardCard, { StoryboardInfo } from "./StoryboardCard";
import StoryboardModal from "./StoryboardModal";

export interface Storyboard extends StoryboardInfo {
  kpisUsed: string[];
  layoutsUsed: string[];
  affiliateApplicability: string[];
  businessQuestions: { question: string; description: string }[];
  slides: {
    title: string;
    notes?: string;
    elements: { type: "kpi" | "layout"; id: string }[];
  }[];
}

export default function StoryboardBuilder({ storyboards }: { storyboards: Storyboard[] }) {
  const [selected, setSelected] = useState<Storyboard | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {storyboards.map((storyboard) => (
        <div key={storyboard.id} onClick={() => setSelected(storyboard)}>
          <StoryboardCard {...storyboard} />
        </div>
      ))}

      {selected && (
        <StoryboardModal storyboard={selected} isOpen={true} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
