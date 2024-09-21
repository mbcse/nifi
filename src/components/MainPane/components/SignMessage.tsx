import { type FC, type ChangeEvent, type MouseEvent, useEffect, useState } from "react";

import { Button, Input, useToast, VStack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";

import { useSignMessageHook, useNotify } from "@/hooks";

const SignMessage: FC = () => {
  const { signature, recoveredAddress, error, isPending, signMessage } = useSignMessageHook();
  const {address} = useAccount();
  const [messageAuth, setMessageAuth] = useState<string>("NIFI-Capitative-Portal-Verification");
  const { notifyError, notifySuccess } = useNotify();
  const toast = useToast();
  const searchParams = useSearchParams();
  const query = searchParams.get('fas'); // Retrieve individual parameters

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessageAuth(e.target.value);
  };

  const handleSignMessage = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    signMessage({ message: messageAuth });
  };

  useEffect(() => {

    const authenticate = async () => {
      try {
          const response = await fetch('/api/fas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ signature, query, userAddress: address}),
          });
    
          const data = await response.json();

          console.log(data);
  
          if (response.ok) {
            toast({
              title: "Access granted.",
              description: "You are now connected to the network.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
    
            // Redirect back to OpenNDS with the authentication token
            window.location.href = data.redirectUrl;
          } else {
            toast({
              title: "Access denied.",
              description: data.message || "Invalid passcode.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } catch (error) {
          console.log(error
          )
          toast({
            title: "Error.",
            description: "There was an error processing your request.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } 
      
    }





    if (signature && recoveredAddress) {
      notifySuccess({
        title: "Message successfully signed!",
        message: (
          <>
            <b>Signature:</b> {signature}
            <br />
            <br />
            <b>Recovered Address:</b> {recoveredAddress}
          </>
        ),
      });

      authenticate()
    }



  }, [signature, recoveredAddress, error, notifyError, notifySuccess]);

  return (
    <VStack w={"45%"} minWidth={"270px"} gap={2}>
      <Input
        value={messageAuth}
        // onChange={handleMessageChange}
        type="textarea"
        placeholder=""

      />
      <Button
        variant="ghost"
        onClick={handleSignMessage}
        isLoading={isPending}
        className="custom-button"
      >
        Sign Message
      </Button>
    </VStack>
  );

  
};

export default SignMessage;
