import { Avatar, Box, Button, FormLabel, Icon, Input } from '@chakra-ui/react';
import { LuImagePlus } from 'react-icons/lu';
import ReplyList from './replyList';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../libs/api';
import { POST_REPLY } from '../../stores/rootReducer';
import { RootState } from '../../stores/types';

function ReplyThreads() {
  const dispatch = useDispatch();
  const data: any = useSelector((state: RootState) => state.getReply);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'image') {
      if (event.target.files && event.target.files.length) {
        setFile(event.target.files[0]);
      }
    } else {
      setFile(null);
      dispatch(
        POST_REPLY({
          ...data,
          [name]: value,
        })
      );
    }
  };

  console.log(data);

  const handleSubmit = async () => {
    try {
      if (file) {
        const setData = { ...data, image: file };
        await API.post('/replies', setData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate(`/thread/${id}`, { replace: true });
        window.location.reload();
      } else {
        await API.post('/replies', data);
        navigate(`/thread/${id}`, { replace: true });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Change param as post in BE

  return (
    <>
      <Box>
        <Box display="flex" gap="10px" pt="20px" bgColor="#1d1d1d">
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Input variant="unstyled" pb="10px" resize="none" color="white" placeholder="Reply!" value={data.content} name="content" onChange={handleChange} />
          <Box fontSize="25px" display="flex" alignItems="center">
            <FormLabel htmlFor="image">
              <Input type="file" id="image" name="image" hidden onChange={handleChange} />
              <Icon name="image" id="image" as={LuImagePlus} />
            </FormLabel>
            <Button bg="#04A51E" borderRadius={100} textColor="#fff" m={3} w="100%" onClick={handleSubmit}>
              Reply Post
            </Button>
          </Box>
        </Box>
        <ReplyList />
      </Box>
    </>
  );
}

export default ReplyThreads;
