import type { ReactNode } from "react";

import "@/styles/globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

const open_sans = Open_Sans({ subsets: ["latin"] });
import "@coinbase/onchainkit/styles.css";

export const metadata: Metadata = {
  title: "Nifi",
  applicationName: "Nifi",
  description: "Web3 Wifi Authentication Protocol",
  authors: {
    name: "Mohit",
    url: "",
  },
  icons: "nifi-favicon.png",
  manifest: "site.webmanifest",
};

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import {
  DynamicContextProvider,
  DynamicWagmiConnector,
  } from "../dynamic";


export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
      <DynamicContextProvider
          settings={{
            mobileExperience: 'redirect',

          environmentId: "b94d1a6a-5b03-4a35-afb6-cf1fccf82d3a",
          walletConnectors: [EthereumWalletConnectors],

          }}
      >

        <Providers>
        <DynamicWagmiConnector>

          {children}
          </DynamicWagmiConnector>

          </Providers>

        </DynamicContextProvider>

      </body>
    </html>
  );
}
