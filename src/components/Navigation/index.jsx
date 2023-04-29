import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";

import { GeekUpLight, GeekUpDark, Hamburger } from "../SVGs";

const Navigation = () => {
  const location = useLocation();

  const { mode, setMode } = useThemeSwitcher();

  const [display, setDisplay] = useState(false);

  const handleDisplay = () => {
    if (!display) {
      setDisplay(!display);
    }
  };

  const handleDarkMode = (e) => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <>
      {display && (
        <div className="drawer">
          <input
            id="my-drawer-3"
            type="checkbox"
            onChange={(e) => {
              setTimeout(() => setDisplay(e.target.checked), 200);
            }}
            className="drawer-toggle"
          />
          <div className="drawer-content flex flex-col"></div>
          <div className="drawer-side z-[52]">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 bg-base-100">
              {/* {theme === "dark" ? (
                <GeekUpDark className="w-[100px] mb-4" />
              ) : (
                <GeekUpLight className="w-[100px] mb-4" />
              )} */}
              <li className={location.pathname === "/" ? "active" : ""}>
                <Link to="/">Home</Link>
              </li>
              <li className={location.pathname === "/todo" ? "active" : ""}>
                <Link to="/todo">To do</Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="w-full navbar sticky top-0 left-0 z-[51] shadow">
        <div className="flex-none lg:hidden">
          <label
            htmlFor="my-drawer-3"
            className="btn btn-square btn-ghost"
            onClick={handleDisplay}
          >
            <Hamburger className="inline-block w-6 h-6 stroke-current" />
          </label>
        </div>
        <div className="px-2 mx-2">
          {mode === "dark" ? (
            <GeekUpDark className="h-full w-[100px]" />
          ) : (
            <GeekUpLight className="h-full w-[100px]" />
          )}
        </div>
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal">
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === "/todo" ? "active" : ""}>
              <Link to="/todo">To do</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 justify-end">
          🌞
          <input
            type="checkbox"
            className="toggle mx-2"
            checked={mode === "dark"}
            onChange={handleDarkMode}
          />
          🌚
        </div>
      </div>
    </>
  );
};

export default Navigation;
