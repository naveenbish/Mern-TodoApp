import { useNavigate } from "react-router-dom";
import SigninPopup from "./SigninPopup";
import { useState } from "react";

export default function SignupSide() {
  const navigate = useNavigate();
  const [showSignin, setShowSignin] = useState(false);
  return (
    <>
      <div className="mt-[120px] text-center">
        <div className="text-4xl py-2 font-extrabold m-auto w-[200px] border-[#37694A] border-b-2 mb-10">
          ToDO List
        </div>
        <form action="" className="flex flex-col p-10 gap-10">
          <div className="text-2xl font-bold border-[#37694A] border-b-2">Sign Up</div>
          <input
            id="username"
            placeholder="Email or Username"
            className="border-blue-gray-200 text-black placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 border-b bg-transparent font-mono font-bold text-xl outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
          />
          <input
            id="password"
            placeholder="Password"
            className="border-blue-gray-200 text-black placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 border-b bg-transparent font-mono font-bold text-xl outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
          />
          <button className="border m-auto w-[100px] bg-[#37694A] text-xl font-semibold p-2 rounded-md" onClick={()=>navigate("/home")}>Sign up</button>
        </form>
        <div>Already have an Account? <button className="bg-[#37694A] p-2 rounded-md font-bold" onClick={()=>setShowSignin(true)}>Sign in</button></div>
      </div>
      {showSignin && <SigninPopup onClose={()=>setShowSignin(false)} />}
    </>
  );
}
