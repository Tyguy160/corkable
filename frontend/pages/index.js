import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center flex-grow">
      <div className="flex flex-col items-center">
        <h1 className="pb-6 text-6xl font-medium">Welcome to Corkable!</h1>
        <h2 className="pb-10 text-2xl font-medium tracking-wide">
          The best alternative to that <i>other</i> pinboard application 🧐
        </h2>
        <div className="flex flex-row pt-2">
          <Link href="/about">
            <div className="px-4 py-4 my-3 mr-6 font-bold bg-gray-200 rounded-full cursor-pointer">
              Learn more
            </div>
          </Link>
          <Link href="/signup">
            <div className="px-4 py-4 my-3 font-bold tracking-wide text-white bg-red-600 rounded-full cursor-pointer">
              Sign up
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
