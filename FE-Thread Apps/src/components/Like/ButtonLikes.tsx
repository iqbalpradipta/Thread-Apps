import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/types';
import React, { useState } from 'react';
import { POST_LIKE } from '../../stores/rootReducer';
import { Button, Text } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { API } from '../../libs/api';
import { useParams } from 'react-router-dom';

interface LikeCount {
  count: number;
  threads: number | string | undefined
}

const ButtonLikes: React.FC<LikeCount> = ({ count, threads }) => {
  const [isLike, setIsLikes] = useState(false);

  const handleChange = async () => {
    await API.post('/likes', threads);
    setIsLikes(true);
  };

  console.log(`ini threads`, threads)

  return (
    <>
      <Button display="flex" alignItems="center" onClick={handleChange}  colorScheme="#1d1d1d" gap={2} ps={1} m={1} textColor="#616161" fontSize="14px">
        {isLike ? <FaHeart color="red" /> : <CiHeart />}
        <Text>{count}</Text>
      </Button>
    </>
  );
};

export default ButtonLikes;
