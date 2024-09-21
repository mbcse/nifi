'use client';

import { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import {
  Container,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Flex,
  Wrap,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Spinner,
  Card,
  CardBody,
  CardHeader,
  Heading,
  useDisclosure
} from "@chakra-ui/react";
import MainPanel from "../../components/MainPanel";
import RouteFlowChart from "../../components/RouteFlowChart";

const Routes = () => {
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    fromChain: '',
    toChain: '',
    fromAsset: '',
    toAsset: '',
    isActive: '',
    paymentMode: ''
  });
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      const response = await fetch('/api/s9yroutes/get-all-routes');
      const data = await response.json();
      setRoutes(data.routes);
      setFilteredRoutes(data.routes);
      calculateAnalysis(data.routes);
    };
    fetchRoutes();
  }, []);

  useEffect(() => {
    calculateAnalysis(filteredRoutes);
  }, [filteredRoutes]);

  const calculateAnalysis = (routes) => {
    setLoading(true);
    const totalRoutes = routes.length;
    const totalRoutesFromChain = {};
    const totalRoutesToChain = {};
    const totalRoutesFromAsset = {};
    const totalRoutesToAsset = {};
    const totalUniqueAssets = new Set();
    let totalCryptoRoutes = 0;
    let totalFiatRoutes = 0;
    let totalActiveRoutes = 0;
    let totalInactiveRoutes = 0;

    routes.forEach(route => {
      totalUniqueAssets.add(route.from_asset_name);
      totalUniqueAssets.add(route.to_asset_name);

      if (filter.fromChain) {
        if (route.from_chain_name === filter.fromChain) {
          totalRoutesFromChain[route.to_chain_name] = (totalRoutesFromChain[route.to_chain_name] || 0) + 1;
        }
      } else {
        totalRoutesFromChain[route.from_chain_name] = (totalRoutesFromChain[route.from_chain_name] || 0) + 1;
      }

      if (filter.toChain) {
        if (route.to_chain_name === filter.toChain) {
          totalRoutesToChain[route.from_chain_name] = (totalRoutesToChain[route.from_chain_name] || 0) + 1;
        }
      } else {
        totalRoutesToChain[route.to_chain_name] = (totalRoutesToChain[route.to_chain_name] || 0) + 1;
      }

      if (filter.fromAsset) {
        if (route.from_asset_name === filter.fromAsset) {
          totalRoutesFromAsset[route.to_asset_name] = (totalRoutesFromAsset[route.to_asset_name] || 0) + 1;
        }
      } else {
        totalRoutesFromAsset[route.from_asset_name] = (totalRoutesFromAsset[route.from_asset_name] || 0) + 1;
      }

      if (filter.toAsset) {
        if (route.to_asset_name === filter.toAsset) {
          totalRoutesToAsset[route.from_asset_name] = (totalRoutesToAsset[route.from_asset_name] || 0) + 1;
        }
      } else {
        totalRoutesToAsset[route.to_asset_name] = (totalRoutesToAsset[route.to_asset_name] || 0) + 1;
      }

      if (route.is_active) totalActiveRoutes++;
      else totalInactiveRoutes++;

      if (route.payment_collection_mode === 'crypto') totalCryptoRoutes++;
      else if (route.payment_collection_mode === 'fiat') totalFiatRoutes++;
    });

    setAnalysisData({
      totalRoutes,
      totalRoutesFromChain,
      totalRoutesToChain,
      totalRoutesFromAsset,
      totalRoutesToAsset,
      totalUniqueAssets: totalUniqueAssets.size,
      totalCryptoRoutes,
      totalFiatRoutes,
      totalActiveRoutes,
      totalInactiveRoutes
    });
    setLoading(false);
  };

  const handleViewRoute = async (routeId) => {
    const response = await fetch(`/api/s9yroutes/get-route/${routeId}`);
    const data = await response.json();
    setSelectedRoute(data.route);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoute(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilter = {
      ...filter,
      [name]: value
    };
    setFilter(updatedFilter);

    const filtered = routes.filter(route => {
      return (
        (!updatedFilter.fromChain || route.from_chain_name === updatedFilter.fromChain) &&
        (!updatedFilter.toChain || route.to_chain_name === updatedFilter.toChain) &&
        (!updatedFilter.fromAsset || route.from_asset_name === updatedFilter.fromAsset) &&
        (!updatedFilter.toAsset || route.to_asset_name === updatedFilter.toAsset) &&
        (!updatedFilter.isActive || route.is_active.toString() === updatedFilter.isActive) &&
        (!updatedFilter.paymentMode || route.payment_collection_mode === updatedFilter.paymentMode)
      );
    });

    setFilteredRoutes(filtered);
  };

  const handleClearFilters = () => {
    setFilter({
      fromChain: '',
      toChain: '',
      fromAsset: '',
      toAsset: '',
      isActive: '',
      paymentMode: ''
    });
    setFilteredRoutes(routes);
  };

  return (
    <Sidebar>
      <MainPanel>
        <Container maxW="container.xl" py={8}>
          <Text textAlign="center" fontSize="3xl" mb={8} fontWeight="bold">
            Routes Overview
          </Text>

          <Box mb={8}>
            <Wrap spacing={4} align="center" overflowX="auto">
              <FormControl id="fromChain" maxW="200px">
                <FormLabel>From Chain</FormLabel>
                <Select name="fromChain" value={filter.fromChain} onChange={handleFilterChange}>
                  <option value="">Select From Chain</option>
                  {Array.from(new Set(routes.map(route => route.from_chain_name))).map(chain => (
                    <option key={chain} value={chain}>{chain}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="toChain" maxW="200px">
                <FormLabel>To Chain</FormLabel>
                <Select name="toChain" value={filter.toChain} onChange={handleFilterChange}>
                  <option value="">Select To Chain</option>
                  {Array.from(new Set(routes.map(route => route.to_chain_name))).map(chain => (
                    <option key={chain} value={chain}>{chain}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="fromAsset" maxW="200px">
                <FormLabel>From Asset</FormLabel>
                <Select name="fromAsset" value={filter.fromAsset} onChange={handleFilterChange}>
                  <option value="">Select From Asset</option>
                  {Array.from(new Set(routes.map(route => route.from_asset_name))).map(asset => (
                    <option key={asset} value={asset}>{asset}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="toAsset" maxW="200px">
                <FormLabel>To Asset</FormLabel>
                <Select name="toAsset" value={filter.toAsset} onChange={handleFilterChange}>
                  <option value="">Select To Asset</option>
                  {Array.from(new Set(routes.map(route => route.to_asset_name))).map(asset => (
                    <option key={asset} value={asset}>{asset}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="isActive" maxW="200px">
                <FormLabel>Active Status</FormLabel>
                <Select name="isActive" value={filter.isActive} onChange={handleFilterChange}>
                  <option value="">Select Active Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Select>
              </FormControl>
              <FormControl id="paymentMode" maxW="200px">
                <FormLabel>Payment Mode</FormLabel>
                <Select name="paymentMode" value={filter.paymentMode} onChange={handleFilterChange}>
                  <option value="">Select Payment Mode</option>
                  <option value="crypto">Crypto</option>
                  <option value="fiat">Fiat</option>
                </Select>
              </FormControl>
              <Button colorScheme="teal" onClick={handleClearFilters}>Clear Filters</Button>
            </Wrap>
          </Box>

          {loading ? (
            <Flex justify="center" align="center" height="200px">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <>
              <Box mb={8}>
                <Card>
                  <CardHeader>
                    <Heading size="lg">Analysis</Heading>
                  </CardHeader>
                  <CardBody>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      <Box p={4} borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="bold">Total Routes</Text>
                        <Text>{analysisData?.totalRoutes}</Text>
                      </Box>
                      <Box p={4} borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="bold">Total Unique Assets</Text>
                        <Text>{analysisData?.totalUniqueAssets}</Text>
                      </Box>
                      <Box p={4} borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="bold">Total Crypto Routes</Text>
                        <Text>{analysisData?.totalCryptoRoutes}</Text>
                      </Box>
                      <Box p={4} borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="bold">Total Fiat Routes</Text>
                        <Text>{analysisData?.totalFiatRoutes}</Text>
                      </Box>
                      <Box p={4} borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="bold">Total Active Routes</Text>
                        <Text>{analysisData?.totalActiveRoutes}</Text>
                      </Box>
                      <Box p={4} borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="bold">Total Inactive Routes</Text>
                        <Text>{analysisData?.totalInactiveRoutes}</Text>
                      </Box>
                    </SimpleGrid>
                  </CardBody>
                </Card>
              </Box>

              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Route ID</Th>
                    <Th>From Chain</Th>
                    <Th>To Chain</Th>
                    <Th>From Asset</Th>
                    <Th>To Asset</Th>
                    <Th>Active Status</Th>
                    <Th>Payment Mode</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredRoutes.map((route) => (
                    <Tr key={route.exchange_route_id}>
                      <Td>{route.exchange_route_id}</Td>
                      <Td>{route.from_chain_name}</Td>
                      <Td>{route.to_chain_name}</Td>
                      <Td>{route.from_asset_name}</Td>
                      <Td>{route.to_asset_name}</Td>
                      <Td>{route.is_active ? 'Active' : 'Inactive'}</Td>
                      <Td>{route.payment_collection_mode}</Td>
                      <Td>
                        <Button colorScheme="teal" onClick={() => handleViewRoute(route.exchange_route_id)}>View Route</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </>
          )}

          {selectedRoute && (
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Route Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <RouteFlowChart routeDetails={selectedRoute} />
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </Container>
      </MainPanel>
    </Sidebar>
  );
};

export default Routes;
