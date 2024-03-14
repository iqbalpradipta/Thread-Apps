import { Avatar, Box, Button, Card, CardBody, Center, Heading, Image, Input, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/types';
import { API } from '../../libs/api';
import { GET_USERS } from '../../stores/rootReducer';
import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
function ProfileComponent() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.users);
  const token = sessionStorage.getItem('token');
  const decodeToken = token ? jwtDecode<JwtPayload>(token) : null;
  const [editProfile, setEditProfile] = useState(false);

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
          <Box key={data.data.id} p="20px" bg="#1d1d1d" color="white">
            <Center fontWeight="bold" fontSize="20px">
              My Profile
            </Center>
            <Image w="100%" h="180px" bg="red" mt={3} borderRadius={15} src="https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?w=740&t=st=1707180635~exp=1707181235~hmac=10e35b2b792774036e09eb9afaeb121f7fb864f6b06e8818706a7be281b45bfd" />
            <Avatar size="2xl" name="Ryan Florence" src="https://bit.ly/ryan-florence" ms="260px" bottom="60px" border="2px" borderColor="black" />
            <Button mt="80px" ms="135px" borderRadius="20px">
              Edit Profile
            </Button>
            <Box display="flex">
              <Text ms="5px" me="10px" fontWeight="bold" fontSize="20px" mt="4px" pe="10px">
                Name
              </Text>
              <Input ms="28px" value={data.data.fullName} disabled />
            </Box>
            <Box display="flex" pt="10px">
              <Text ms="5px" me="10px" fontWeight="bold" fontSize="20px" mt="4px">
                Username
              </Text>
              <Input value={data.data.username} disabled />
            </Box>
            <Box display="flex" pt="10px">
              <Text ms="5px" me="10px" fontWeight="bold" fontSize="20px" mt="4px">
                Bio
              </Text>
              <Input ms="62px" value="Selamat malam karyawan yang lemburnya tidak dibayar " disabled />
            </Box>
            <Tabs isFitted variant="enclosed" color="white" pt="50px">
              <TabList color="white">
                <Tab _selected={{ color: 'white', bg: '#5E5148' }}>Follower</Tab>
                <Tab _selected={{ color: 'white', bg: '#5E5148' }}>Following</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box p="10px">
                    <Card direction={{ base: 'column', sm: 'row' }} mt="10px" overflow="hidden" variant="outline" backgroundColor="#1d1d1d">
                      <Avatar size="md" name="Ryan Florence" mt="20px" ms="10px" src="https://bit.ly/ryan-florence" />{' '}
                      <Stack top="10px">
                        <CardBody color="white">
                          <Box>
                            <Heading size="md">Iqbal Pradipta</Heading>
                            <Text py="2" fontSize="13px">
                              @iqbalpradipta01
                            </Text>
                            <Button ms="410px" position="absolute" bottom="33px" borderRadius="100px">
                              Follow
                            </Button>
                          </Box>
                        </CardBody>
                      </Stack>
                    </Card>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box p="10px">
                    <Card direction={{ base: 'column', sm: 'row' }} mt="10px" overflow="hidden" variant="outline" backgroundColor="#1d1d1d">
                      <Avatar size="md" name="Ryan Florence" mt="20px" ms="10px" src="https://bit.ly/ryan-florence" />{' '}
                      <Stack backgroundColor="#1d1d1d" top="10px">
                        <CardBody color="white">
                          <Box>
                            <Heading size="md">Mister Maindfrik</Heading>
                            <Text py="2" fontSize="13px">
                              @MRY
                            </Text>
                            <Button variant="outline" ms="390px" color="white" position="absolute" bottom="33px" borderRadius="100px">
                              Following
                            </Button>
                          </Box>
                        </CardBody>
                      </Stack>
                    </Card>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </>
      ) : (
        <>
          <Box p="20px" bg="#1d1d1d" color="white">
            <Center fontWeight="bold" fontSize="20px">
              My Profile
            </Center>
            <Image w="100%" h="180px" bg="red" mt={3} borderRadius={15} src="https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?w=740&t=st=1707180635~exp=1707181235~hmac=10e35b2b792774036e09eb9afaeb121f7fb864f6b06e8818706a7be281b45bfd" />
            <Avatar size="2xl" name="Ryan Florence" src="https://bit.ly/ryan-florence" ms="260px" bottom="60px" border="2px" borderColor="black" />
            <Box display="flex">
              <Text ms="5px" me="10px" fontWeight="bold" fontSize="20px" mt="4px" pe="10px">
                Name
              </Text>
              <Input ms="28px" value="Guest" disabled />
            </Box>
            <Box display="flex" pt="10px">
              <Text ms="5px" me="10px" fontWeight="bold" fontSize="20px" mt="4px">
                Username
              </Text>
              <Input value="Guest" disabled />
            </Box>
            <Box display="flex" pt="10px">
              <Text ms="5px" me="10px" fontWeight="bold" fontSize="20px" mt="4px">
                Bio
              </Text>
              <Input ms="64px" value="Sebelum menggunakan aplikasi ini secara full sebaiknya anda membuat akun terlebih dahulu." disabled />
            </Box>
            <Tabs isFitted variant="enclosed" color="white" pt="50px">
              <TabList color="white">
                <Tab _selected={{ color: 'white', bg: '#5E5148' }}>Follower</Tab>
                <Tab _selected={{ color: 'white', bg: '#5E5148' }}>Following</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box p="10px">
                    <Card direction={{ base: 'column', sm: 'row' }} mt="10px" overflow="hidden" variant="outline" backgroundColor="#1d1d1d">
                      <Avatar size="md" name="Ryan Florence" mt="20px" ms="10px" src="https://bit.ly/ryan-florence" />{' '}
                      <Stack top="10px">
                        <CardBody color="white">
                          <Box>
                            <Heading size="md">Iqbal Pradipta</Heading>
                            <Text py="2" fontSize="13px">
                              @iqbalpradipta01
                            </Text>
                            <Button ms="410px" position="absolute" bottom="33px" borderRadius="100px">
                              Follow
                            </Button>
                          </Box>
                        </CardBody>
                      </Stack>
                    </Card>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box p="10px">
                    <Card direction={{ base: 'column', sm: 'row' }} mt="10px" overflow="hidden" variant="outline" backgroundColor="#1d1d1d">
                      <Avatar size="md" name="Ryan Florence" mt="20px" ms="10px" src="https://bit.ly/ryan-florence" />{' '}
                      <Stack backgroundColor="#1d1d1d" top="10px">
                        <CardBody color="white">
                          <Box>
                            <Heading size="md">Mister Maindfrik</Heading>
                            <Text py="2" fontSize="13px">
                              @MRY
                            </Text>
                            <Button variant="outline" ms="390px" color="white" position="absolute" bottom="33px" borderRadius="100px">
                              Following
                            </Button>
                          </Box>
                        </CardBody>
                      </Stack>
                    </Card>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </>
      )}
    </>
  );
}

export default ProfileComponent;
