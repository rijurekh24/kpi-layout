"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import Modal from "../Dialog";
import { KPI } from "./KPIBuilder";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface KPIModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpi: KPI;
}

const KPIModal = ({ isOpen, onClose, kpi }: KPIModalProps) => {
  const [fav, setFav] = useState(false);

  const renderChart = useCallback(() => {
    if (!kpi.dataPoints?.length) return null;

    const categories = kpi.dataPoints.map((dp) => dp.x);
    const series = [
      { name: kpi.label, data: kpi.dataPoints.map((dp) => dp.y) },
    ];

    const options: ApexCharts.ApexOptions = {
      chart: { type: "line", toolbar: { show: false }, fontFamily: "inherit" },
      stroke: { curve: "smooth", width: 3, colors: ["#16a34a"] },
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColors: "#16a34a",
        strokeWidth: 2,
      },
      xaxis: {
        categories,
        labels: { style: { colors: "#444", fontSize: "12px" } },
      },
      yaxis: { labels: { style: { colors: "#444", fontSize: "12px" } } },
      grid: { borderColor: "#e0e0e0", strokeDashArray: 4 },
      tooltip: { theme: "light" },
      colors: ["#22c55e"],
    };

    return (
      <div className="mt-2">
        <Chart type="line" options={options} series={series} height={260} />
      </div>
    );
  }, [kpi.dataPoints]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="max-w-4xl">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <div className="h-14 w-14 bg-gradient-to-tr from-green-400 to-emerald-600 flex items-center justify-center rounded-lg shadow">
            <Icon icon={kpi.displayIcon} fontSize={26} className="text-white" />
          </div>

          <h2 className="text-xl font-bold uppercase">{kpi.label}</h2>
          <p className="text-sm text-gray-500">{kpi.shortDescription}</p>
          <p className="text-md text-gray-800">{kpi.description}</p>

          {kpi.affiliateApplicability.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {kpi.affiliateApplicability.map((aff) => (
                <div
                  key={aff}
                  className="text-xs border bg-green-50 px-2 py-0.5 border-green-300 rounded"
                >
                  {aff}
                </div>
              ))}
            </div>
          )}

          {kpi.businessQuestions?.length > 0 && (
            <div className="mt-4 w-full">
              <h4 className="text-sm font-semibold mb-2">Business Questions</h4>
              <div className="grid grid-cols-1 gap-2">
                {kpi.businessQuestions.map((bq, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-md border text-sm border-green-200 bg-green-50 hover:bg-green-100"
                  >
                    <h5 className="font-semibold mb-1 text-gray-900">
                      {bq.question}
                    </h5>
                    <p className="text-gray-600">{bq.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-semibold mb-2">KPI Trend</h4>
          {renderChart()}

          {kpi.calculation && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Calculation</h4>
              <p className="text-gray-700">{kpi.calculation}</p>
            </div>
          )}
        </div>
      </div>

      <button
        className="flex items-center gap-2 justify-center p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-b-md hover:opacity-90 transition w-full"
        onClick={() => setFav(!fav)}
      >
        <Icon
          icon={
            fav
              ? "material-symbols:bookmark"
              : "material-symbols:bookmark-outline"
          }
          fontSize={20}
        />
        <span className="text-sm font-semibold">Add to Favourites</span>
      </button>
    </Modal>
  );
};

export default KPIModal;
