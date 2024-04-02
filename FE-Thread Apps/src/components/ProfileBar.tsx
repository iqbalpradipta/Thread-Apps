import { Avatar, Box, Button, Image, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/types';
import { API } from '../libs/api';
import { GET_USERS } from '../stores/rootReducer';
import { useEffect } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function ProfileBar() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.users);
  const token = sessionStorage.getItem('token');
  const decodeToken = token ? jwtDecode<JwtPayload>(token) : null;
  const navigate = useNavigate()

  const getUsers = async (id: string) => {
    try {
      const response = await API.get(`/users/${id}`);
      dispatch(GET_USERS(response.data.data));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (decodeToken && decodeToken.Payload) {
      const userId = decodeToken.Payload.id;
      getUsers(userId);
    }
  }, []);

  return (
    <>
      {decodeToken && decodeToken.Payload ? (
        <>
          <Box key={data.data.id} p="20px">
            <Box bg="#262626" w="300px" p="15px" borderRadius={15}>
              <Text fontWeight="bold">My Profile</Text>
              <Image w="270px" h="70px" bg="red" mt={3} borderRadius={15} src={data.data.background_profile} />
              <Avatar size="md" name={data.data.username} src={data.data.photo_profile} ms="15px" bottom={5} border="2px" borderColor="black" />
              <Button  onClick={() => navigate(`/profile`)} colorScheme="blackAlpha" variant="outline" color="white" borderRadius={25} ms="127px" mt="10px" size="xs">
                Edit Profile
              </Button>
              <Text ms="5px" fontWeight="bold" fontSize="20px">
                {data.data.fullName}
              </Text>
              <Text as="sup" color="#5D5D5D" ms="5px">
                @{data.data.username}
              </Text>
              <Text ms="5px" fontSize="sm">
                {data.data.bio}
              </Text>
              <Box mt="3px" display="flex" alignItems="center">
                <Text ms="5px" fontSize="xs">
                  {data.data.followerNumber}
                </Text>
                <Text ms="5px" fontSize="xs" color="#4E4E4E">
                  Following
                </Text>
                <Text ms="12px" fontSize="xs">
                  {data.data.followingNumber}
                </Text>
                <Text ms="5px" fontSize="xs" color="#4E4E4E">
                  Followers
                </Text>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box p="20px">
          <Box bg="#262626" w="300px" p="15px" borderRadius={15}>
            <Text fontWeight="bold">My Profile</Text>
            <Image w="270px" h="70px" bg="red" mt={3} borderRadius={15} src="https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?w=740&t=st=1707180635~exp=1707181235~hmac=10e35b2b792774036e09eb9afaeb121f7fb864f6b06e8818706a7be281b45bfd" />
            <Avatar size="md" name="Ryan Florence" src="https://bit.ly/ryan-florence" ms="15px" bottom={5} border="2px" borderColor="black" />
            <Button colorScheme="blackAlpha" variant="outline" color="white" borderRadius={25} ms="127px" mt="10px" size="xs">
              Edit Profile
            </Button>
            <Text ms="5px" fontWeight="bold" fontSize="20px">
              Hello Guest
            </Text>
            <Text as="sup" color="#5D5D5D" ms="5px">
              @Guest
            </Text>
            <Text ms="5px" fontSize="sm">
              Sebelum menggunakan aplikasi ini secara full sebaiknya anda membuat akun terlebih dahulu.
            </Text>
            <Box mt="3px" display="flex" alignItems="center">
              <Text ms="5px" fontSize="xs">
                10
              </Text>
              <Text ms="5px" fontSize="xs" color="#4E4E4E">
                Following
              </Text>
              <Text ms="12px" fontSize="xs">
                10
              </Text>
              <Text ms="5px" fontSize="xs" color="#4E4E4E">
                Followers
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ProfileBar;
