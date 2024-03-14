import { Link, Grid, GridItem, Button, Text, Divider, Flex, Center } from '@chakra-ui/react';
import { BiSolidHomeCircle } from 'react-icons/bi';
import { MdPersonSearch } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { TbLogout2 } from 'react-icons/tb';
import { Link as ReactRouterLink } from 'react-router-dom';
import { IoLogInOutline } from 'react-icons/io5';
import React from 'react';

function Sidebar() {
  const [isLogin, setIsLogin] = React.useState<boolean>(true);
  const token = sessionStorage.getItem('token');

  const handleLogout = () => {
    token;
    sessionStorage.removeItem('token');
    setIsLogin(false);
    window.location.reload();
  };

  return (
    <>
      <Grid position="fixed" templateColumns="repeat(1, 1fr)" h="calc(100vh)" gap={3} w="100%" color="white" borderColor="gray" borderRight="1px">
        <Flex>
          <GridItem bg="#1D1D1D" pl="2" w="25%">
            <Text textColor="#04A51E" fontWeight="bold" fontSize="50px" p={3}>
              circle
            </Text>
            <Link as={ReactRouterLink} to="/" display="flex" alignItems="center" gap="10px" p={3} fontSize="xl">
              <BiSolidHomeCircle />
              <Text>Home</Text>
            </Link>
            <Link as={ReactRouterLink} to="/search" display="flex" alignItems="center" gap="10px" p={3} fontSize="xl">
              <MdPersonSearch />
              <Text>Search</Text>
            </Link>
            <Link as={ReactRouterLink} to="/following" display="flex" alignItems="center" gap="10px" p={3} fontSize="xl">
              <FaRegHeart />
              <Text>Follows</Text>
            </Link>
            <Link as={ReactRouterLink} to='/profile' display="flex" alignItems="center" gap="10px" p={3} fontSize="xl">
              <CgProfile />
              <Text>Profile</Text>
            </Link>
            <Button bg="#04A51E" borderRadius={100} width="90%" textColor="#fff" m={3}>
              Create Post
            </Button>
            <Center pe="200px">
              {token ? (
                <Link as={ReactRouterLink} onClick={handleLogout} to="/" display="flex" alignItems="center" gap="10px" ms="20px" pt="190px" mb="20px">
                  <TbLogout2 />
                  <Text>Logout</Text>
                </Link>
              ) : (
                <Link as={ReactRouterLink} to="/Login" display="flex" alignItems="center" gap="10px" ms="20px" pt="190px" mb="20px">
                  <IoLogInOutline />
                  <Text>Login</Text>
                </Link>
              )}
            </Center>
          </GridItem>
          <Divider orientation="vertical" colorScheme="gray" />
        </Flex>
      </Grid>
    </>
  );
}

export default Sidebar;
