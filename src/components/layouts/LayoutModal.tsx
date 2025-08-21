"use client";

import { Icon, loadIcon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState, useCallback } from "react";
import Modal from "../Dialog";
import { Layout } from "./LayoutBuilder";
import { KPI } from "../kpis/KPIBuilder";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface LayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  layout: Layout;
}

const LayoutModal = ({ isOpen, onClose, layout }: LayoutModalProps) => {
  useEffect(() => {
    if (isOpen) loadIcon("material-symbols:bookmark");
  }, [isOpen]);

  const [fav, setFav] = useState(false);
  const [showLayoutView, setShowLayoutView] = useState(false);
  const [kpisData, setKpisData] = useState<KPI[]>([]);
  const [loadingKpis, setLoadingKpis] = useState(false);

  const fetchKpiData = useCallback(async () => {
    if (!layout.kpisUsed.length) return;

    setLoadingKpis(true);
    try {
      const kpiPromises = layout.kpisUsed.map(async (kpiId) => {
        const response = await fetch(`/api/store/kpis/${kpiId}`);
        if (response.ok) {
          return response.json();
        }
        return null;
      });

      const results = await Promise.all(kpiPromises);
      const validKpis = results.filter(Boolean);
      setKpisData(validKpis);
    } catch (error) {
      console.error("Error fetching KPI data:", error);
    } finally {
      setLoadingKpis(false);
    }
  }, [layout.kpisUsed]);

  useEffect(() => {
    if (showLayoutView) {
      fetchKpiData();
    }
  }, [showLayoutView, fetchKpiData]);

  const renderKpiChart = (kpi: KPI) => {
    if (!kpi.dataPoints?.length) return null;

    const categories = kpi.dataPoints.map((dp) => dp.x);
    const series = [
      { name: kpi.label, data: kpi.dataPoints.map((dp) => dp.y) },
    ];

    const options: ApexCharts.ApexOptions = {
      chart: {
        type: "line",
        toolbar: { show: false },
        fontFamily: "inherit",
        height: 200,
      },
      stroke: { curve: "smooth", width: 2, colors: ["#3b82f6"] },
      markers: {
        size: 3,
        colors: ["#fff"],
        strokeColors: "#3b82f6",
        strokeWidth: 2,
      },
      xaxis: {
        categories,
        labels: { style: { colors: "#666", fontSize: "11px" } },
      },
      yaxis: {
        labels: { style: { colors: "#666", fontSize: "11px" } },
        title: { text: kpi.unit, style: { color: "#666" } },
      },
      grid: { borderColor: "#e5e7eb", strokeDashArray: 2 },
      tooltip: { theme: "light" },
      colors: ["#3b82f6"],
      title: {
        text: kpi.label,
        align: "left",
        style: { fontSize: "14px", fontWeight: "600", color: "#374151" },
      },
    };

    return (
      <div className="bg-white rounded-lg border p-4">
        <Chart type="line" options={options} series={series} height={200} />
        <p className="text-xs text-gray-500 mt-2">{kpi.shortDescription}</p>
      </div>
    );
  };

  if (showLayoutView) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} width="max-w-6xl">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowLayoutView(false)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
              >
                <Icon icon="mdi:arrow-left" fontSize={20} />
                <span className="text-sm font-medium">Back to Details</span>
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {layout.layout} - Layout View
            </h2>
          </div>

          {loadingKpis ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Loading KPI data...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {layout.pages.map((page, pageIndex) => (
                <div key={pageIndex} className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                    {page.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {page.elements.map((element, elementIndex) => {
                      const kpiData = kpisData.find(
                        (kpi) => kpi.id === element.kpiId
                      );
                      return (
                        <div
                          key={elementIndex}
                          className={`${
                            element.columns <= 6 ? "col-span-1" : "col-span-2"
                          }`}
                        >
                          {kpiData ? (
                            renderKpiChart(kpiData)
                          ) : (
                            <div className="bg-gray-100 rounded-lg border p-4 h-48 flex items-center justify-center">
                              <p className="text-gray-500">
                                No data available for {element.title}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    );
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="max-w-4xl">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md mb-4">
            <Icon icon="material-symbols:dashboard-outline" fontSize="30" />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              {layout.layout}
              <span className="px-2 py-0.5 text-xs rounded-sm border border-gray-400 text-gray-600">
                LAYOUT
              </span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">{layout.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 border rounded-lg divide-x">
          <StatBox label="Used" value={layout.users.toString()} />
          <StatBox label="Type" value={layout.type} />
          <StatBox label="Pages" value={layout.pages.length.toString()} />
          <StatBox label="KPIs" value={layout.kpisUsed.length.toString()} />
          <StatBox
            label="Last Updated"
            value={new Date(layout.lastUpdated).toLocaleDateString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-md font-semibold text-gray-800">Pages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {layout.pages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="p-3 rounded-md border bg-gray-50 hover:bg-gray-100 transition"
              >
                <p className="text-xs text-gray-500 mb-1">
                  Page {pageIndex + 1}
                </p>
                <h4 className="font-semibold text-sm mb-2">{page.title}</h4>
                <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                  {page.elements.map((el, i) => (
                    <li key={i}>{el.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {layout.businessQuestions?.length > 0 && (
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Business Questions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {layout.businessQuestions.map((bq, i) => (
                <div
                  key={i}
                  className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 transition"
                >
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">
                    {bq.question}
                  </h4>
                  <p className="text-xs text-gray-600">{bq.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowLayoutView(true)}
            className="p-2 flex items-center justify-center gap-2 border rounded-md text-sm bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
          >
            <Icon icon="mdi:eye-outline" fontSize={20} />
            View Layout
          </button>
          <button
            onClick={() => setFav((prev) => !prev)}
            className="p-2 flex items-center justify-center gap-2 border rounded-md text-sm bg-white text-gray-700 font-semibold hover:bg-gray-50 active:bg-gray-100 transition"
          >
            <Icon
              icon={
                fav
                  ? "material-symbols:bookmark"
                  : "material-symbols:bookmark-outline"
              }
              fontSize={20}
            />
            {fav ? "Added to My Layouts" : "Add to My Layouts"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center p-3">
    <span className="text-sm font-semibold text-gray-900">{value}</span>
    <span className="text-xs text-gray-500">{label}</span>
  </div>
);

export default LayoutModal;
