import { Avatar, Box, Button, Divider, Flex, Text, Image, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineComment } from 'react-icons/md';
import { IThreads } from '../types/threadsInterface';
import { API } from '../libs/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/types';
import React, { useEffect, useState } from 'react';
import { GET_THREAD } from '../stores/rootReducer';
import ButtonLikes from '../components/Like/ButtonLikes';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';

function Posting() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.threads);
  const navigate = useNavigate();
  const [isLikes, setIsLikes] = useState(false);

  async function getThreads() {
    try {
      const response = await API.get('/threads');
      console.log(response);
      dispatch(GET_THREAD(response.data.data));
    } catch (error) {
      throw error;
    }
  }

  const handleChange = async (id: number) => {
    if (!isLikes) {
      setIsLikes(true);
      await API.post('/likes', id);
      console.log('ini post', id)
    } else {
      setIsLikes(false);
      await API.post('/likes');
    }
  };

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <>
      {data?.map((thread: IThreads) => (
        <Box key={thread.id}>
          <Divider />
          <Box display="flex" gap="11px" alignContent="center" pt="20px">
            <Avatar size="sm" name="Dan Abrahmov" src="https://www.ohio.edu/sites/default/files/styles/max_650x650/public/default_images/portrait-missing.png?itok=kJDBXz-_" ps="1px" />
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
            <Button display="flex" alignItems="center" onClick={() => handleChange(thread.id)} colorScheme="#1d1d1d" gap={2} ps={1} m={1} textColor="#616161" fontSize="14px">
              {isLikes ? <FaHeart color="red" /> : <CiHeart />}
              <Text>{thread.number_of_likes}</Text>
            </Button>
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
