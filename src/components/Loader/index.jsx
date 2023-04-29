import React from "react";
import { useLocation } from "react-router-dom";

const Loader = () => {
  const location = useLocation();

  return (
    <div className="loader">
      <div className="loader-inner">
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
      </div>
      <h1 className="">Redirecting to {location.pathname} ...</h1>
    </div>
  );
};

export default Loader;
