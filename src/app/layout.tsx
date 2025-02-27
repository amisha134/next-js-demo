import type { Metadata } from "next";
import type { ChildrenType } from "@/types";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";

export const metadata: Metadata = {
  title: {
    default: "Beauty",
    template: "%s | Beauty",
  },
  description: "Encyclopedia of Beauty Show",
};

const RootLayout = ({ children }: ChildrenType) => {
  return <RootLayoutClient>{children}</RootLayoutClient>;
};

export default RootLayout;
