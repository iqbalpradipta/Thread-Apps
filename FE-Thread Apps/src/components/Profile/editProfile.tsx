import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from '@chakra-ui/react';
import React, { useState } from 'react';
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
  const profile: any = useSelector((state: RootState) => state.updateUsers);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'photo_profile') {
      if (event.target.files && event.target.files.length) {
        setFile(event.target.files[0]);
      }
    } else {
      setFile(null);
      dispatch(
        UPDATE_USERS({
          ...profile,
          [name]: value,
        })
      );
    }
  };

  const handleBgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'background_profile') {
      if (event.target.files && event.target.files.length) {
        setFile(event.target.files[0]);
      }
    } else {
      setFile(null);
      dispatch(
        UPDATE_USERS({
          ...profile,
          [name]: value,
        })
      );
    }
  };

  const handleSubmit = async () => {
    try {
      if (file) {
        const setData = { ...profile, photo_profile: file };
        await API.put(`/users/${decodeToken?.Payload.id}`, setData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        window.location.reload();
      } else {
        await API.put(`/users/${decodeToken?.Payload.id}`, profile);
        window.location.reload();
      }
    } catch (error) {
      throw error;
    }
  };

  const handleBg = async () => {
    try {
      if (file) {
        const setData = { ...profile, background_profile: file };
        await API.put(`/users/bg/${decodeToken?.Payload.id}`, setData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        window.location.reload();
      } else {
        await API.put(`/users/bg/${decodeToken?.Payload.id}`, profile);
        window.location.reload();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Button variant="outline" color="white" colorScheme="blackAlpha" ms="530px" mt="20px" w="100px" onClick={onOpen}>
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
              <Input onChange={handleChange} name="Username" placeholder="Username" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bio</FormLabel>
              <Input onChange={handleChange} name="bio" placeholder="Bio" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel htmlFor="photo_profile">Profile Picture</FormLabel>
              <Input type="file" id="photo_profile" onChange={handleChange} name="photo_profile" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel htmlFor="background_profile">Background Picture</FormLabel>
              <Input type="file" id="background_profile" onChange={handleBgChange} name="background_profile" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Update Users
            </Button>
            <Button onClick={handleBg} colorScheme="blue" mr={3}>
              Update Background
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProfile;
