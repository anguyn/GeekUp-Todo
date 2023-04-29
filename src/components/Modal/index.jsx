import React from "react";
import { WarningIcon } from "../SVGs";

const Modal = ({ type, title, message, setShow, setConfirmation }) => {
  return (
    <>
      <div className="fixed inset-0 z-[70] overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full backdrop-blur-sm"
          onClick={() => {
            setConfirmation(false);
            setShow(false);
          }}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-3 sm:flex">
              <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                {type === "delete" && (
                  <WarningIcon className="w-6 h-6 text-red-600" />
                )}
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <h4 className="text-lg font-medium text-gray-800">{title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                  {message}
                </p>
                <div className="items-center gap-2 mt-3 sm:flex">
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                    onClick={() => {
                      setConfirmation(true);
                      setShow(false);
                    }}
                  >
                    OK
                  </button>
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                    onClick={() => {
                      setConfirmation(false);
                      setShow(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
