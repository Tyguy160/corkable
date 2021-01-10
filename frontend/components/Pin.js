import Link from 'next/link';
export default function Pin({ pinId, name, link, imageURL, description }) {
  return (
    <div className="w-48 m-3 my-6 bg-gray-100 cursor-pointer rounded-2xl">
      <a href={link} target="_blank">
        <img className=" rounded-2xl" src={imageURL}></img>
        <div className="divide-y-2 divide-gray-300 ">
          <h3 className="px-2 py-2 text-base font-medium tracking-wide text-center">
            {name}
          </h3>
          <h4 className="px-5 py-4 font-light tracking-wide text-center">
            {description}
          </h4>
        </div>
      </a>
    </div>
  );
}
