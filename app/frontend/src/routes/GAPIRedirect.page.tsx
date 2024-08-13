import { useSearchParams } from 'react-router-dom';

export function GAPIRedirectPage() {
  const [searchParams, set] = useSearchParams();

  const code = searchParams.get('code');
  console.log(code);

  return <div>Loading...</div>
}
