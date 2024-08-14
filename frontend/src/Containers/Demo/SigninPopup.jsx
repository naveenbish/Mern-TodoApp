import { X } from "lucide-react";
import { useRef } from "react";

export default function SigninPopup({ onClose }) {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  return (
    <>
      <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div>
          {/* Signin Content  */}
          <div className="bg-white p-5 rounded-2xl flex flex-col">
            {/* close button  */}
            <button className="place-self-end" onClick={onClose}>
              <X size={30} />
            </button>
            <form action="" className="flex flex-col p-10 gap-10">
              <div className="text-xl text-center font-bold border-[#37694A] border-b-2">
                ToDO Sign In
              </div>
              <input
                id="username"
                placeholder="Username"
                className="border-blue-gray-200 text-black placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 border-b bg-transparent font-mono font-bold text-xl outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
              />
              <input
                id="username"
                placeholder="Email"
                className="border-blue-gray-200 text-black placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 border-b bg-transparent font-mono font-bold text-xl outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
              />
              <input
                id="password"
                placeholder="Password"
                className="border-blue-gray-200 text-black placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 border-b bg-transparent font-mono font-bold text-xl outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
              />
              <button
                className="border m-auto w-[100px] bg-[#37694A] text-xl font-semibold p-2 rounded-md"
                onClick={() => navigate("/home")}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
