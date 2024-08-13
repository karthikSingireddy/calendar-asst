import { useState } from 'react';
import AuthAPI from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { Input, Label, Button } from '@calendar-asst/components';

export function SignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignUp() {
    try {
      const res = await AuthAPI.signUp({ firstName, lastName, email, password });
      navigate('/login')
    }
    catch (error) {
      console.error(error);
    }
  }

  return <div className="flex justify-center items-center" style={{ height: '100vh'}}>
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground" style={{ width: '414px' }}>Enter an email and a password to sign up</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName error">First Name</Label>
          <Input
            type="text"
            placeholder="milo"
            required
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lastName error">Last Name</Label>
          <Input
            type="text"
            placeholder="singireddy"
            required
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lastName error">Email</Label>
          <Input
            type="email"
            placeholder="mg@abcdef.com"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lastName error">Password</Label>
          <Input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" onClick={handleSignUp}>Sign Up</Button>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          className="font-medium underline underline-offset-2 hover:text-primary">
              Log In
        </span>
      </div>

    </div>
  </div>
}
