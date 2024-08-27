import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ColorBar } from "../../components/ColorBar";
import { ToastContainer, toast } from "react-toastify";
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
        .post("http://localhost:3000/api/v1/user/signin/", {
          email,
          password,
        })
        .then((res) => {
          if (res.data.statusCode == 1) {
            localStorage.setItem("token", res.data.token);
            navigate("/home");
          } else if (res.data.statusCode == 0)
            toast.error("Invalid Creds", {
              theme: "dark",
            });
        });
    } catch (err) {
      console.log("just an error.");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <ColorBar />
      <div className="my-[20px] text-center ">
        <div className="text-4xl py-2 font-extrabold m-auto w-[200px] border-[#37694A] border-2 mb-10">
          TODO List
        </div>
        <div className="flex flex-col px-10 gap-10">
          <div className="text-2xl font-bold border-[#37694A] border-b-2">
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
          <button
            className="border m-auto w-[100px] bg-[#37694A] text-xl font-semibold p-2 rounded-md"
            onClick={signinHandler}
          >
            Sign In
          </button>
        </div>
        <div>
          Don&apos;t have an Account?{" "}
          <span
            className="border-[#37694A] border-b-2 hover:text-green-500"
            onClick={() => navigate("/")}
          >
            Sign up
          </span>
        </div>
      </div>
      <ToastContainer />
      <ColorBar />
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
        className="border-blue-gray-200 text-black placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 border-b bg-transparent font-mono font-bold text-xl outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
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
