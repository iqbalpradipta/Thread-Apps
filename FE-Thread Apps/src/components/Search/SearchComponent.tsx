import Layout from '../../layout/layout';
import { Box, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { IoSearchOutline } from 'react-icons/io5';
import SearchResult from './SearchResult';
import { useState } from 'react';

function SearchComponent() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (input: string) => {
    setSearchInput(input);
  };

  return (
    <Layout>
      <>
        <Box backgroundColor="#1d1d1d" h="calc(100vh)">
          <InputGroup p="20px">
            <Input
              color="white"
              placeholder="Search your Circle !"
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <InputRightAddon>
              <IoSearchOutline />
            </InputRightAddon>
          </InputGroup>
          <SearchResult searchInput={searchInput} />
        </Box>
      </>
    </Layout>
  );
}

export default SearchComponent;