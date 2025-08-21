"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import Modal from "../Dialog";
import type { Storyboard } from "./StoryboardBuilder";

interface StoryboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyboard: Storyboard;
}

export default function StoryboardModal({ isOpen, onClose, storyboard }: StoryboardModalProps) {
  const [fav, setFav] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="max-w-5xl">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-gradient-to-tr from-purple-500 to-fuchsia-600 flex items-center justify-center rounded-lg shadow">
              <Icon icon="mdi:book-open-variant" fontSize={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{storyboard.title}</h2>
              <p className="text-sm text-gray-600">{storyboard.description}</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-purple-50"
            onClick={() => setFav((f) => !f)}
          >
            <Icon
              icon={fav ? "material-symbols:bookmark" : "material-symbols:bookmark-outline"}
              fontSize={18}
            />
            Favourite
          </button>
        </div>

        {storyboard.businessQuestions?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Business Questions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {storyboard.businessQuestions.map((bq, i) => (
                <div key={i} className="p-3 rounded-md border text-sm border-purple-200 bg-purple-50">
                  <h5 className="font-semibold mb-1 text-gray-900">{bq.question}</h5>
                  <p className="text-gray-600">{bq.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Coupled KPIs & Filters</h4>
          <div className="flex flex-wrap gap-2">
            {storyboard.kpisUsed.map((kpiId) => (
              <span key={kpiId} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200">
                {kpiId}
              </span>
            ))}
          </div>
        </div>

        {storyboard.affiliateApplicability?.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Applicable Affiliates</h4>
            <div className="flex flex-wrap gap-2">
              {storyboard.affiliateApplicability.map((affiliate) => (
                <span key={affiliate} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200">
                  {affiliate}
                </span>
              ))}
            </div>
          </div>
        )}

        {storyboard.slides?.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Slides</h4>
            <ol className="list-decimal ml-5 space-y-2">
              {storyboard.slides.map((s, idx) => (
                <li key={idx} className="text-sm">
                  <span className="font-medium">{s.title}</span>
                  {s.notes && <span className="text-gray-600"> — {s.notes}</span>}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => setRequestSent(true)}
            disabled={requestSent}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              requestSent
                ? 'bg-green-100 text-green-700 border border-green-300 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800'
            }`}
          >
            {requestSent ? (
              <span className="flex items-center justify-center gap-2">
                <Icon icon="mdi:check-circle" fontSize={20} />
                Access Request Sent
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Icon icon="mdi:key-plus" fontSize={20} />
                Request Access
              </span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
