"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { Transport, Chain } from "viem";
import { createConfig, http } from "wagmi";

const pwrChain: Chain = {
  id: 10023,
  name: 'PWR Blockchain',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://ethereumplus.pwrlabs.io/'],
    },
  },
  blockExplorers: {
    default: { name: 'PWR Explorer', url: 'https://ethplusexplorer.pwrlabs.io/' },
  },
  testnet: true,
};


const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
  throw new Error(
    "WalletConnect project ID is not defined. Please check your environment variables.",
  );
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        // walletConnectWallet,
        ledgerWallet,
        rabbyWallet,
        coinbaseWallet,
        argentWallet,
        safeWallet,
      ],
    },
  ],
  { appName: "Nifi", projectId: walletConnectProjectId },
);

// Fix missing icons

const transports: Record<number, Transport> = {
  [pwrChain.id]: http(),
};

export const wagmiConfig = createConfig({
  chains: [pwrChain],
  connectors,
  transports,
  ssr: true,
});
