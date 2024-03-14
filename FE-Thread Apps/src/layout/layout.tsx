import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../components/sidebar';
import Home from '../pages/Home';
import Rightbar from '../components/rightbar';
import React from 'react';
function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Box>
        <Flex>
          <Box flex="1" display={{ base: 'none', lg: 'block' }}>
            <Sidebar />
          </Box>
          <Box flex="2">
            {/* <Home /> */}
            {children}
          </Box>
          <Box flex="1" display={{ base: 'none', lg: 'block' }} h="calc(100vh)">
            <Rightbar />
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Layout;
