import { Box } from '@chakra-ui/react';
import Content from '../components/content';
import Navmobile from '../components/Navmobile';
import Headermobile from '../components/headermobile';
// import { Outlet } from 'react-router-dom';
import Layout from '../layout/layout';

function Home() {
  return (
    <Layout>
      <>
        <Box>
          <Box w={'full'} display={{ base: 'block', lg: 'none' }} position="relative">
            <Headermobile />
          </Box>
          <Content />
          <Box w={'full'} display={{ base: 'block', lg: 'none' }}>
            <Navmobile />
          </Box>
        </Box>
      </>
    </Layout>
  );
}

export default Home;
