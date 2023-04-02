import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/useAuth';
import { Button } from '@/components/ui/Button';
import Header from '@/components/Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { signIn, withGitHub, withGoogle } = useAuth();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signIn(email, password);
      router.push('/');
    } catch (error) {
      setError('error');
    }
  };

  const handleWithGitHub = async () => {
    console.log('Github Auth');
    try {
      await withGitHub();
    } catch (error) {
      setError('error');
    }
  };

  const handleWithGoogle = () => {
    console.log('Google Auth');
    try {
      withGoogle();
    } catch (error) {
      setError('error');
    }
  };

  return (
    <>
      <Header topicHeader={undefined} />
      <div className="min-h-screen -mt-[70px] flex items-center justify-center bg-gray-50  px-4 sm:px-6 lg:px-8">
        <div className="max-w-xs w-full">
          <div>
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">login to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px space-y-[12px]">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="border relative block w-full px-3 py-2 sm:text-sm rounded-[5px]"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="border relative block w-full px-3 py-2 sm:text-sm rounded-[5px]"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <Button className="w-full">Sign In</Button>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-gray-600 hover:text-gray-500">
                  Forgot your password?
                </a>
              </div>
            </div>
          </form>

          <div className="space-y-[10px]">

          <div className="border-t border border-black/1 my-[12px]"></div>


            <Button isLoading={false} onClick={() => handleWithGoogle()} className="w-full">
              Using Google
            </Button>

            <Button isLoading={false} onClick={() => handleWithGitHub()} className="w-full">
              Using Github
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
function withGitHub() {
  throw new Error('Function not implemented.');
}

function withGoogle() {
  throw new Error('Function not implemented.');
}
