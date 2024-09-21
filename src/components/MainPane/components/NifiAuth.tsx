import {
  type FC,
  type ChangeEvent,
  type MouseEvent,
  useEffect,
  useState,
  useCallback,
} from "react";

import { Box, Button, Center, Flex, HStack, Image, Input, Select, Spinner, Text, VStack, useToken } from "@chakra-ui/react";
import { getAttestations } from "@coinbase/onchainkit/identity";
import { TokenSearch, TokenSelectDropdown, getTokens } from "@coinbase/onchainkit/token";
import type { Token } from "@coinbase/onchainkit/token";
import axios from "axios";
import { ethers } from "ethers";
import { debounce } from 'lodash';
import { baseSepolia } from "viem/chains";
import { useAccount, useChainId, useReadContract, useWriteContract } from "wagmi";

import { TOKEN_TREAT_CONTRACT_ADDRESS, TOKEN_TREAT_ABI, ERC20ABI } from "@/config";
import { useSignMessageHook, useNotify } from "@/hooks";
import type { ContractAddress } from "@/types";
import { getDefaultEthersSigner, getEthersSigner } from "@/utils/clientToEtherjsSigner";
import { uploadFile, uploadJson, urlToFile } from "@/utils/ipfsHelper";
import { createMetaData } from "@/utils/nftHelpers";
import { convertToUnixTimestamp } from "@/utils/timeUtils";

import LoadingScreen from "./LoadingScreen";
import SignMessage from "./SignMessage";

const NifiAuth: FC = () => {
  <SignMessage/>
};

export default NifiAuth;
