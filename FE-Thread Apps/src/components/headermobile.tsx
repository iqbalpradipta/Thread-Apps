import { Text, Box, Flex, Center } from '@chakra-ui/react';

function Headermobile() {
  return (
    <Box bg={'black'} w="100%">
      <Center>
        <Flex color="white" px="10px" gap={10}>
          <Text textColor="#04A51E" fontWeight="bold" fontSize="50px" p={3}>
            circle
          </Text>
        </Flex>
      </Center>
    </Box>
  );
}

export default Headermobile;
