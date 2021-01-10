import Link from 'next/link';
import { useQuery } from 'react-query';
import cookie from 'cookie';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import getCurrentUser from '../api/getCurrentUser';
import { useQueryClient } from 'react-query';
import useAuth from '../hooks/useAuth';

export default function Nav({ loggedIn }) {
  // const authContext = useContext(AuthContext);
  const router = new useRouter();
  const queryClient = useQueryClient();
  const { auth, isLoading, data, isError } = useAuth();

  function handleLogOut() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    queryClient.refetchQueries(['me'], { active: true });
    router.push('/login');
  }

  return (
    <nav className="flex flex-row items-center justify-between h-20">
      <div className="text-2xl font-bold tracking-widest pl-7 ">
        <Link href="/">
          <div className="cursor-pointer">
            <span>C</span>
            <span className="text-base">{`orkable`.toUpperCase()}</span>
          </div>
        </Link>
      </div>
      {data && data.id ? (
        <div className="flex flex-row items-center justify-between font-bold tracking-wide">
          <Link href="/dashboard">
            <div className="px-4 cursor-pointer">Dashboard</div>
          </Link>
          {/* TODO: Create account page and add update capability */}
          {/* <Link href="/account">
            <div className="px-4 cursor-pointer">Account</div>
          </Link> */}

          <div className="pl-4 mr-10 cursor-pointer" onClick={handleLogOut}>
            Log out
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between font-bold tracking-wide">
          <Link href="/about">
            <div className="px-4 cursor-pointer">About</div>
          </Link>
          <Link href="/business">
            <div className="px-4 cursor-pointer">Business</div>
          </Link>
          <Link href="/blog">
            <div className="pl-4 mr-10 cursor-pointer">Blog</div>
          </Link>

          <Link href="/login">
            <div className="px-4 py-3 mr-6 text-white bg-red-600 rounded-full cursor-pointer">
              Log in
            </div>
          </Link>
          <Link href="/signup">
            <div className="px-4 py-3 mr-6 bg-gray-200 rounded-full cursor-pointer">
              Sign up
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}
