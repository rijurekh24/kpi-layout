"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react";

type Toast = {
  id: number;
  message: string;
  type?: "success" | "error" | "info" | "warning" | "default";
};

type ToastContextType = {
  showToast: (message: string, type?: Toast["type"]) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast["type"] = "default") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2500);
  };

  const typeStyles: Record<Toast["type"], string> = {
    success: "from-green-500 to-emerald-600 text-white",
    error: "from-red-500 to-rose-600 text-white",
    info: "from-blue-500 to-indigo-600 text-white",
    warning: "from-yellow-400 to-orange-500 text-black",
    default: "from-gray-200 to-gray-300 text-black",
  };

  const typeIcons: Record<Toast["type"], string> = {
    success: "mdi:check-circle",
    error: "mdi:alert-circle",
    info: "mdi:information",
    warning: "mdi:alert",
    default: "mdi:bell-outline",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] flex flex-col gap-3 items-center">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={clsx(
              "flex items-center gap-3 px-4 py-2 rounded-xl shadow-lg max-w-sm w-full text-sm animate-slide-up",
              "bg-gradient-to-br",
              typeStyles[toast.type || "default"]
            )}
          >
            <Icon
              icon={typeIcons[toast.type || "default"]}
              fontSize={20}
              className="shrink-0"
            />
            <span className="flex-1">{toast.message}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
