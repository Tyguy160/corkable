import { useEffect } from 'react';
import Board from '../../components/Board';
import Login from '../login';
import useAuth from '../../hooks/useAuth';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import getPinsByBoardId from '../../api/getPinsByBoardId';
import getBoardById from '../../api/getBoardById';
import Pin from '../../components/Pin';
import Masonry from 'react-masonry-css';
import Menu from '../../components/Menu';

export default function BoardPage() {
  // Use the router
  const router = useRouter();

  const { boardId } = router.query;

  // Use the auth hook to get user info and verify logged in
  const { isLoading, data, isError, auth } = useAuth();

  const {
    isLoading: boardIsLoading,
    data: boardData,
    isError: boardIsError,
    isSuccess: boardIsSuccess,
  } = useQuery(['getBoardById', data ? data.id : null, boardId], () =>
    getBoardById(data ? data.id : null, boardId)
  );

  const {
    isLoading: pinIsLoading,
    data: pinData,
    isError: pinIsError,
    isSuccess: pinIsSuccess,
  } = useQuery(['getPinsByBoardId', data ? data.id : null, boardId], () =>
    getPinsByBoardId(data ? data.id : null, boardId)
  );

  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      {isLoading || pinIsLoading || boardIsLoading ? (
        'Loading...'
      ) : auth.isAuthenticated ? (
        <div className="flex flex-col flex-grow w-full ">
          {boardData && (
            <h2 className="py-10 text-xl font-bold tracking-wide text-center ">
              {boardData.board.name}
            </h2>
          )}
          <Menu></Menu>

          {pinIsLoading ? (
            <div className="">Loading boards...</div>
          ) : pinData && !pinData.error && pinData.pins.length ? (
            <Masonry
              breakpointCols={{
                default: 7,
                1700: 7 > pinData.pins.length ? pinData.pins.length : 7,
                1575: 6 > pinData.pins.length ? pinData.pins.length : 6,
                1450: 5 > pinData.pins.length ? pinData.pins.length : 5,
                1200: 4 > pinData.pins.length ? pinData.pins.length : 4,
                950: 3 > pinData.pins.length ? pinData.pins.length : 3,
                700: 2 > pinData.pins.length ? pinData.pins.length : 2,
                450: 1 >= pinData.pins.length ? pinData.pins.length : 1,
              }}
              columnClassName={'masonry-cols'}
              className="flex flex-row flex-wrap self-center ">
              {pinData.pins.map(
                ({ _id, name, link, imageURL, description }) => (
                  <Pin
                    key={_id}
                    pinId={_id}
                    name={name}
                    link={link}
                    imageURL={imageURL}
                    description={description}
                  />
                )
              )}
            </Masonry>
          ) : (
            <div className="text-center ">Add a board and get pinning!</div>
          )}
        </div>
      ) : (
        <Login></Login>
      )}
    </div>
  );
}
