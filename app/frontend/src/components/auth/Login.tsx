import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button
} from '@mantine/core';
import { useState } from 'react';
import AuthAPI from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const accessTokenDao = await AuthAPI.login(email, password);
    localStorage.setItem('accessToken', accessTokenDao.accessToken);
    navigate('/');
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don't have an account?{' '}
        <Anchor size="sm" onClick={() => navigate('/signup')} component="button">Sign Up</Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          required
          placeholder="test@gmail.com"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          mb='md'
        />

        <PasswordInput
          label="Password"
          required
          placeholder="Your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          mt="md"
        />

        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Sign In
        </Button>
      </Paper>
    </Container>
  );
}
