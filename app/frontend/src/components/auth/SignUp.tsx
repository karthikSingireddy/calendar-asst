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
  Button, em
} from '@mantine/core';
import { useState } from 'react';
import AuthAPI from '../../api/auth';

export function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignUp() {
    console.log(firstName, lastName, email, password);
    AuthAPI.signUp(firstName, lastName, email, password);
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button">
          Sign In
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="First Name"
          required
          placeholder="Milo"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          mb='md'
        />

        <TextInput
          label="Last Name"
          required
          placeholder="Singireddy"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          mb='md'
        />

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
        <Button fullWidth mt="xl" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
}
