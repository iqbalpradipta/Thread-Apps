import { Avatar, Box, Button, Divider, Flex, Text, Image, Link, IconButton, CloseButton, useDisclosure, Fade } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineComment } from 'react-icons/md';
import { IThreads } from '../types/threadsInterface';
import { API } from '../libs/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/types';
import React, { useEffect } from 'react';
import { GET_THREAD } from '../stores/rootReducer';
import ButtonLikes from '../components/Like/ButtonLikes';
import DeleteThreads from './deleteThreads';
import { timeAgo } from './timeConverstion';

function Posting() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.threads);
  const navigate = useNavigate();

  async function getThreads() {
    try {
      const response = await API.get('/threads');
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
      {data?.map((thread: IThreads, index) => (
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
            <DeleteThreads />l
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
      )
    </>
  );
}
export default Posting;
