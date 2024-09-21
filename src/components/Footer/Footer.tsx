"use client";
import { type FC } from "react";

import { Box } from "@chakra-ui/react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <Box as="footer" p={"1rem"} position="sticky" bottom={0} zIndex={10} textAlign={"center"}>
      <Link href="" target="_blank" rel="noopener noreferrer">
        Copyright@Nifi
        Network Identity and Framework Interface
      </Link>
    </Box>
  );
};

export default Footer;
