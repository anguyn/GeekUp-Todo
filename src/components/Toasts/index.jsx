import React, { useState, useEffect } from "react";

import { InfoIcon, SuccessIcon, ErrorIcon, CloseIcon } from "../SVGs";

const Toast = ({ type, message, onHide }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleHide = () => {
    setShow(false);
    setTimeout(onHide, 100);
  };

  return (
    <div
      className={`toast-main ${
        show ? "animate-fade-in-bottom" : "animate-fade-out-top"
      }`}
    >
      <div
        className={`alert shadow-lg z-[60] flex rounded p-4 ${
          type === "info"
            ? "alert-info"
            : type === "success"
            ? "alert-success"
            : "alert-error"
        } ${show ? "opacity-100" : "opacity-0"}`}
      >
        {type === "info" ? (
          <InfoIcon className="stroke-current flex-shrink-0 w-6 h-6" />
        ) : type === "success" ? (
          <SuccessIcon className="stroke-current flex-shrink-0 h-6 w-6" />
        ) : (
          <ErrorIcon className="stroke-current flex-shrink-0 h-6 w-6" />
        )}
        <span>{message}</span>
        <div className="block" onClick={handleHide}>
          <CloseIcon className="cursor-pointer p-1 hover:bg-slate-500 transition-all duration-100 ease-linear rounded-full h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default Toast;
