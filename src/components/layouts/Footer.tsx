'use client';

type Props = {
  children?: React.ReactNode;
};

export default function Footer({ children }: Props) {
  return (
    <>
      <div className="text-ebony dark:(bg-ebony-400 text-white) flex h-[90px] w-full items-center justify-center bg-white">
        {children}
      </div>
    </>
  );
}
