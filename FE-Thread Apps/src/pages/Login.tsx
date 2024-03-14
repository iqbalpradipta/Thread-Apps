import { Box, Container, Text, Input, Button, Link, useToast } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { API } from '../libs/api';
import { RootState } from '../stores/types';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_LOGIN } from '../stores/rootReducer';
import { log } from 'console';

function Login() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.auth);
  const toast = useToast();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(
      AUTH_LOGIN({
        ...data,
        [name]: value,
      })
    );
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await API.post('/login', data).then((res) => {
      return res.data;
    });
    try {
      const token = response.token;

      if (token) {
        sessionStorage.setItem('token', token);
      }

      if (sessionStorage.getItem('token')) {
        navigate('/', { replace: true });
      }

      toast({
        title: 'Login success',
        description: `Welcome ${response.username}`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: `${response.messages}`,
        status: 'error',
        duration: 2000,
        position: 'top',
      });
    }
  };

  return (
    <>
      <Box bg="#1D1D1D" p={20} h="calc(100vh)">
        <Container>
          <Box p={9}>
            <Text textColor="#04A51E" fontWeight="bold" fontSize="50px">
              circle
            </Text>
            <Text color="white" fontWeight="bold" fontSize={26}>
              Login to Circle
            </Text>
            <Input placeholder="Email" color="white" size="lg" mt={5} name="email" onChange={handleChange} />
            <Input placeholder="Password" type="password" color="white" size="lg" mt={5} name="password" onChange={handleChange} />
            <Text color="white" align="end" mt={2}>
              Forgot password?
            </Text>
            <Button bg="#04A51E" borderRadius={100} width="100%" textColor="#fff" mt={4} onClick={handleSubmit}>
              Login
            </Button>
            <Text color="white" align="start" mt="13px">
              Don't have an account yet ?{' '}
              <Link as={ReactRouterLink} to="/Register" color="#04A51E">
                Create Account
              </Link>
            </Text>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Login;
