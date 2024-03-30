import { Tabs, TabList, Tab, TabPanels, TabPanel, Box, Card, Avatar, Stack, CardBody, Text, Heading, Button } from '@chakra-ui/react';
import Layout from '../../layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/types';
import { API } from '../../libs/api';
import { GET_FOLLOW } from '../../stores/rootReducer';
import { useEffect } from 'react';
function FollowingComponent() {
  const dispatch = useDispatch();
  const follow = useSelector((state: RootState) => state.getFollow);

  const GetFollows = async () => {
    try {
      const responseFollowing = await API.get(`/following`);
      const responseFollower = await API.get(`/follower`);
      dispatch(GET_FOLLOW({
        following: responseFollowing.data.data,
        follower: responseFollower.data.data,
      }));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    GetFollows();
  }, []);

  return (
    <Layout>
      <>
        <Tabs isFitted variant="enclosed" bg="#1d1d1d" h="calc(100vh)" color="white" p="20px">
          <TabList color="white">
            <Tab _selected={{ color: 'white', bg: '#5E5148' }}>Follower</Tab>
            <Tab _selected={{ color: 'white', bg: '#5E5148' }}>Following</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box p="10px">
                {follow.data?.follower?.map((user) => (
                  <Card key={user.id} direction={{ base: 'column', sm: 'row' }} mt="10px" overflow="hidden" variant="outline" backgroundColor="#1d1d1d">
                    <Avatar size="md" name="Ryan Florence" mt="20px" ms="10px" src="https://bit.ly/ryan-florence" />{' '}
                    <Stack backgroundColor="#1d1d1d" top="10px">
                      <CardBody color="white">
                        <Box>
                          <Heading size="md">{user.usersFollower.fullName}</Heading>
                          <Text py="2" fontSize="13px">
                            @{user.usersFollower.username}
                          </Text>
                          <Button ms="390px" position="absolute" bottom="33px" borderRadius="100px">
                            Follow
                          </Button>
                        </Box>
                      </CardBody>
                    </Stack>
                  </Card>
                ))}
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p="10px">
                {follow.data?.following?.map((user) => (
                  <Card key={user.id} direction={{ base: 'column', sm: 'row' }} mt="10px" overflow="hidden" variant="outline" backgroundColor="#1d1d1d">
                    <Avatar size="md" name="Ryan Florence" mt="20px" ms="10px" src="https://bit.ly/ryan-florence" />{' '}
                    <Stack backgroundColor="#1d1d1d" top="10px">
                      <CardBody color="white">
                        <Box>
                          <Heading size="md">{user.usersFollowing.fullName}</Heading>
                          <Text py="2" fontSize="13px">
                            @{user.usersFollowing.username}
                          </Text>
                          <Button variant="outline" ms="390px" color="white" position="absolute" bottom="33px" borderRadius="100px">
                            Following
                          </Button>
                        </Box>
                      </CardBody>
                    </Stack>
                  </Card>
                ))}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    </Layout>
  );
}

export default FollowingComponent;
