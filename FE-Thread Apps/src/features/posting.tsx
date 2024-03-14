import { Avatar, Box, Button, Divider, Flex, Text, Image, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { MdOutlineComment } from 'react-icons/md';
import { IThreads } from '../types/threadsInterface';
import { API } from '../libs/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/types';
import { useEffect } from 'react';
import { GET_THREAD } from '../stores/rootReducer';
import ButtonLikes from './buttonLike';

function Posting() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.threads);
  const navigate = useNavigate();

  async function getThreads() {
    try {
      const response = await API.get('/threads');
      console.log(response);
      dispatch(GET_THREAD(response.data.data));
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <>
      {data?.map((threads: IThreads) => (
        <Box key={threads.id}>
          <Divider />
          <Box display="flex" gap="11px" alignContent="center" pt="20px">
            <Avatar size="sm" name="Dan Abrahmov" src="https://www.ohio.edu/sites/default/files/styles/max_650x650/public/default_images/portrait-missing.png?itok=kJDBXz-_" ps="1px" />
            <Text textColor="#fff" fontSize="15px">
              {threads?.users?.fullName}
            </Text>
            <Text textColor="#828282" fontSize="12px" pt="2px">
              @{threads?.users?.username}
            </Text>
            <Text textColor="#828282" fontSize="12px" pt="2px">
              • {threads.created_at}
            </Text>
          </Box>
          <Link textColor="#C6C6C6" fontSize="14px" ps="43px">
            {threads.content}
          </Link>
          <Box textColor="#C6C6C6" fontSize="14px" pt="5px" ps="43px" objectFit="cover" maxW="300px">
            <Image src={threads.image} />
          </Box>
          <Flex alignItems="center" ms="35px">
            <ButtonLikes iniLike={threads.number_of_likes} />
            <Button onClick={() => navigate(`/thread/${threads?.id}`)} display="flex" alignItems="center" colorScheme="#1d1d1d" gap={2} p={1} textColor="#616161" fontSize="14px">
              <Link>
                <MdOutlineComment />
              </Link>
              <Text>{threads.number_of_replies} Replies</Text>
            </Button>
          </Flex>
        </Box>
      ))}
      )
    </>
  );
}
export default Posting;
