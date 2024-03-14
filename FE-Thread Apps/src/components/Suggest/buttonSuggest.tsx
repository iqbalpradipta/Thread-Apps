import { Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/types';
import { API } from '../../libs/api';
import { POST_FOLLOW } from '../../stores/rootReducer';
import { useParams } from 'react-router-dom';
import { IFollows } from '../../types/followsInterface';
import { IUsers } from '../../types/threadsInterface';

const ButtonFollow = (id: any) => {
  const [isFollow, setIsFollow] = React.useState([]);
  const dispatch = useDispatch();
  const following = useSelector((state: RootState) => state.postFollow);
  const getFollow = async () => {
    const response = await API.post(`/following/${id}`, following);
    dispatch(POST_FOLLOW(response.data));
  };

  return (
    <>
      {!isFollow ? (
        <Button variant="outline" onClick={getFollow} colorScheme="white" borderRadius={25} size="sm" marginStart="180px" pos="absolute">
          Follow
        </Button>
      ) : (
        <Button variant="outline" onClick={getFollow} colorScheme="white" borderRadius={25} size="sm" marginStart="180px" pos="absolute">
          Following
        </Button>
      )}
    </>
  );
};

export default ButtonFollow;
