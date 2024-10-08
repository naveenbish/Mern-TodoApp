import { CreateTodo } from "../../components/CreateTodo";
import { Todos } from "../../components/Todos";
import { RecoilRoot } from "recoil";
import ExitSvg from "../../assets/exit.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../config";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState([]);
  const [newAvatarUrl, setNewAvatarUrl] = useState();
  const [activeAvatar, setActiveAvatar] = useState(0);

  function Logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const updateAvatar = () => {
    axios
      .put(
        `${base_url}/avatar/update`,
        {
          newAvatarUrl,
        }, // This is the request body. If you don't need to send any data in the body, it can be an empty object.
        {
          headers: {
            Authorization: `${token}`, // Include 'Bearer' if needed for your token type
          },
        },
      )
      .then((res) => {
        setAvatarUrl(res.data.avatar);
      });

    setIsOpen(!isOpen);
  }

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

  useEffect(() => {
    axios
      .get(`${base_url}/avatar/images`, {
        headers: {
          Authorization: `${token}`, // Include 'Bearer' if needed for your token type
        },
      },)
      .then((res) => {
        setAvatar(res.data.avatar);
        setNewAvatarUrl(res.data.avatar[0]);
      });
  }, []);

  return (
    <RecoilRoot>
      <div className="bg-[#212121] text-[#5c4a9c] w-[100vw] py-10 ">
        {/* Upper Color Bar  */}
        <div className="flex flex-col min-h-[95vh] justify-center">
          <div className="w-full flex justify-between px-6 cursor-pointer" >
            <div onClick={toggleModal}>
              <AvatarImg avatarUrl={avatarUrl} userEmail={userEmail} />
            </div>
            {/* Modal */}
            {isOpen && (
              <div className="fixed inset-0 bg-[#ffffff] bg-opacity-50 flex items-center justify-center ">
                <div className="bg-[#1a1a1a] mx-10  rounded-md flex flex-col items-center gap-6  p-8 max-w-md relative">
                  <h2 className="text-xl font-bold mb-4 text-center">Choose Your Avatar</h2>
                  <div className="flex flex-wrap justify-center items-center gap-4 my-2">
                    {avatar.map((item, index) => (
                      <div key={index}>
                        <>
                          <div className="flex gap-2">
                            <div className={(index == activeAvatar) ? "h-12 w-12 rounded-lg border-2 border-white shadow-md" : "h-12 w-12 rounded-lg"}>
                              <img src={item} alt="Avatar"
                                onClick={() => {
                                  setNewAvatarUrl(item)
                                  setActiveAvatar(index)
                                }
                                }
                              />
                            </div>
                          </div>
                        </>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-5">
                    <button
                      className="bg-[#5c4a9c] text-white font-bold py-2 px-4 rounded"
                      onClick={updateAvatar}
                    >
                      Save
                    </button>
                    <button
                      className="bg-[#5c4a9c] text-white font-bold py-2 px-4 rounded"
                      onClick={toggleModal}
                    >
                      Close
                    </button>
                  </div>
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

          <div className="flex flex-col items-center justify-center py-6 sm:mx-[20px] mx-[15px]">
            <div className="p-5 rounded-md w-full max-w-[1100px] min-h-[700px] bg-[#1a1a1a]">
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
        <div className="h-12 w-12 rounded-lg overflow-hidden flex justify-center items-center">
          {!avatarUrl?.length ? (
            <CircleLoader />
          ) : (
            <img src={avatarUrl} alt="Avatar" />
          )}
        </div>
        <div className="flex items-end font-bold text-lg">{userEmail}</div>
      </div>
    </>
  );
}

const CircleLoader = () => {
  return (
    <div role="status" className="overflow-hidden">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Home;
