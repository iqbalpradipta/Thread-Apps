import { Box, Text, Avatar, Link, Image, Divider } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/types';
import { API } from '../../libs/api';
import { GET_REPLY } from '../../stores/rootReducer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IThreads } from '../../types/threadsInterface';

function ReplyList() {
  const dispatch = useDispatch();
  const reply = useSelector((state: RootState) => state.getReply);
  const [getUsers, setGetUsers] = useState(false);

  const { id } = useParams();

  const getReply = async () => {
    try {
      const response = await API.get(`/threads/${id}`);
      console.log(response.data.data);
      if (response) {
        dispatch(GET_REPLY(response.data.data));
        setGetUsers(true);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getReply();
  }, []);

  return (
    <>
      <Divider colorScheme="gray" size="100px" />
      {getUsers ? (
        <>
          {' '}
          <Box key={reply?.data.id} h="calc(100vh)" bgColor="#1d1d1d" w="100%">
            {reply.data.replies.map((state, index) => (
              <>
                <Box key={index} display="flex" gap="11px" alignContent="center" pt="20px">
                  <Avatar size="sm" name="Dan Abrahmov" src="https://www.ohio.edu/sites/default/files/styles/max_650x650/public/default_images/portrait-missing.png?itok=kJDBXz-_" ps="1px" />
                  <Text textColor="#fff" fontSize="15px">
                    {reply.data.users?.fullName}
                  </Text>
                  <Text textColor="#828282" fontSize="12px" pt="2px">
                    @{reply?.data.users?.username}
                  </Text>
                  <Text textColor="#828282" fontSize="12px" pt="2px">
                    • {reply?.data.created_at}
                  </Text>
                </Box>
                <Link textColor="#C6C6C6" fontSize="14px" ps="43px">
                  {state?.content}
                </Link>
                <Box textColor="#C6C6C6" fontSize="14px" pt="5px" ps="43px" objectFit="cover" maxW="300px">
                  <Image src={state?.image} />
                </Box>
              </>
            ))}
          </Box>{' '}
        </>
      ) : (
        <Box h="calc(100vh)"></Box>
      )}
    </>
  );
}

export default ReplyList;
