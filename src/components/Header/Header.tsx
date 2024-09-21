"use client";
import { FC } from "react";

import { HStack, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

import { useWindowSize } from "@/hooks/useWindowSize";

import logo from "../../../public/img/nifi-high-resolution-logo-transparent.png";
import { DarkModeButton } from "../DarkModeButton";

const Header: FC = () => {
  const { isTablet } = useWindowSize();

  return (
    <HStack
      as="header"
      p={"1.5rem"}
      position="sticky"
      top={0}
      zIndex={10}
      justifyContent={"space-between"}
    >
      <HStack>
        <Image src={logo} alt="logo" width={85} height={55} />
        {!isTablet && (
          <Link href={"/"}>
            <Heading as="h1" fontSize={"1.5rem"} className="text-shadow">
              Nifi
            </Heading>
          </Link>
        )}
      </HStack>

      <HStack>
        <Link href="/auth-rules">
          <Heading as="h3" m={5} fontSize={"1.2rem"}>
            Dashboard
          </Heading>
        </Link>
        <DarkModeButton />
      </HStack>
    </HStack>
  );
};

export default Header;
