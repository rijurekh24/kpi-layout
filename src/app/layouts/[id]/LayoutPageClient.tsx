"use client";

import { useEffect, useState } from "react";
import { KpiRenderer } from "@/components/kpis/KpiRenderer";
import { Layout } from "@/components/layouts/LayoutBuilder";

export default function LayoutPageClient({
  layoutData,
}: {
  layoutData: Layout;
}) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const currentPage = layoutData.pages[currentPageIndex];

  const nextPage = () => {
    if (currentPageIndex < layoutData.pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-1">{layoutData.layout}</h1>
      <p className="text-gray-600 mb-2">{layoutData.description}</p>
      <p className="text-gray-600 mb-6 text-xs">
        {new Date(layoutData.lastUpdated).toLocaleString("en-IN")}
      </p>

      {/* PAGE SECTION */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold">{currentPage.title}</h2>
        <div className="grid grid-cols-12 gap-4 mt-4">
          {currentPage.elements.map((el, j) => (
            <div
              key={el.kpiId}
              className={`col-span-${
                el.columns || 12
              } border border-gray-200 rounded-lg p-4 shadow-sm bg-white`}
            >
              <KpiRenderer kpiId={el.kpiId} />
              <p>{el.additionalText}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PAGE NAVIGATION */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevPage}
          disabled={currentPageIndex === 0}
          className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPageIndex === layoutData.pages.length - 1}
          className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
