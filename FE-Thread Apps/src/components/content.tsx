import { Avatar, Box, Divider, Button, Input, FormLabel, Icon, FormControl } from '@chakra-ui/react';
import { LuImagePlus } from 'react-icons/lu';
import Posting from '../features/posting';
import { API } from '../libs/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/types';
import { POST_THREAD } from '../stores/rootReducer';
import React, { useState } from 'react';

function Content() {
  const dispatch = useDispatch();
  const data: any = useSelector((state: RootState) => state.threadsPost);
  const [file, setFile] = useState<File | null>(null);
  const token = sessionStorage.getItem('token');

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'image') {
      if (event.target.files && event.target.files.length) {
        setFile(event.target.files[0]);
      }
    } else {
      setFile(null);
      dispatch(
        POST_THREAD({
          ...data,
          [name]: value,
        })
      );
    }
  };

  console.log(`ini threads`, data)

  const handleSubmit = async () => {
    try {
      if (file) {
        const setData = { ...data, image: file };
        await API.post('/threads', setData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate('/', { replace: true });
        window.location.reload();
      } else {
        await API.post('/threads', data);
        navigate('/', { replace: true });
        window.location.reload();
      }

      console.log(data)
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <>
      <Box backgroundColor="#1d1d1d" p={1.5}>
        {token ? (
          <>
            <Box display="flex" gap="20px" alignContent="center" pt="20px" color="#07941E" ps="10px">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <Input variant="unstyled" pb="10px" resize="none" color="white" placeholder="What is Happening?!" value={data.content} name="content" onChange={handleChange} />
              <Box fontSize="25px" display="flex">
                <FormControl>
                  <FormLabel htmlFor="image">
                    <Input type="file" id="image" name="image" style={{ display: 'none' }} onChange={handleChange} />
                    <Icon as={LuImagePlus} />
                  </FormLabel>
                </FormControl>
                <Button bg="#04A51E" borderRadius={100} textColor="#fff" m={3} w="80px" onClick={handleSubmit}>
                  Post
                </Button>
              </Box>
            </Box>
            <Divider colorScheme="gray" size="100px" />
            <Posting />
          </>
        ) : (
          <>
            <Posting />
          </>
        )}
      </Box>
    </>
  );
}

export default Content;
