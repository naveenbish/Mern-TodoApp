import { CreateTodo } from "../../components/CreateTodo";
import { Todos } from "../../components/Todos";
import { ColorBar } from "../../components/ColorBar";
import { RecoilRoot } from "recoil";
import ExitSvg from "../../assets/exit.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { base_url } from "../../config";
function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  function Logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    console.log("token", token);
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
        console.log(res.data);
        if (res.data.auth === 0) {
          navigate("/");
        }
      });
  }, []);

  return (
    <RecoilRoot>
      <ColorBar />
      <div className="bg-[#37694A] w-[100vw]">
        {/* Upper Color Bar  */}
        <div className="flex flex-col  min-h-[95vh] justify-center">
          <div className="w-full flex justify-end px-4">
            <button
              onClick={() => {
                Logout();
              }}
            >
              <img src={ExitSvg} alt="Exit button" width={40} />
            </button>
          </div>
          <div className="border shadow-[0_0_10px_rgba(0,0,0,0.7)] p-5 rounded-[20px] m-2 min-h-[700px] bg-green-950">
            {/* <TodoHead /> */}
            <div className="text-4xl font-extrabold text-[#35373e] h-[50px]">
              ToDO List
            </div>
            <CreateTodo />

            <div className="font-bold text-gray-500 pt-10 border-green-400 border-b-2 w-fit">
              Todos Listing
            </div>

            <Todos />
          </div>
        </div>

        {/* Lower Color Bar  */}
      </div>
      <ColorBar />
    </RecoilRoot>
  );
}

export default Home;
