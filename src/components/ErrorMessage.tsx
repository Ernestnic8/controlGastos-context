import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <p
      className="bg-red-600 p-2 text-white font-bold text-sm text-center"
      role="alert"
    >
      {children}
    </p>
  );
};

export default ErrorMessage;
