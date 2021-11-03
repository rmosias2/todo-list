import { Box, Center } from "@chakra-ui/react";
import type { NextPage } from 'next';

import ColorModeSwitcher from '../components/ToggleTheme';
import Header from '../components/Header';
import InputSearch from '../components/InputSearch';
import TaskList from "../components/TaskList";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <Box mt={8} w="100%" maxW="600px" mx={"auto"}>
        <Header />
        <InputSearch />
        <TaskList />
        <Footer />
        <Center>
            <ColorModeSwitcher />
        </Center>
    </Box>
  )
}

export default Home
