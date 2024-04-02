import { Box, Text, Avatar, Divider, Image } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/types';
import { API } from '../../libs/api';
import { GET_REPLY } from '../../stores/rootReducer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IReply } from '../../types/replyInterface';
import { timeAgo } from '../../features/timeConverstion';

function ReplyList() {
  const dispatch = useDispatch();
  const reply = useSelector((state: RootState) => state.getReply);

  const { id } = useParams();

  const getReply = async () => {
    try {
      const response = await API.get(`/replies/threads/${id}`);
      if (response) {
        dispatch(GET_REPLY(response.data));
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
      <Box h="calc(100vh)" bgColor="#1d1d1d" w="100%">
        {Array.isArray(reply.data) &&
          reply.data.map((replyItem: IReply) => (
            <Box key={replyItem.id}>
              <Box display="flex" gap="11px" alignContent="center" pt="20px">
                <Avatar name={replyItem.users?.fullName || ''} src={replyItem.users?.photo_profile || ''} size="sm" ps="1px" />
                <Text textColor="#fff" fontSize="15px">
                  {replyItem.users?.username || ''}
                </Text>
                <Text textColor="#828282" fontSize="12px" pt="2px">
                  @{replyItem.users?.username || ''}
                </Text>
                <Text textColor="#828282" fontSize="12px" pt="2px">
                  • {timeAgo(replyItem.created_at)}
                </Text>
              </Box>
              <Text textColor="#C6C6C6" fontSize="14px" ps="43px">
                {replyItem.content}
              </Text>
              {replyItem.image && (
                <Box textColor="#C6C6C6" fontSize="14px" pt="5px" ps="43px" objectFit="cover" maxW="300px">
                  <Image src={replyItem.image} />
                </Box>
              )}
              <Divider colorScheme="gray" size="100px" p="10px" />
            </Box>
          ))}
      </Box>
    </>
  );
}

export default ReplyList;
