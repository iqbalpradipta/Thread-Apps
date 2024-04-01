import { Avatar, Link, Box, Button, Card, CardBody, Center, Divider, Flex, Heading, Image, Input, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/types';
import { API } from '../../libs/api';
import { GET_THREAD, GET_USERS } from '../../stores/rootReducer';
import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { IThreads } from '../../types/threadsInterface';
import ButtonLikes from '../Like/ButtonLikes';
import { MdOutlineComment } from 'react-icons/md';
import EditProfile from './editProfile';
function ProfileComponent() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.users);
  const token = sessionStorage.getItem('token');
  const decodeToken = token ? jwtDecode<JwtPayload>(token) : null;
  const threads = useSelector((state: RootState) => state.threads);
  const navigate = useNavigate();

  const userLogin = decodeToken?.Payload.id;

  async function getThreads() {
    try {
      const response = await API.get(`/threads/user/${userLogin}`);
      dispatch(GET_THREAD(response.data.data));
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getThreads();
  }, []);

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
      <Box key={data.data.id} p="20px" bg="#1d1d1d" color="white">
        <Center fontWeight="bold" fontSize="20px">
          My Profile
        </Center>
        <Image w="100%" h="180px" bg="red" mt={3} borderRadius={15} src={data.data.background_profile} />
        <Avatar size="xl" src={data.data.photo_profile} ms="20px" bottom="50px" border="2px" borderColor="black" />
        <EditProfile />
        <Box mt="-40px" ms="5px">
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
        <Tabs isFitted variant="enclosed" color="white" pt="50px">
          <TabList color="white">
            <Tab color="white">My Threads</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {threads?.map((thread: IThreads, index) => (
                <Box key={index}>
                  <Box display="flex" gap="11px" alignContent="center">
                    <Avatar size="sm" src={thread.users?.photo_profile} ps="1px" />
                    <Text textColor="#fff" fontSize="15px">
                      {thread?.users?.fullName}
                    </Text>
                    <Text textColor="#828282" fontSize="12px" pt="2px">
                      @{thread?.users?.username}
                    </Text>
                    <Text textColor="#828282" fontSize="12px" pt="2px">
                      • {thread.created_at}
                    </Text>
                  </Box>
                  <Link textColor="#C6C6C6" fontSize="14px" ps="43px">
                    {thread.content}
                  </Link>
                  <Box textColor="#C6C6C6" fontSize="14px" pt="5px" ps="43px" objectFit="cover" maxW="300px">
                    <Image src={thread.image} />
                  </Box>
                  <Flex alignItems="center" ms="35px">
                    <ButtonLikes count={thread.number_of_likes} threads={thread.id} />
                    <Button onClick={() => navigate(`/threads/${thread?.id}`)} display="flex" alignItems="center" colorScheme="#1d1d1d" gap={2} p={1} textColor="#616161" fontSize="14px">
                      <Link>
                        <MdOutlineComment />
                      </Link>
                      <Text>{thread.number_of_replies} Replies</Text>
                    </Button>
                  </Flex>
                  <Divider size="xl" />
                </Box>
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default ProfileComponent;
