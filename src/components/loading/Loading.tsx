import LoadingSpinner from './LoadingSpinner';

export default function Loading() {
  return (
    <>
      <div className="dark:(bg-gray-800 text-white) flex h-full w-full items-center justify-center text-black">
        <LoadingSpinner />
      </div>
    </>
  );
}
