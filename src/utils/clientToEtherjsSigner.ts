import { Config, getConnectorClient } from "@wagmi/core";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import type { Account, Chain, Client, Transport } from "viem";

import { wagmiConfig } from "@/wagmi";

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner(config: Config, { chainId }: { chainId?: number } = {}) {
  try {
    const client = await getConnectorClient(config, { chainId });
    return clientToSigner(client);
  } catch (error) {
    console.error("Error getting ethers signer:", error);
    throw error;
  }
}

export async function getDefaultEthersSigner() {
  const signer = await getEthersSigner(wagmiConfig);
  return signer;
}
