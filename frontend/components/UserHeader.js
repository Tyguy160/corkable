export default function UserHeader({ data, auth }) {
  let numPins = 0;
  if (data && data.boards && data.boards.length) {
    numPins = data.boards
      .map((board) => board.pins.length)
      .reduce((a, b) => a + b);
  }
  return (
    <div className="flex flex-col items-center justify-center pb-10 ">
      {data && data.name && (
        <div className="flex flex-row items-center justify-center w-32 h-32 m-4 text-5xl tracking-wider text-white bg-gray-400 rounded-full">
          {data.name.split(' ').length > 1
            ? data.name.split(' ')[0].charAt(0) +
              data.name.split(' ')[1].charAt(0)
            : data.name[0]}
        </div>
      )}
      <div className="pb-3 text-4xl font-medium tracking-wide">
        {data && data.name}
      </div>
      <div className="flex flex-row justify-between w-full px-12">
        <div className="px-2">
          {data && !data.error && data.boards.length}{' '}
          {data && !data.error && data.boards.length === 1 ? `board` : `boards`}
        </div>
        <div className="px-2">
          {data && numPins} pin{numPins !== 1 && 's'}
        </div>
      </div>
    </div>
  );
}
