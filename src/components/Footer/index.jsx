import React from "react";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";

import {
  GeekUpLight,
  GeekUpDark,
  Twitter,
  Instagram,
  Facebook,
  LinkedIn,
} from "../SVGs/index";

const Footer = () => {
  const { mode } = useThemeSwitcher();

  return (
    <>
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <div>
          {mode === "dark" ? <GeekUpDark /> : <GeekUpLight />}
          <p className="mt-2">
            GEEK Up Technology JSC.
            <br />
            Providing reliable tech since 2014
          </p>
        </div>
        <div>
          <span className="footer-title">Social</span>
          <div className="grid grid-flow-col gap-4">
            <a href="https://twitter.com/anguynvn99" target="_blank">
              <Twitter className="fill-current" />
            </a>
            <a href="https://www.instagram.com/annnv_01/" target="_blank">
              <Instagram className="fill-current" />
            </a>
            <a href="https://www.facebook.com/GEEKUpVN" target="_blank">
              <Facebook className="fill-current" />
            </a>
            <a href="https://www.linkedin.com/company/geekupvn" target="_blank">
              <LinkedIn className="fill-current" />
            </a>
          </div>
        </div>
      </footer>
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <p>Copyright © 2023 - All right reserved by GEEK Up Technology JSC.</p>
      </div>
    </>
  );
};

export default Footer;
