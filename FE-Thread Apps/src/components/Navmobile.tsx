import { Link, Grid, GridItem, Button, Text, Box, Flex, Center } from '@chakra-ui/react';
import { BiSolidHomeCircle } from 'react-icons/bi';
import { MdPersonSearch } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { TbLogout2 } from 'react-icons/tb';

function Navmobile() {
  return (
    <Box position="fixed" bottom={0} bg={'black'} w="100%">
      <Center>
        <Flex color="white" px="10px" gap={10}>
          <Link display="flex" alignItems="center" p={3} fontSize="xl">
            <BiSolidHomeCircle />
          </Link>
          <Link display="flex" alignItems="center" p={3} fontSize="xl">
            <MdPersonSearch />
          </Link>
          <Link display="flex" alignItems="center" p={3} fontSize="xl">
            <FaRegHeart />
          </Link>
          <Link display="flex" alignItems="center" p={3} fontSize="xl">
            <CgProfile />
          </Link>
        </Flex>
      </Center>
    </Box>
  );
}

export default Navmobile;
