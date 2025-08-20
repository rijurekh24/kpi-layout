"use client";

import { Icon, loadIcon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import Modal from "../Dialog";
import { Layout } from "./LayoutBuilder";

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
            onClick={() => setFav((prev) => !prev)}
            className="p-2 flex items-center justify-center gap-2 border rounded-md text-sm  bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold hover:bg-gray-100 active:bg-gray-200 transition"
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
