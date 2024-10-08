import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { base_url } from "../../config";
import "react-toastify/dist/ReactToastify.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState(false);
  const navigate = useNavigate();

  const signinHandler = () => {
    setValidate(true);
    try {
      axios
        .post(`${base_url}/user/signin/`, {
          email,
          password,
        })
        .then((res) => {
          if (res.data.statusCode == 1) {
            localStorage.setItem("token", res.data.token);
            navigate("/home");
          }
          else {
            toast.error("Invalid Creds", {
              theme: "dark",
            });
          }

        });
    } catch (err) {
      console.log("just an error.");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-[#212121] text-[#5c4a9c]">
      <div className="my-[20px] text-center ">
        <div className="text-4xl py-2 font-extrabold m-auto w-[200px] mb-10">
          TODO List
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col px-10 py-5 m-4 rounded-md min-w-[300px] max-w-[600px] w-full gap-10 bg-[#1a1a1a]">
            <div className="text-2xl font-bold border-[#5c4a9c] border-b-2">
              Sign In
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
            <div>
              <button
                className="m-auto w-[100px] bg-[#000000] text-xl font-semibold p-2 rounded-md"
                onClick={signinHandler}
              >
                Sign In
              </button>
              <div>
                Don&apos;t have an Account?{" "}
                <span
                  className="border-[#5c4a9c] border-b-2 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Sign up
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
      <ToastContainer />
    </div>
  );
}

const InputFeilds = (props) => {
  return (
    <>
      <input
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className="border-blue-gray-200 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 border-b bg-transparent font-mono font-bold text-xl outline outline-0 transition-all  focus:outline-0 disabled:border-0"
      />
    </>
  );
};

const Validation = (props) => {
  if (!props.email && props.validate) {
    return (
      <div className="text-red-500">
        We are not happy with your email because it&aposs blank
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
