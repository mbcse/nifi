"use client";
import { FC, useEffect, useState } from "react";

import { Button, VStack, Text, useToast, Divider, Flex } from "@chakra-ui/react";
import {
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { ConnectButton } from '@rainbow-me/rainbowkit'; // RainbowKit Connect Button
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";

import { SignMessage } from "./components";
import AuthRuleShowComponent from "./components/AuthRuleShowComponent";
const MainPane: FC = () => {
  const [preAuthSuccess, setPreAuthSuccess] = useState(false);
  const [countdown, setCountdown] = useState(300); // 3 minutes = 180 seconds
  const [apiCalled, setApiCalled] = useState(false);
  const { address } = useAccount();
  const toast = useToast();

  const verifyProof = async (proof) => {
    
  };

  const onSuccess = () => {
    console.log("Success")
  };

  const searchParams = useSearchParams();
  const query = searchParams.get('fas'); // Retrieve individual parameters
  console.log(query);

  // Handle Pre-auth API call
  const handleApiCall = async () => {
    try {
      const response = await fetch("/api/fas/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }), // Add necessary parameters
      });

      if (response.ok) {
        setPreAuthSuccess(true);
        setApiCalled(true);
        toast({
          title: "Pre-auth successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to authenticate.");
      }
    } catch (error) {
      setPreAuthSuccess(false);
      toast({
        title: "Pre-auth failed!",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Countdown logic after pre-auth
  useEffect(() => {
    if (preAuthSuccess && countdown > 0) {
      const timer = setInterval(() => setCountdown(countdown - 1), 1000);
      return () => clearInterval(timer); // Cleanup the interval on component unmount
    }
  }, [preAuthSuccess, countdown]);

  // Button click handler for pre-auth
  const handlePreAuthClick = async () => {
    await handleApiCall();
  };

  return (
    <VStack spacing={6} align="center" mt="5rem">
      {!preAuthSuccess && (
        <>
        <Text>Welcome to Nifi Web3 based Wifi Authentication Capitative Portal</Text>
        <Button colorScheme="blue" onClick={handlePreAuthClick} isDisabled={apiCalled}>
          Accept Terms and Conditions
        </Button>
        </>
      )}


      {preAuthSuccess && countdown > 0 && (
        <>
          <Text fontSize="lg">
            You have {Math.floor(countdown / 60)}:{("0" + (countdown % 60)).slice(-2)} minutes to authenticate.
          </Text>
          {/* RainbowKit's Connect Wallet button */}
          {/* <ConnectButton />
           */}
          <DynamicWidget/>
        </>
      )}

      {address && preAuthSuccess && (
        <>
        <Text>Wallet connected! Address: {address}</Text>

        <Divider mb={5} />


<AuthRuleShowComponent/>

        <Divider mb={5} />

        <IDKitWidget
          app_id="app_staging_156a9a58b3207856006f7d8e9a9bf51e"
          action="nifi-auth-portal"
          verification_level={VerificationLevel.Orb}
          handleVerify={verifyProof}
          onSuccess={onSuccess}>
          {({ open }) => (
            <button
              onClick={open}
            >
              Verify with World ID
            </button>
          )}
      </IDKitWidget>

        <Flex
          w={"100%"}
          display={"flex"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          gap={5}
        >
          <SignMessage />
          {/*<TransferNative /> */}

          {/* <NifiAuth /> */}
        </Flex>
        </>
      )}



    </VStack>
  );
};

export default MainPane;
