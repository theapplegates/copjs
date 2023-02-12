import classNames from "classnames";

// The props for the component
type Props = {
  children: React.ReactNode;
  className?: string;
};

// The title component
export default function Title({ children, className }: Props) {
  // Return the title
  return (
    <div className={classNames("text-5xl font-bold", className)}>
      {children}
    </div>
  );
}
