import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { useQueryClient, useMutation } from 'react-query';
import createPin from '../api/createPin';
import Login from './login';

export default function CreatePin() {
  // Create constants
  const router = useRouter();
  const queryClient = useQueryClient();

  // Use the auth hook to get user info and verify logged in
  const { isLoading, data, isError, auth } = useAuth();

  // Initialize the react form hook
  const { register, handleSubmit, errors } = useForm();

  // Create the mutation hook for creating a new board
  const mutation = useMutation((pinData) =>
    createPin(pinData, data.id, selectedBoard._id)
  );

  // Hook for capturing errors
  const [createPinError, setCreatePinError] = useState('');

  const [selectedBoard, setSelectedBoard] = useState();

  const onSubmit = async (pinData) => {
    try {
      // Try to make a new user
      const res = await mutation.mutateAsync(pinData);

      // Send the user to the dashboard
      // TODO: Redirect to the url of the board where the pin was just added
      router.push(`/boards/${selectedBoard._id}`);
    } catch (err) {
      console.error(err);
      setCreatePinError(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow bg-white">
      {auth.isAuthenticated ? (
        <div className="flex items-center justify-center flex-grow w-full bg-gray-200 ">
          <div className="p-10 px-40 bg-white border-gray-400 rounded-2xl">
            <form
              className="flex flex-col items-center w-64 "
              onSubmit={handleSubmit(onSubmit)}>
              <input
                name="name"
                className="p-2 my-4 text-4xl font-bold tracking-wide border-b-2 border-gray-400 w-96 focus:outline-none"
                placeholder="Add your title"
                ref={register({ required: true })}
              />

              {errors.name && 'A name is required.'}
              <input
                name="description"
                className="p-2 my-4 tracking-wide border-b-2 border-gray-400 w-96 focus:outline-none"
                placeholder="Tell everyone what your Pin is about"
                ref={register({ required: false })}
              />

              <input
                name="imageURL"
                className="p-2 my-4 tracking-wide border-b-2 border-gray-400 w-96 focus:outline-none"
                placeholder="Link to an image"
                ref={register({ required: false })}
              />

              <input
                name="link"
                className="p-2 my-4 tracking-wide border-b-2 border-gray-400 w-96 focus:outline-none"
                placeholder="Add a destination link"
                ref={register({ required: true })}
              />

              {errors.link && 'An image URL is required.'}
              <div className="flex flex-row items-center justify-between w-96">
                <select
                  defaultValue="Select a board"
                  className="w-full h-12 px-5 py-3 mr-10 text-left bg-gray-200 rounded"
                  onChange={(e) => {
                    let selected = data.boards.filter(
                      (board) => board.name === e.target.value
                    );

                    setSelectedBoard(...selected);
                  }}>
                  <option disabled>Select a board</option>
                  {data &&
                    data.boards &&
                    data.boards.map((board) => (
                      <option key={board._id}>{board['name']}</option>
                    ))}
                </select>
                <input
                  type="submit"
                  value="Create"
                  className="px-6 py-4 my-3 font-bold tracking-wide text-white bg-red-600 rounded-full "
                />
              </div>
            </form>
            {createPinError && (
              <div className="pt-4 text-sm font-bold text-center text-red-700 ">
                {createPinError.error}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white">
          <Login></Login>
        </div>
      )}
    </div>
  );
}
