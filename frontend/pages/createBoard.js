import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { useQueryClient, useMutation } from 'react-query';
import createBoard from '../api/createBoard';
import Login from './login';

export default function CreateBoard() {
  // Create constants
  const router = useRouter();
  const queryClient = useQueryClient();

  // Use the auth hook to get user info and verify logged in
  const { isLoading, data, isError, auth } = useAuth();

  // Initialize the react form hook
  const { register, handleSubmit, errors } = useForm();

  // Create the mutation hook for creating a new board
  const mutation = useMutation((boardData) => createBoard(boardData, data.id));

  // Hook for capturing errors
  const [createBoardError, setCreateBoardError] = useState('');

  const onSubmit = async (boardData) => {
    try {
      // Try to make a new user
      const res = await mutation.mutateAsync(boardData);

      // Send the user to the dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setCreateBoardError(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      {isLoading ? (
        'Loading...'
      ) : auth.isAuthenticated ? (
        <div className="p-10 px-40 border border-gray-400 rounded-2xl">
          <div className="flex flex-col items-center justify-center pb-5">
            <h2 className="text-4xl font-medium tracking-wide">Create board</h2>
            <p className="p-2 text-lg tracking-wide">
              It all starts with a name
            </p>
          </div>
          <form
            className="flex flex-col items-center w-64 "
            onSubmit={handleSubmit(onSubmit)}>
            <input
              name="name"
              className="p-2 m-1 tracking-wide border-4 border-gray-200 w-96 rounded-2xl"
              placeholder="Name"
              ref={register({ required: true })}
            />
            {/* register an input */}
            {errors.name && 'A name is required.'}
            <input
              type="submit"
              value="Create"
              className="px-6 py-4 my-3 font-bold tracking-wide text-white bg-red-600 rounded-full "
            />
          </form>
          {createBoardError && (
            <div className="pt-4 text-sm font-bold text-center text-red-700 ">
              {createBoardError.error}
            </div>
          )}
        </div>
      ) : (
        <Login></Login>
      )}
    </div>
  );
}
