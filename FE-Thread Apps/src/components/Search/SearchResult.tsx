import { Avatar, Box, Button, Card, CardBody, Heading, Stack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../libs/api';
import { GET_ALL_USERS } from '../../stores/rootReducer';
import { RootState } from '../../stores/types';
import { useEffect } from 'react';

function SearchResult({ searchInput }: { searchInput: string }) {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.usersGet);

  const getUsers = async () => {
    try {
      const response = await API.get('/users');
      dispatch(GET_ALL_USERS(response.data.data));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredData = searchInput ? data?.data.filter((user: any) => user.fullName.toLowerCase().includes(searchInput.toLowerCase())) : data.data;

  return (
    <>
      <Box backgroundColor="#1d1d1d" h="calc(100vh)" p="30px">
        {filteredData?.map((users) => (
          <Card key={users.id} direction={{ base: 'column', sm: 'row' }} mt="10px" overflow="hidden" variant="outline" backgroundColor="#1d1d1d">
            <Avatar size="md" name="Ryan Florentine" mt="20px" ms="10px" src="https://bit.ly/ryan-florence" />{' '}
            <Stack backgroundColor="#1d1d1d" top="10px">
              <CardBody color="white">
                <Box>
                  <Heading size="md">{users.fullName}</Heading>
                  <Text py="2" fontSize="13px">
                    @{users.username}
                  </Text>
                  <Button ms="430px" position="absolute" bottom="33px" borderRadius="100px">
                    Follow
                  </Button>
                </Box>
              </CardBody>
            </Stack>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default SearchResult;
