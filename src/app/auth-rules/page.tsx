"use client";
import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
} from "@chakra-ui/react";

import { Footer, Header } from "@/components";
import { SideBar } from "@/components/Sidebar";
import { useNotify } from "@/hooks";

// Add Rule Modal Component
function AddRuleModal({ isOpen, onClose, onAdd }) {
  const [tokenType, setTokenType] = useState("erc20");
  const [address, setAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");

  const handleAdd = async () => {
    // Construct rule data and call onAdd function passed as prop
    const newRule = { tokenType, address, tokenId, tokenAmount };
    await onAdd(newRule);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Authentication Rule</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Token Type</FormLabel>
            <Select value={tokenType} onChange={(e) => setTokenType(e.target.value)}>
              <option value="erc20">ERC20</option>
              <option value="erc721">ERC721</option>
              <option value="erc1155">ERC1155</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Token Address</FormLabel>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Token ID</FormLabel>
            <Input
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Enter token ID (for ERC721/1155)"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Token Amount</FormLabel>
            <Input
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              placeholder="Number of tokens required"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAdd}>
            Add Rule
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function AuthRulesPage() {
  const { notifyError, notifySuccess } = useNotify();
  const [authRules, setAuthRules] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch all auth rules
  const fetchRules = async () => {
    try {
      const response = await fetch("/api/auth-rules/get");
      const data = await response.json();
      setAuthRules(data.rules);
    } catch (error) {
      console.log(error);
      notifyError({ title: "Error", message: "Failed to fetch authentication rules" });
    }
  };

  // Add a new rule
  const addRule = async (rule) => {
    try {
      const response = await fetch("/api/auth-rules/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rule),
      });
      if (!response.ok) throw new Error("Failed to add rule");
      notifySuccess({ title: "Success", message: "Authentication rule added" });
      fetchRules();
    } catch (error) {
      console.log(error);
      notifyError({ title: "Error", message: "Failed to add rule" });
    }
  };

  // Delete a rule
  const deleteRule = async (ruleId) => {
    try {
      const response = await fetch(`/api/auth-rules/delete/${ruleId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete rule");
      notifySuccess({ title: "Success", message: "Authentication rule deleted" });
      fetchRules();
    } catch (error) {
      console.log(error);
      notifyError({ title: "Error", message: "Failed to delete rule" });
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <Flex flexDirection="column" minHeight="100vh" bg="gray.50">
      <Header />
      <Flex>
        <SideBar />
        <Box as="main" flex={1} p={6} ml="250px">
          <Text fontSize="4xl" mb={6} color="purple.700">
            Authentication Rules
          </Text>
          <Button colorScheme="blue" onClick={onOpen} mb={4}>
            Add Rule
          </Button>
          <TableContainer>
            <Table variant="striped" colorScheme="purple">
              <TableCaption>WiFi Authentication Rules</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Token Type</Th>
                  <Th>Token Address</Th>
                  <Th>Token ID</Th>
                  <Th>Token Amount</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {authRules.map((rule) => (
                  <Tr key={rule.id}>
                    <Td>{rule.id}</Td>
                    <Td>{rule.tokenType}</Td>
                    <Td>{rule.address}</Td>
                    <Td>{rule.tokenId}</Td>
                    <Td>{rule.tokenAmount}</Td>
                    <Td>
                      <Button colorScheme="red" onClick={() => deleteRule(rule.id)}>
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <AddRuleModal isOpen={isOpen} onClose={onClose} onAdd={addRule} />
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
}
