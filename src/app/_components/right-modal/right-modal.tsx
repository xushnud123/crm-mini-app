import cn from "@/lib/cn";
import React, { FC } from "react";
import { Close } from "../icons";

interface RightModalProps {
  open: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const RightModal: FC<RightModalProps> = ({ open, closeModal, children }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50",
        open ? "block" : "hidden"
      )}
    >
      <div className="w-screen h-screen flex">
        <div
          className="w-[calc(100vw_-_450px)] h-screen"
          onClick={closeModal}
        ></div>
        <div className="w-[450px] relative mr-0 ml-auto h-screen bg-white rounded shadow-lg p-6 pt-12">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 hover:bg-gray-200 p-1 rounded"
          >
            <Close className="size-6" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default RightModal;
