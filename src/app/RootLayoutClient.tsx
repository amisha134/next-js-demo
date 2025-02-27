"use client";
import React from "react";
import type { ChildrenType } from "@/types";
import ProvidersWrapper from "@/components/ProvidersWrapper";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayoutClient = ({ children }: ChildrenType) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProvidersWrapper>{children}</ProvidersWrapper>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
};

export default RootLayoutClient;
