import { Container, Divider } from "@chakra-ui/react";
import React from "react";
import InputTask from "./InputTask";

const Footer: React.FC = () => {
  return (
    <Container
      maxW="600px"
      as="footer"
      role="contentinfo"
      my="2vh"
      px={{ base: "4", md: "8" }}
    >
      <Divider mt={6} mb={6} />
      <div>
        <InputTask />
      </div>
    </Container>
  );
};

export default Footer;