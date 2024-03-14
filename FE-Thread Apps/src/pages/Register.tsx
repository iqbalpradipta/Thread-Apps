import { Box, Container, Text, Link, Input, Button } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { API } from '../libs/api';
import { IThreadsRegister } from '../types/registersInterface';

function Register() {
  const [dataRegister, setDataRegister] = React.useState<IThreadsRegister>({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const UserData = {
        username: dataRegister.username,
        email: dataRegister.email,
        password: dataRegister.password,
      };
      const response = await API.post('/register', UserData);
      navigate('/Login', { replace: true });
      window.location.reload()
      console.log(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <>
      <Box bg="#1D1D1D" h="calc(100vh)">
        <Container>
          <Box p={9}>
            <Text textColor="#04A51E" fontWeight="bold" fontSize="50px">
              circle
            </Text>
            <Text color="white" fontWeight="bold" fontSize={26}>
              Create account Circle
            </Text>
            <Input placeholder="Username *" name="username" color="white" isRequired size="lg" mt={5} value={dataRegister.username} onChange={handleChange} />
            <Input placeholder="Email *" name="email" type="email" color="white" isRequired size="lg" mt={5} value={dataRegister.email} onChange={handleChange} />
            <Input placeholder="Password *" name="password" type="password" color="white" isRequired size="lg" mt={5} value={dataRegister.password} onChange={handleChange} />
            <Button bg="#04A51E" borderRadius={100} width="100%" textColor="#fff" mt={4} onClick={handleSubmit}>
              Register
            </Button>
            <Text color="white" align="start" mt={2}>
              Already have account?{' '}
              <Link as={ReactRouterLink} to="/Login" color="#04A51E">
                Login
              </Link>
            </Text>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Register;
