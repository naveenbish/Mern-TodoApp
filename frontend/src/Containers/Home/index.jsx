import { CreateTodo } from "../../components/CreateTodo";
import { Todos } from "../../components/Todos";
import { RecoilRoot } from "recoil";
import ExitSvg from "../../assets/exit.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../config";

import defaultAvatarImg from "../../../public/img/avatar/Avatar18.jpg";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  function Logout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios
      .post(
        `${base_url}/user/auth`,
        {}, // This is the request body. If you don't need to send any data in the body, it can be an empty object.
        {
          headers: {
            Authorization: `${token}`, // Include 'Bearer' if needed for your token type
          },
        },
      )
      .then((res) => {
        setAvatarUrl(res.data.avatarImg);
        setUserEmail(res.data.email);
        if (res.data.auth === 0) {
          navigate("/");
        }
      });
  }, []);

  return (
    <RecoilRoot>
      <div className="bg-[#212121] text-[#5c4a9c] w-[100vw] py-10">
        {/* Upper Color Bar  */}
        <div className="flex flex-col min-h-[95vh] justify-center">
          <div className="w-full flex justify-between px-6 cursor-pointer" onClick={toggleModal}>
            <AvatarImg avatarUrl={avatarUrl} userEmail={userEmail} />
            {/* Modal */}
            {isOpen && (
              <div className="fixed inset-0 bg-[#ffffff] bg-opacity-50 flex items-center justify-center ">
                <div className="bg-[#1a1a1a] mx-10  rounded-md flex flex-col items-center gap-6  p-8 max-w-md mx-auto relative">
                  <h2 className="text-xl font-bold mb-4 text-center">Choose Your Avatar</h2>
                  <div className="flex flex-wrap justify-center items-center gap-4 my-2">
                    <AvatarAllImg avatarUrl={avatarUrl} />
                    <AvatarAllImg avatarUrl={avatarUrl} />
                    <AvatarAllImg avatarUrl={avatarUrl} />
                    <AvatarAllImg avatarUrl={avatarUrl} />
                    <AvatarAllImg avatarUrl={avatarUrl} />
                    <AvatarAllImg avatarUrl={avatarUrl} />
                    <AvatarAllImg avatarUrl={avatarUrl} />
                    <AvatarAllImg avatarUrl={avatarUrl} />
                    <AvatarAllImg avatarUrl={avatarUrl} />
                    <AvatarAllImg avatarUrl={avatarUrl} />
                    <AvatarAllImg avatarUrl={avatarUrl} />
                    <AvatarAllImg avatarUrl={avatarUrl} />
                    <AvatarAllImg avatarUrl={avatarUrl} />
                    <AvatarAllImg avatarUrl={avatarUrl} />
                  </div>
                  <button
                    className="bg-[#5c4a9c] text-white font-bold py-2 px-4 rounded"
                    onClick={toggleModal}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
            <div>
              <button
                onClick={() => {
                  Logout();
                }}
              >
                <img src={ExitSvg} alt="Exit button" width={40} />
              </button>
            </div>
          </div>
          <div className="p-5 rounded-md m-4 min-h-[700px] bg-[#1a1a1a]">
            {/* <TodoHead /> */}
            <div className="text-4xl font-extrabold text-[#5c4a9c] border-[#5c4a9c] border-b-2 mb-2 w-fit h-[50px]">
              ToDO List
            </div>
            <CreateTodo />

            <div className="font-bold text-[#ffffff] pt-10 border-[#5c4a9c] border-b-2 w-fit">
              Todos Listing
            </div>

            <Todos />
          </div>
        </div>

        {/* Lower Color Bar  */}
      </div>
    </RecoilRoot>
  );
}

function AvatarImg({ avatarUrl, userEmail }) {
  return (
    <>
      <div className="flex gap-2">
        <div className="h-12 w-12 rounded-lg">
          {!avatarUrl?.length ? (
            <img src={defaultAvatarImg} alt="Avatar" />
          ) : (
            <img src={avatarUrl} alt="Avatar" />
          )}
        </div>
        <div className="flex items-end font-bold text-lg">{userEmail}</div>
      </div>
    </>
  );
}

function AvatarAllImg({ avatarUrl }) {
  return (
    <>
      <div className="flex gap-2">
        <div className="h-12 w-12 rounded-lg">
          {!avatarUrl?.length ? (
            <img src={defaultAvatarImg} alt="Avatar" />
          ) : (
            <img src={avatarUrl} alt="Avatar" />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
