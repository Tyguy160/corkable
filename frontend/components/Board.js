import Link from 'next/link';
import getPinsByBoardId from '../api/getPinsByBoardId';
import { useQuery } from 'react-query';

export default function Board({ name, pins, userId, boardId }) {
  const {
    isLoading: pinIsLoading,
    data: pinData,
    isError: pinIsError,
    isSuccess: pinIsSuccess,
  } = useQuery(['getPinsByBoardId', userId, boardId], () =>
    getPinsByBoardId(userId, boardId)
  );

  return (
    <>
      <Link href={'/boards/[boardId].js'} as={`/boards/${boardId}`}>
        <div className="p-3 cursor-pointer">
          <img
            className="flex flex-row items-center justify-center object-cover h-40 bg-gray-300 rounded-lg w-60"
            src={
              pinData &&
              pinData.pins &&
              pinData.pins[0] &&
              pinData.pins[0].imageURL &&
              pinData.pins[0].imageURL
            }></img>
          <div className="pl-2">
            <div className="pt-2 text-xl font-bold tracking-wide">{name}</div>
            <div className="py-1 text-sm font-light"></div>
            {pins} Pin{pins !== 1 && 's'}
          </div>
        </div>
      </Link>
    </>
  );
}
