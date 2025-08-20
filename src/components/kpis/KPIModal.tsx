"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import Modal from "../Dialog";
import { KPI } from "./KPIBuilder";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface KPIModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpi: KPI;
}

const KPIModal = ({ isOpen, onClose, kpi }: KPIModalProps) => {
  const [selectedChart, setSelectedChart] = useState<string | null>(
    kpi.visualsAvailable?.[0] || null
  );

  const [fav, setFav] = useState(false);

  const renderChart = useCallback(() => {
    if (!selectedChart || !kpi.dataPoints?.length) return null;

    const categories = kpi.dataPoints.map((dp) => dp.x);
    const series = [
      {
        name: kpi.label,
        data: kpi.dataPoints.map((dp) => dp.y),
      },
    ];

    const options: ApexCharts.ApexOptions = {
      chart: {
        type: selectedChart as any,
        toolbar: { show: false },
        foreColor: "#000",
        fontFamily: "inherit",
        animations: {
          enabled: true,
          speed: 400,
          animateGradually: {
            enabled: false,
            delay: 20,
          },
          dynamicAnimation: {
            enabled: false,
            speed: 100,
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: "60%",
        },
      },

      xaxis: {
        categories,
        labels: {
          style: {
            colors: "#000",
            fontSize: "12px",
          },
        },
        axisBorder: {
          color: "#e0e0e0",
        },
        axisTicks: {
          color: "#e0e0e0",
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#000",
            fontSize: "12px",
          },
        },
      },
      grid: {
        borderColor: "#e0e0e0",
        strokeDashArray: 4,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        colors: ["#000"],
        opacity: 1,
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#000"],
      },
      tooltip: {
        theme: "light",
      },
    };

    return (
      <div className="mt-4">
        <Chart
          type={selectedChart as any}
          options={options}
          series={series}
          height={200}
        />
      </div>
    );
  }, [selectedChart, kpi.dataPoints, fav]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="max-w-3xl">
      <div className="p-6 space-y-4">
        <div className="flex flex-col items-center text-center">
          <div className="aspect-square h-12 w-12 bg-slate-200 flex items-center justify-center rounded-sm mb-3">
            <Icon icon={kpi.displayIcon} fontSize={22} />
          </div>
          <h2 className="text-xl font-semibold uppercase">{kpi.label}</h2>
          <p className="text-sm text-gray-500 mb-1">{kpi.shortDescription}</p>
          <p className="text-md text-gray-800">{kpi.description}</p>
        </div>

        {kpi.affiliateApplicability.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {kpi.affiliateApplicability.map((aff) => (
              <div
                key={aff}
                className="text-xs border bg-slate-200 px-2 py-0.5 border-gray-300 rounded-sm"
              >
                {aff}
              </div>
            ))}
          </div>
        )}

        {kpi.visualsAvailable?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Available Charts</h4>
            <div>
              <div className="flex gap-2">
                {kpi.visualsAvailable.map((chartType) => (
                  <button
                    key={chartType}
                    onClick={() => setSelectedChart(chartType)}
                    className={`text-xs px-3 py-1 rounded border ${
                      selectedChart === chartType
                        ? "bg-black text-white"
                        : "bg-slate-100 text-gray-800 cursor-pointer hover:bg-slate-200"
                    }`}
                  >
                    {chartType.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="flex-1">{renderChart()}</div>
            </div>
          </div>
        )}

        {kpi.businessQuestions?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Business Questions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {kpi.businessQuestions.map((bq, i) => (
                <div
                  key={i}
                  className={clsx(
                    "p-3 min-h-[5rem] rounded-sm border text-sm hover:bg-gray-200 hover:border-gray-300 border-gray-200 bg-gray-100 cursor-normal select-none"
                  )}
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

        {kpi.calculation && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Calculation</h4>
            <p className="text-gray-700">{kpi.calculation}</p>
          </div>
        )}
      </div>

      <button
        className="flex items-center gap-2 justify-center p-2 bg-black text-white rounded-b-sm hover:bg-gray-800 cursor-pointer w-full transition"
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
