import { FC } from "react";

import { Center, Spinner } from "@chakra-ui/react";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <Center
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex="1000"
    >
      <Spinner size="xl" />
    </Center>
  );
};

export default LoadingScreen;
