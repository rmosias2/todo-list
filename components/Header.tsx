
  
import { Heading } from "@chakra-ui/react";
import React from "react";

const Header: React.FC = () => {
  return (
      <Heading cursor="" mt={8} mb={3} as="h2" size="3xl" data-testid="header-todo-app" textAlign="center">
        Todo App
      </Heading>
  );
};

export default Header;