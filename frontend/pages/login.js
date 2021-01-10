import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import cookie from 'cookie';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import login from '../api/login';
import { useQuery, useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import AuthContext from '../context/AuthContext';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Hooks
  const { auth } = useAuth();
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const mutation = useMutation((loginData) => login(loginData));
  const [loginErrors, setLoginErrors] = useState({});

  const onSubmit = async (data) => {
    try {
      // Get the token from the server
      const res = await mutation.mutateAsync(data);

      // Store the token in context
      auth.token = res.token;

      // Toggle the authenticated status in context
      auth.login();

      // Store the token as a cookie
      document.cookie = `token=${res.token}`;

      // Refetch the query to get the current user
      await queryClient.refetchQueries(['me'], { active: true });

      // Push the user to their dashboard
      router.push('/dashboard');
    } catch (err) {
      // Store the error for displaying to the user
      setLoginErrors(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <div className="p-10 border border-gray-400 rounded-2xl">
        <div className="flex flex-col items-center justify-center pb-8">
          <h2 className="text-4xl font-medium tracking-wide">
            Welcome to Corkable
          </h2>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="email"
            placeholder="Email"
            className="p-2 m-1 tracking-wide border-4 border-gray-200 rounded-2xl"
            ref={register({ required: true })}
          />
          {errors.email && 'An email is required.'}
          <input
            name="password"
            placeholder="Create a password"
            type="password"
            className="p-2 m-1 tracking-wide border-4 border-gray-200 rounded-2xl"
            ref={register({ required: true })}
          />
          {loginErrors.length && 'Something went wrong'}
          {errors.password && 'A password is required.'}

          {/* TODO: Add 'forgot password' functionality' */}

          <input
            type="submit"
            value="Log in"
            className="px-3 py-3 my-3 font-bold tracking-wide text-white bg-red-600 rounded-full"
          />
        </form>
      </div>
    </div>
  );
}
