import Board from '../components/Board';
import useAuth from '../hooks/useAuth';
import Login from './login';
import Menu from '../components/Menu';
import UserHeader from '../components/UserHeader';

export default function Dashboard() {
  // Use the auth hook to get user info and verify logged in
  const { isLoading, data, isError, auth } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      {isLoading ? (
        'Loading'
      ) : auth.isAuthenticated ? (
        <>
          <UserHeader data={data} auth={auth} />
          {/* Menu */}
          <Menu></Menu>
          {/* Board container */}
          <div
            className={`flex flex-row flex-wrap items-center ${
              data && !data.error && data.boards.length
                ? 'justify-start'
                : 'justify-center'
            } flex-grow w-full px-20`}>
            {isLoading ? (
              <div>Loading boards...</div>
            ) : data && !data.error && data.boards.length ? (
              data.boards.map((board) => (
                <Board
                  name={board.name}
                  key={board._id}
                  boardId={board._id}
                  userId={data.id}
                  pins={board.pins.length}></Board>
              ))
            ) : (
              <div>Add a board and get pinning!</div>
            )}
          </div>
        </>
      ) : (
        <Login></Login>
      )}
    </div>
  );
}
