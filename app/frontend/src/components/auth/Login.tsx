import { useState } from 'react';
import AuthAPI from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label, Toggle } from '@calendar-asst/components';
import { CheckIcon } from '@radix-ui/react-icons';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, toggleRememberPassword] = useState(false);

  async function handleLogin() {
    const accessTokenDao = await AuthAPI.login(email, password);
    localStorage.setItem('accessToken', accessTokenDao.accessToken);
    navigate('/');
  }

  return (
    <div className="flex justify-center items-center" style={{ height: '100vh'}}>
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-muted-foreground">Enter your email and password to sign in to your account.</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email error">Email</Label>
            <Input
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Toggle
              variant="outline"
              aria-label="Remember me"
              pressed={rememberPassword}
              onPressedChange={toggleRememberPassword}
            >
              <CheckIcon className="mr-2 h-4 w-4" />
              Remember me
            </Toggle>
            <div className="text-sm font-medium underline underline-offset-2 hover:text-primary cursor-pointer">Forgot password?</div>
          </div>
          <Button type="submit" className="w-full" onClick={handleLogin}>
            Sign In
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <span
              onClick={() => navigate('/signup')}
              className="font-medium underline underline-offset-2 hover:text-primary">
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
