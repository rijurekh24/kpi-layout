"use client";
import Searchbar from "@/components/Searchbar";
import Tabs from "@/components/Tabs";
import FeaturesBuilder from "@/components/featured/FeaturesBuilder";
import KPIBuilder from "@/components/kpis/KPIBuilder";
import LayoutBuilder from "@/components/layouts/LayoutBuilder";
import { useEffect, useMemo, useState } from "react";

const fetchFeatured = async () => {
  const response = await fetch("/api/store/featured");
  if (!response.ok) {
    throw new Error("Failed to fetch KPIs");
  }
  return response.json();
};
const fetchKPIs = async (searchTerm?: string) => {
  const response = await fetch(
    "/api/store/kpis" + (searchTerm ? `?searchString=${searchTerm}` : "")
  );
  if (!response.ok) {
    throw new Error("Failed to fetch KPIs");
  }
  return response.json();
};

const fetchLayouts = async (searchTerm?: string) => {
  const response = await fetch(
    "/api/store/layout" + (searchTerm ? `?searchString=${searchTerm}` : "")
  );
  if (!response.ok) {
    throw new Error("Failed to fetch KPIs");
  }
  return response.json();
};

function Page() {
  const [curTab, setCurTab] = useState<string>("Featured");

  const [featured, setFeatured] = useState<any>(null);
  const [kpis, setKpis] = useState<any[]>([]);
  const [layouts, setLayouts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSearchHistoryPanel, setShowSearchHistoryPanel] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (searchTerm?: string) => {
    setLoading(true);
    try {
      const [kpiData, layoutData, featuredData] = await Promise.all([
        fetchKPIs(searchTerm),
        fetchLayouts(searchTerm),
        fetchFeatured(),
      ]);
      setKpis(kpiData);
      setLayouts(layoutData);
      setFeatured(featuredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const [init, setInit] = useState(false);

  useEffect(() => {
    fetchData().then(() => setInit(true));
  }, []);

  useEffect(() => {
    if (!init || loading) return;

    const timer = setTimeout(() => {
      fetchData(searchTerm);

      if (searchTerm.length > 0) {
        const historyString = localStorage.getItem("searchHistory");
        let history: string[] = historyString ? JSON.parse(historyString) : [];

        history = history.filter((item) => item !== searchTerm);

        history.unshift(searchTerm);

        if (history.length > 20) history = history.slice(0, 20);

        localStorage.setItem("searchHistory", JSON.stringify(history));
        setShowSearchHistoryPanel(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const renderTabContent = useMemo(() => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading...</p>
        </div>
      );
    }

    switch (curTab) {
      case "Featured":
        return (
          <FeaturesBuilder features={featured} kpis={kpis} layouts={layouts} />
        );
      case "KPI":
        return <KPIBuilder kpis={kpis} />;
      case "Layouts":
        return <LayoutBuilder layouts={layouts} />;
      default:
        return null;
    }
  }, [curTab, loading, kpis]);

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-gray-200 relative p-4 
      scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-black scrollbar-track-transparent"
    >
      <h1 className="text-3xl font-bold mt-[1rem]">Library</h1>
      <h2 className="text-lg font-medium mt-2 capitalize text-gray-600">
        Browse for assests needed to report and present analysis
      </h2>

      <Searchbar
        placeholder="Type to Search"
        className="mt-8 w-[min(90vw,45rem)]"
        onchange={(val) => setSearchTerm(val)}
        value={searchTerm}
        setShowSearchHistoryPanel={setShowSearchHistoryPanel}
        showSearchHistoryPanel={showSearchHistoryPanel}
        history={"searchHistory"}
      />

      <Tabs
        curTab={curTab}
        onChange={setCurTab}
        className="mt-6 w-[min(90vw,35rem)]"
        items={["Featured", "KPI", "Layouts"]}
      />

      <div className="mt-6 w-[90vw] md:w-[70vw] flex-1  px-3 scrollbar-thin">
        {renderTabContent}
      </div>
    </div>
  );
}

export default Page;
