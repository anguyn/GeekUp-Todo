import React from "react";

import Navbar from "../components/Navigation";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {/* <main className="relative z-50"> */}
      {children}
      {/* </main> */}
      <Footer />
    </>
  );
};

export default MainLayout;
