import type { Metadata } from "next";
import type { ChildrenType } from "@/types";
import { Inter } from "next/font/google";
import ProvidersWrapper from "@/components/ProvidersWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Beauty",
    template: "%s | Beauty",
  },
  description: "Encyclopedia of Beauty Show",
};

const RootLayout = ({ children }: ChildrenType) => {
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

export default RootLayout;
