"use client";

import { Icon, loadIcon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import Modal from "../Dialog";
import { Layout } from "./LayoutBuilder";
import clsx from "clsx";
import Link from "next/link";

interface LayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  layout: Layout;
}

interface KPIData {
  id: string;
  label: string;
  unit: string;
  shortDescription?: string;
}

const LayoutModal = ({ isOpen, onClose, layout }: LayoutModalProps) => {
  useEffect(() => {
    if (isOpen) loadIcon("material-symbols:bookmark");
  }, [isOpen]);

  const [fav, setFav] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="max-w-5xl">
      <div className="p-6 space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="aspect-square h-12 w-12 bg-slate-200 flex items-center justify-center rounded-sm mb-4">
            <Icon icon="material-symbols:dashboard-outline" fontSize={22} />
          </div>
          <h2 className="text-xl font-semibold uppercase mb-1 text-gray-800 flex items-center gap-2">
            {layout.layout}
            <div className="border text-xs inline p-1 px-2 rounded-sm border-gray-500 text-gray-500">
              LAYOUT
            </div>
          </h2>
          <p className="text-md text-gray-600 max-w-9/12">
            {layout.description}
          </p>
        </div>

        <div className="flex gap-4 items-center justify-center h-14">
          <HorizontalItem label="Used" value={layout.users.toString()} />
          <Divider />
          <HorizontalItem label="Type" value={layout.type} />
          <Divider />
          <HorizontalItem
            label="Pages"
            value={layout.pages.length.toString()}
          />
          <Divider />
          <HorizontalItem
            label="KPIs"
            value={layout.kpisUsed.length.toString()}
          />
          <Divider />
          <HorizontalItem
            label="Last Updated"
            value={new Date(layout.lastUpdated).toLocaleDateString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          />
        </div>

        <div className="grid grid-cols-12 gap-2 bg-slate-200 p-2">
          {layout.pages.map((page, pageIndex) => (
            <div key={pageIndex} className="col-span-6 bg-slate-50 p-2 rounded">
              <p className="text-xs text-gray-500">page {pageIndex + 1}</p>
              <h3 className="text-md font-bold mb-2">{page.title}</h3>
              <div className="grid grid-cols-12">
                {page.elements.map((el, elIndex) => {
                  return (
                    <div key={elIndex} className={`col-span-6`}>
                      <h4 className="text-sm mb-1">{el.title}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {layout.businessQuestions?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Business Questions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {layout.businessQuestions.map((bq, i) => (
                <div
                  key={i}
                  className={
                    "p-3 min-h-[5rem] rounded-sm border text-sm hover:bg-gray-200 hover:border-gray-300 border-gray-200 bg-gray-100 cursor-normal select-none"
                  }
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

        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-2 justify-center p-2 bg-black text-white rounded-t-sm hover:bg-gray-800 active:bg-gray-900 cursor-pointer w-full transition">
            <span className="text-sm font-semibold">Preview Layout</span>
          </button>
          <button
            className="flex items-center gap-2 justify-center p-2 bg-white border border-black rounded-b-sm hover:bg-gray-100 active:bg-gray-200 cursor-pointer w-full transition"
            onClick={() => {
              setFav((prev) => !prev);
            }}
          >
            <Icon
              icon={
                fav
                  ? "material-symbols:bookmark"
                  : "material-symbols:bookmark-outline"
              }
              fontSize={20}
            />
            <span className="text-sm font-semibold">Add to my layouts</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

const Divider = () => {
  return <div className="border-l border-gray-300 h-full mx-4"></div>;
};

const HorizontalItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <h3 className="font-bold text-sm">{value}</h3>
      <h4 className="text-xs text-gray-500 ">{label}</h4>
    </div>
  );
};

export default LayoutModal;
