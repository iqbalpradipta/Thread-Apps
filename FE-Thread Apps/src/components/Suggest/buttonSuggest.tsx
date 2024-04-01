import { Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/types';
import { API } from '../../libs/api';
import { POST_FOLLOW } from '../../stores/rootReducer';

interface suggestId {
  id: number | undefined;
}

const ButtonFollow: React.FC<suggestId> = ({ id }) => {
  const dispatch = useDispatch();
  const following = useSelector((state: RootState) => state.postFollow);
  const [isFollow, setIsFollow] = React.useState<boolean>(false);

  useEffect(() => {
    const storedIsFollow = localStorage.getItem(`isFollow_${id}`);
    if (storedIsFollow !== null) {
      setIsFollow(storedIsFollow === 'true');
    }
  }, []);

  const getFollow = async () => {
    const response = await API.post(`/following/${id}`, following);
    dispatch(POST_FOLLOW(response.data));
    setIsFollow(true);
    localStorage.setItem(`isFollow_${id}`, 'true');
  };

  const unfollow = async () => {
    const response = await API.post(`/following/${id}`, following);
    dispatch(POST_FOLLOW(response.data));
    setIsFollow(false);
    localStorage.setItem(`isFollow_${id}`, 'false');
  };

  return (
    <>
      {!isFollow ? (
        <Button variant="outline" onClick={getFollow} colorScheme="white" borderRadius={25} size="sm" marginStart="180px" pos="absolute">
          Follow
        </Button>
      ) : (
        <Button variant="outline" onClick={unfollow} colorScheme="white" borderRadius={25} size="sm" marginStart="180px" pos="absolute">
          Following
        </Button>
      )}
    </>
  );
};

export default ButtonFollow;
