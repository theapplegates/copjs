// The props for the base layout
type Props = {
  children?: React.ReactNode;
};

// The base layout
export default function BaseLayout({ children }: Props) {
  // Return the base layout
  return (
    <div className="dark:(bg-gray-900 text-white) h-full w-full bg-blue-50 selection:(bg-primary text-white)">
      {children}
    </div>
  );
}
