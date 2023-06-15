import React from "react";
import SideLayout from "./sideLayout";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-row ">
      <SideLayout />
      <div className="my-10">
          {children}
      </div>
    </div>
  );
};

export default Layout;