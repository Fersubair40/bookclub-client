import React from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <main>
        <section>{children}</section>
      </main>
    </>
  );
}
