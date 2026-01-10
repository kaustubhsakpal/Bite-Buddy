import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="min-h-[70vh] flex justify-center items-center mt-2.5"  >
      <SignIn redirectUrl="/" />
    </div>
  );
};

export default Login;
