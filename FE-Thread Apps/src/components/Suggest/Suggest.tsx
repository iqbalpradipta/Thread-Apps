import { Flex, Avatar, Box, Text, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_USERS } from '../../stores/rootReducer';
import { RootState } from '../../stores/types';
import { API } from '../../libs/api';
import { useEffect, useState } from 'react';
import { IUsers } from '../../types/threadsInterface';
import ButtonFollow from './buttonSuggest';
import { useParams } from 'react-router-dom';

function Suggest() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.usersGet);
  const getUsers = async () => {
    try {
      const response = await API.get('/users/suggest');
      dispatch(GET_ALL_USERS(response.data.data));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Flex>
        <Box bg="#262626" w="300px" p="15px" borderRadius={15}>
          <Text fontWeight="bold">Suggest For You</Text>
          {data?.data.map((data: IUsers, index: number) => {
            return (
              <Box pt={2} display="flex" key={index}>
                <Avatar size="sm" src={data.photo_profile} border="2px" borderColor="black" />
                <Box>
                  <Text fontSize="sm" ps="8px">
                    {data.fullName}
                  </Text>
                  <Text as="sup" ps="8px" color="#5D5D5D">
                    @{data.username}
                  </Text>
                </Box>
                <ButtonFollow id={data.id}  />
              </Box>
            );
          })}
        </Box>
      </Flex>
    </>
  );
}

export default Suggest;
