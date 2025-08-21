"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { LinkSimpleIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { Fragment } from "react";
import { useToast } from "./Toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  width = "max-w-md",
}: ModalProps) {
  const { showToast } = useToast();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={`w-full ${width} transform overflow-hidden rounded-sm bg-white p-2 align-middle shadow-xl transition-all`}
              >
                <div className="flex justify-end items-center gap-2">
                  <button
                    onClick={() => showToast("Copied")}
                    className="text-gray-400 hover:text-gray-800 active:text-gray-500 transition cursor-pointer"
                  >
                    <LinkSimpleIcon size={20} weight="bold" />
                  </button>

                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-red-600 transition cursor-pointer"
                  >
                    <XIcon size={20} weight="bold" />
                  </button>
                </div>
                <div>{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
