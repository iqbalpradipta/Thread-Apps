import { Box, Text, Avatar, Button, Image, VStack, Flex } from '@chakra-ui/react';
import ProfileBar from './ProfileBar';
import Suggest from './Suggest/Suggest';

function Rightbar() {
  return (
    <>
      {/* Ini Profile */}
      <Box position="fixed" color="white" h="calc(100vh)" bgColor="#1D1D1D" borderLeft="1px" borderColor="gray">
        <VStack>
          <ProfileBar />
          {/* Ini Suggest */}
          <Suggest />
        </VStack>
      </Box>
    </>
  );
}

export default Rightbar;
