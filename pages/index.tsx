import { Box } from "@chakra-ui/react";
import type { NextPage } from 'next';

import ColorModeSwitcher from '../components/ToggleTheme';
import Header from '../components/Header';
import InputTask from '../components/InputTask';

const Home: NextPage = () => {
  return (
    <Box mt={8} w="100%" maxW="600px" mx={"auto"}>
        <ColorModeSwitcher />
        <Header />
        <InputTask />
    </Box>
  )
}

export default Home
