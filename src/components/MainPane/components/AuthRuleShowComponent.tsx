"use client";
import { useEffect, useState } from "react";

import {
  Box,
  VStack,
  Text,
  Badge,
  Flex,
  Button,
  Image,
} from "@chakra-ui/react";

// API call to fetch auth rules
const fetchAuthRules = async () => {
  const response = await fetch("/api/auth-rules/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// API to fetch token/NFT metadata (image, etc.)
const fetchTokenMetadata = async (tokenAddress: string, tokenId: string | null) => {
  // For NFTs, fetch metadata (e.g., from OpenSea)
  if (tokenId) {
    // const response = await fetch(
    //   `https://api.opensea.io/api/v1/assets?asset_contract_address=${tokenAddress}&token_ids=${tokenId}`
    // );
    // const data = await response.json();
    return "https://www.artnews.com/wp-content/uploads/2022/01/unnamed-2.png"; // Return the image URL
  } else {
    // For ERC20 tokens, fetch metadata (use a service that provides token icons)
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${tokenAddress}`);
    const data = await response.json();
    return data.image?.large || ""; // Return token icon
  }
};

const AuthRuleShowComponent = () => {
  const [authRules, setAuthRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthRules = async () => {
      try {
        const data = await fetchAuthRules();
        console.log(data)
        // Fetch images for each token/NFT rule
        const enrichedRules = await Promise.all(
          data.rules.map(async (rule: any) => {
            const imageUrl = await fetchTokenMetadata(rule.address, rule.tokenId || null);
            return { ...rule, imageUrl }; // Add the image URL to each rule
          })
        );

        setAuthRules(enrichedRules);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load auth rules:", error);
      }
    };

    loadAuthRules();
  }, []);

  if (loading) {
    return <Text>Loading authentication rules...</Text>;
  }

  return (
    <VStack spacing={6} align="center">
     <Text>To authenticate you need following NFT</Text>
      {authRules.map((rule, index) => (
        <Box
          key={index}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          w="100%"
          maxW="400px"
          mb={4}
        >
          <Text fontSize="lg" fontWeight="bold">
            Rule #{index + 1}
          </Text>
          
          {rule.imageUrl && (
            <Image src={rule.imageUrl} alt="Token/NFT Image" borderRadius="md" mb={4} />
          )}

          <Flex justifyContent="space-between" mt={3}>
            <Text>Token Type:</Text>
            <Badge colorScheme="blue">{rule.tokenType}</Badge>
          </Flex>
          <Flex justifyContent="space-between" mt={2}>
            <Text>Address:</Text>
            <Text>{rule.address.slice(0,6)}... {rule.address.slice(-6)}</Text>
          </Flex>
          <Flex justifyContent="space-between" mt={2}>
            <Text>Token ID:</Text>
            <Text>{rule.tokenId || "N/A"}</Text>
          </Flex>
          <Flex justifyContent="space-between" mt={2}>
            <Text>Tokens Required:</Text>
            <Text>{rule.tokenAmount}</Text>
          </Flex>
          {/* <Flex justifyContent="flex-end" mt={3}>
            <Button colorScheme="red" size="sm" mr={2}>
              Delete
            </Button>
            <Button colorScheme="blue" size="sm">
              Edit
            </Button>
          </Flex> */}
        </Box>
      ))}
    </VStack>
  );
};

export default AuthRuleShowComponent;
