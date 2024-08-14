import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import AuthAPI from '../api/auth';

export function GAPIRedirectPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get('code');
  console.log(code);

  useEffect(() => {
    if (code) {
      AuthAPI.setGapiToken(code)
        .then(() => navigate('/'));
    }
  }, [code]); // eslint-disable-line

  return <div>Loading...</div>
}
