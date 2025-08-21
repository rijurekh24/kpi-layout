"use client";

import { useState } from "react";
import LayoutCard from "./Layout";
import LayoutModal from "./LayoutModal";

export interface LayoutElement {
  kpiId: string;
  columns: number;
  title?: string;
  additionalText?: string;
}

export interface LayoutPage {
  title: string;
  totalColumns: number;
  elements: LayoutElement[];
}

export interface BusinessQuestion {
  question: string;
  description: string;
}

export interface Layout {
  id: string;
  layout: string;
  users: number;
  type: string;
  description: string;
  kpisUsed: string[];
  lastUpdated: string;
  pages: LayoutPage[];
  businessQuestions: BusinessQuestion[];
}

export default function LayoutBuilder({ layouts }: { layouts: Layout[] }) {
  const [selectedLayout, setSelectedLayout] = useState<Layout | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {layouts.map((layout) => (
        <div key={layout.id} onClick={() => setSelectedLayout(layout)}>
          <LayoutCard layout={layout} />
        </div>
      ))}

      {selectedLayout && (
        <LayoutModal
          layout={selectedLayout}
          isOpen={true}
          onClose={() => setSelectedLayout(null)}
        />
      )}
    </div>
  );
}
