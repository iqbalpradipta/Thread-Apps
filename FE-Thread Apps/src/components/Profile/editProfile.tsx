import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/types';
import { UPDATE_USERS } from '../../stores/rootReducer';
import { API } from '../../libs/api';
import { JwtPayload, jwtDecode } from 'jwt-decode';

function EditProfile() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const getToken = sessionStorage.getItem('token');
  const decodeToken = getToken ? jwtDecode<JwtPayload>(getToken) : null;
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.updateUsers);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(
      UPDATE_USERS({
        ...profile,
        [name]: value,
      })
    );
  };

  console.log(profile);

  const handleSubmit = async () => {
    try {
      await API.put(`/users/${decodeToken?.Payload.id}`, profile);
      window.location.reload()
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Button variant="outline" color="white" colorScheme="blackAlpha" ms="410px" mt="40px" w="100px" onClick={onOpen}>
        Edit Profile
      </Button>

      <Modal colorScheme="blackAlpha" initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input onChange={handleChange} ref={initialRef} name="fullName" placeholder="Full name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Username</FormLabel>
              <Input onChange={handleChange} name="username" placeholder="Username" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bio</FormLabel>
              <Input onChange={handleChange} name="bio" placeholder="Bio" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProfile;
