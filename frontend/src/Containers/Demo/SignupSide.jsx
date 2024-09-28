import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { base_url } from "../../config";

export default function SignupSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState(false);
  const navigate = useNavigate();

  const signupHandler = () => {
    setValidate(true);
    axios
      .post(`${base_url}/user/signup`, {
        email,
        password,
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("token", res.data.token);
          navigate("/home");
        }
      });
  };

  return (
    <>
      <div className="my-[20px] text-center">
        <div className="text-4xl py-2 font-extrabold m-auto w-[200px] bg-[#1a1a1a] mb-10">
          TODO List
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col px-10 gap-10 border-[#5c4a9c] bg-[#212121] min-w-[300px] max-w-[600px] w-full border-2 rounded-md mx-10 py-4">
            <div className="text-2xl font-bold border-[#5c4a9c] border-b-2">
              Sign Up
            </div>
            <InputFeilds
              id={"email"}
              placeholder={"Email"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <InputFeilds
              id={"password"}
              placeholder={"Password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Validation email={email} password={password} validate={validate} />
            <button
              className="m-auto w-[100px] bg-[#1A1A1A] text-xl font-semibold p-2 rounded-md "
              onClick={signupHandler}
            >
              Sign up
            </button>
          </div>
        </div>
        <div>
          Already have an Account?{" "}
          <span
            className="border-[#5c4a9c] border-b-2 cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </div>
      </div>
    </>
  );
}

const InputFeilds = (props) => {
  return (
    <>
      <input
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className="border-blue-gray-200 border-b bg-transparent font-mono font-semibold text-xl outline outline-0 transition-all disabled:border-0"
      />
    </>
  );
};

const Validation = (props) => {
  if (!props.email && props.validate) {
    return (
      <div className="text-red-500">
        We are not happy with your Email because it&apos;s blank
      </div>
    );
  }
  if (props.password.length < 6 && props.validate) {
    return (
      <div className="text-red-500">
        Please choose a password greater then 6 digits
      </div>
    );
  }
};
