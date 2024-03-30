import { Divider, Avatar, Flex, Button, Box, Text, Image, Link } from '@chakra-ui/react';
import { Link as ChakraRouterLink, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { MdOutlineComment } from 'react-icons/md';
import ReplyThreads from '../Reply/replyThreads';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/types';
import { API } from '../../libs/api';
import { useEffect } from 'react';
import { GET_DETAIL } from '../../stores/rootReducer';
import ButtonLikes from '../Like/ButtonLikes';

function ThreadsDetail() {
  const dispatch = useDispatch();
  const thread = useSelector((state: RootState) => state.threadsDetail);

  const { id } = useParams();
  const getThreadDetail = async () => {
    try {
      const response = await API.get(`/threads/${id}`);
      dispatch(GET_DETAIL(response.data.data));
    //   console.log(response.data.data);
    } catch (error) {
      throw error;
    }
  };


  useEffect(() => {
    getThreadDetail();
  }, []);
  return (
    <>
      <Box backgroundColor="#1d1d1d" p={1.5}>
        <Flex fontSize="25px" color="white">
          <Link as={ChakraRouterLink} to="/" pt="8px">
            <Button colorScheme="#1d1d1d">
              <FaArrowLeft />
            </Button>
          </Link>
          <Box ps="14px">
            <Text color="white" fontSize="25px">
              Status
            </Text>
          </Box>
        </Flex>
        <Box p={1.5}>
          <Box display="flex" gap="11px" alignContent="center" pt="20px">
            <Avatar size="sm" name="Dan Abrahmov" src="https://www.ohio.edu/sites/default/files/styles/max_650x650/public/default_images/portrait-missing.png?itok=kJDBXz-_" ps="1px" />
            <Text textColor="#fff" fontSize="17px">
              {thread.data.users?.fullName}
            </Text>
          </Box>
          <Box position="relative" ps="40px" bottom="10px" alignContent="center">
            <Text textColor="#828282" fontSize="13px" pt="2px">
              @{thread.data.users?.username}
            </Text>
          </Box>
          <Link color="#C6C6C6" fontSize="14px">
            {thread.data.content}
          </Link>
          <Box textColor="#C6C6C6" fontSize="14px" pt="5px" objectFit="cover" maxW="300px">
            <Image src={thread.data.image} />
          </Box>
          <Flex alignItems="center">
            <ButtonLikes count={thread.data.number_of_likes} threads={thread.data.id} />
            <Button display="flex" alignItems="center" colorScheme="#1d1d1d" gap={2} p={1} textColor="#616161" fontSize="14px">
              <MdOutlineComment />
              <Text>{thread.data.number_of_replies} Replies</Text>
            </Button>
          </Flex>
          <Divider colorScheme="gray" size="100px" />
          <ReplyThreads />
          <Divider colorScheme="gray" size="100px" />
        </Box>
      </Box>
    </>
  );
}

export default ThreadsDetail;
