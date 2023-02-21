import LoadingSpinner from './LoadingSpinner';

export default function Loader() {
  return (
    <>
      <div className="dark:(bg-gray-800 text-white) absolute left-0 top-0 z-50 h-full w-full">
        <div className="flex h-full w-full items-center justify-center text-black">
          <LoadingSpinner />
        </div>
      </div>
    </>
  );
}
