import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  return (
    <div className=" flex justify-center items-center ">
      <SignUp redirectUrl="/" />
    </div>
  );
};

export default Register;
