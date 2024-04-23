import { Avatar, Link, Box, Button, Center, Divider, Flex, Image, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, InputGroup, InputLeftElement, InputRightElement, FormControl, FormLabel } from '@chakra-ui/react';
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
import { timeAgo } from '../../features/timeConverstion';
import DeleteThreads from '../../features/deleteThreads';
import { EditIcon } from '@chakra-ui/icons';
function ProfileComponent() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.users);
  const token = sessionStorage.getItem('token');
  const decodeToken = token ? jwtDecode<JwtPayload>(token) : null;
  const threads = useSelector((state: RootState) => state.threads);
  const navigate = useNavigate();
  const profile: any = useSelector((state: RootState) => state.updateUsers);
  const [file, setFile] = useState<File | null>(null);

  const userLogin = decodeToken?.Payload.id;

  async function getThreads() {
    try {
      const response = await API.get(`/threads/user/${userLogin}`);
      dispatch(GET_THREAD(response.data.data));
    } catch (error) {
      throw error;
    }
  }

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
      getThreads();
    }
  }, []);

  return (
    <>
      <Box key={data.data.id} p="20px" bg="#1d1d1d" color="white">
        <Center fontWeight="bold" fontSize="20px">
          My Profile
        </Center>
        <Box className="bg">
          <EditIcon width="30px" height="30px" ms="20px" mt="125px" marginStart="305px" position="absolute" />
          <FormControl>
            <FormLabel htmlFor="image" w="100%">
              <Input type="file" id="image" name="image" style={{ display: 'none' }} />
              <Image
                sx={{
                  '.bg:hover &': {
                    opacity: '10%',
                  },
                }}
                w="100%"
                h="250px"
                mt={3}
                borderRadius={15}
                src={data.data.background_profile}
              />
            </FormLabel>
          </FormControl>
        </Box>
        <Box>
          <Box mt="-50px" width="100px" alignItems="center" className="profile">
            <InputGroup w="100%" _hover={{ color: 'white' }}>
              <InputLeftElement pointerEvents="none" cursor="pointer" w="100%" h="100px">
                <EditIcon width="30px" height="30px" ms="20px" mt="-25px" />
              </InputLeftElement>

              <Input opacity="0" type="file" name="cover_photo" cursor="pointer" w="100%" placeholder="edit cover" _placeholder={{ opacity: 1, color: 'red' }} zIndex="100" accept="image/*" />
              <InputRightElement
                sx={{
                  '.profile:hover &': {
                    opacity: '10%',
                  },
                }}
              >
                <Text bg="#1D1D1D" color="white" p="5" rounded="full" fontSize="20px" width="100px" height="100px" mt="60px" me="40px">
                  <Avatar name="my-box" as="span" mt="-30px" width="100px" height="100px" src={data.data.photo_profile} ms="-20px" border="2px" borderColor="black" />
                </Text>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
        <EditProfile />
        <Box mt="15px" ms="5px">
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
                  <Divider />
                  <Box display="flex" gap="11px" alignContent="center" pt="20px">
                    <Avatar size="sm" name={thread.users?.username} src={thread.users?.photo_profile} ps="1px" />
                    <Text textColor="#fff" fontSize="15px">
                      {thread?.users?.fullName}
                    </Text>
                    <Text textColor="#828282" fontSize="12px" pt="2px">
                      @{thread?.users?.username}
                    </Text>
                    <Text textColor="#828282" fontSize="12px" pt="2px">
                      • {timeAgo(thread.created_at)}
                    </Text>
                    <DeleteThreads />
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
