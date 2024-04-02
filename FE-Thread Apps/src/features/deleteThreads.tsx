import { Box, Button, CloseButton, Fade, IconButton, Image, useDisclosure } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

function DeleteThreads() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <IconButton colorScheme="#1d1d1d" onClick={onToggle} aria-label="Search database" ms="625px" mt="-10px" position="absolute" icon={<ChevronDownIcon />} />
      <Fade in={isOpen}>
        <Box p="40px" ms="120px" color="white" w="10%" h="100px" position="fixed" alignContent="center" bg="#1d1d1d" rounded="md">
          <Button mt="-30px" ms="30px" bgColor="#262626" color="white">
            Delete
          </Button>
        </Box>
      </Fade>
    </>
  );
}

export default DeleteThreads;
