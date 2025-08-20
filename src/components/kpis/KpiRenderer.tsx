"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { KPI } from "./KPIBuilder";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function KpiRenderer({ kpiId }: { kpiId: string }) {
  const [data, setData] = useState<KPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState<any>(null);

  useEffect(() => {
    const fetchKpi = async () => {
      try {
        const res = await fetch(`/api/store/kpis/${kpiId}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
          setChartType(json.visualsAvailable?.[0] || "line");
        }
      } catch (err) {
        console.error(`Error fetching KPI ${kpiId}:`, err);
      } finally {
        setLoading(false);
      }
    };
    fetchKpi();
  }, [kpiId]);

  const renderChart = useCallback(() => {
    if (!data || !data.dataPoints?.length || !chartType) return null;

    if (["pie", "donut"].includes(chartType)) {
      const series = data.dataPoints.map((dp) => dp.y);
      const labels = data.dataPoints.map((dp) => dp.x);

      const options: ApexCharts.ApexOptions = {
        labels: labels as any,
        chart: {
          type: chartType as any,
          toolbar: { show: false },
          animations: {
            enabled: true,
            speed: 400,
          },
        },
        legend: {
          position: "bottom",
          fontSize: "13px",
          fontWeight: 500,
          labels: {
            colors: "#444",
          },
          itemMargin: {
            horizontal: 10,
            vertical: 4,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (val: number) => `${val.toFixed(2)}%`,
          style: {
            fontSize: "10px",
            fontWeight: 500,
            colors: ["#fff"],
          },
          dropShadow: {
            enabled: false,
          },
        },
        tooltip: {
          theme: "dark",
        },
        fill: {
          colors: ["#000", "#444", "#777", "#aaa", "#ccc"],
        },
        stroke: {
          show: false,
        },
      };

      return (
        <Chart
          type={chartType}
          options={options}
          series={series}
          height={300}
        />
      );
    }

    const categories = data.dataPoints.map((dp) => dp.x);
    const series = [
      {
        name: data.label,
        data: data.dataPoints.map((dp) => dp.y),
      },
    ];

    const options: ApexCharts.ApexOptions = {
      chart: {
        type: chartType as any,
        toolbar: { show: false },
        foreColor: "#000",
        fontFamily: "inherit",
        animations: {
          enabled: true,
          speed: 400,
        },
      },
      xaxis: {
        categories,
        labels: {
          style: {
            colors: "#333",
            fontSize: "12px",
          },
        },
        axisBorder: {
          color: "#e0e0e0",
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#333",
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
      <Chart
        type={chartType as any}
        options={options}
        series={series}
        height={200}
      />
    );
  }, [chartType, data]);

  if (loading) return <p className="text-xs text-gray-400">Loading KPI...</p>;
  if (!data) return <p className="text-xs text-red-400">KPI not found</p>;

  return (
    <div className="mt-3 space-y-2">
      <div className="text-sm">
        <div className="font-semibold text-gray-800">
          {data.label} ({data.unit})
        </div>
        <p className="text-gray-600">{data.shortDescription}</p>
      </div>

      {data.visualsAvailable?.length > 1 && (
        <div className="flex gap-2">
          {data.visualsAvailable.map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`text-xs px-2 py-1 border rounded ${
                chartType === type
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {renderChart()}
    </div>
  );
}
