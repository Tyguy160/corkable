import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import signup from '../api/signup';

export default function Signup() {
  // Create constants
  const router = useRouter();
  const queryClient = useQueryClient();

  // Initialize the react form hook
  const { register, handleSubmit, errors } = useForm();

  // Create the mutation hook for signing up
  const mutation = useMutation((loginData) => signup(loginData));

  // Hook for capturing errors
  const [signupError, setSignupError] = useState('');

  const onSubmit = async (data) => {
    try {
      // Try to make a new user
      const res = await mutation.mutateAsync(data);

      // If we get an error from the server, handle it in the catch
      if (res.errors) {
        throw res;
      }
      // Create a new token cookie
      document.cookie = `token=${res.token}`;

      // Refetch the me query to get user info using new token
      queryClient.refetchQueries(['me'], { active: true });

      // Send the user to the dashboard
      router.push('/dashboard');
    } catch (err) {
      // Store the error (for printing to user)
      setSignupError(err);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <div className="p-10 border border-gray-400 rounded-2xl">
        <div className="flex flex-col items-center justify-center pb-5">
          <h2 className="text-4xl font-medium tracking-wide">
            Welcome to Corkable
          </h2>
          <p className="p-2 text-lg tracking-wide">Find new ideas to try</p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            className="p-2 m-1 tracking-wide border-4 border-gray-200 rounded-2xl"
            placeholder="Name"
            ref={register({ required: true })}
          />
          {/* register an input */}
          {errors.name && 'A name is required.'}
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
          {errors.password && 'A password is required.'}
          <input
            name="age"
            placeholder="Age"
            className="p-2 m-1 tracking-wide border-4 border-gray-200 rounded-2xl"
            ref={register({ required: true })}
          />
          {errors.password && 'You must be at least 13 years old.'}

          <input
            type="submit"
            value="Continue"
            className="px-3 py-3 my-3 font-bold tracking-wide text-white bg-red-600 rounded-full"
          />
        </form>
        {signupError &&
          signupError.errors.map((error) => (
            <div className="pt-4 text-sm font-bold text-center text-red-700 ">
              {error.msg}
            </div>
          ))}
      </div>
    </div>
  );
}
