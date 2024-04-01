import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/types';
import React, { useEffect, useState } from 'react';
import { POST_LIKE } from '../../stores/rootReducer'; // Memperbarui import
import { Button, Text } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { API } from '../../libs/api';
import { useParams } from 'react-router-dom';

interface LikeCount {
  count: number;
  threads: number | undefined;
}

const ButtonLikes: React.FC<LikeCount> = ({ count, threads }) => {
  const dispatch = useDispatch();
  const likes = useSelector((state: RootState) => state.postLike);
  const [isLike, setIsLike] = useState(() => {
    const storedValue = localStorage.getItem(`isLike-${threads}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem(`isLike-${threads}`, JSON.stringify(isLike));
  }, [isLike, threads]);

  const handleLike = async () => {
    try {
      const getId = { ...likes, threads };
      if (isLike) {
        await API.post('/likes', getId);
        dispatch(POST_LIKE({ ...likes, [`${threads}`]: count - 1}));
      } else {
        await API.post('/likes', getId);
        dispatch(POST_LIKE({ ...likes, [`${threads}`]: count + 1 }));
      }
      setIsLike(!isLike);

    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Button display="flex" alignItems="center" onClick={handleLike} value={threads} colorScheme="#1d1d1d" gap={2} ps={1} m={1} textColor="#616161" fontSize="14px">
        {isLike ? <FaHeart color="red" /> : <CiHeart />}
        <Text>{count}</Text>
      </Button>
    </>
  );
};

export default ButtonLikes;
