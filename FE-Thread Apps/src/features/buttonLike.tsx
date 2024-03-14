import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';

export interface Likes {
  iniLike: number;
}

const ButtonLikes: React.FC<Likes> = ({ iniLike }) => {
  const [count, setCount] = React.useState<number>(iniLike);
  const [isLikes, setIsLike] = React.useState<boolean>(false);

  const LikeCount = () => {
    if (!isLikes) {
      setIsLike(true);
      setCount(count + 1);
    } else {
      setIsLike(false);
      setCount(count - 1);
    }
  };

  return (
    <>
      <Button display="flex" alignItems="center" onClick={LikeCount} colorScheme="#1d1d1d" gap={2} ps={1} m={1} textColor="#616161" fontSize="14px">
        {isLikes ? <FaHeart color="red" /> : <CiHeart />}
        <Text>{count}</Text>
      </Button>
    </>
  );
};

export default ButtonLikes;
