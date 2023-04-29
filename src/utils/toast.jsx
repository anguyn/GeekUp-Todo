import React from "react";
import ReactDOM from "react-dom/client";
import Toast from "../components/Toasts";

let toastContainer = null;

const initToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.classList.add("toast-container");
    document.body.appendChild(toastContainer);
  }
};

const showToast = (type, message) => {
  initToastContainer();

  const hideToast = () => {
    root.unmount();
  };

  const root = ReactDOM.createRoot(toastContainer);
  root.render(<Toast type={type} message={message} onHide={hideToast} />);

  setTimeout(() => {
    hideToast();
  }, 1600);
};

export default showToast;
