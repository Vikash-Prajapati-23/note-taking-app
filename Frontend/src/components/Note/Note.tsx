import { useNavigate } from "react-router-dom";
import logo from "../../assets/top-2.png";
import delete_btn from "../../assets/delete.png";
import "./Note.css";

const Note = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/Note");
  };

  const handleSignout = () => {
    navigate("/");
  };

  return (
    <div>
      {/* Navbar.  */}
      <header>
        <nav className="flex justify-between py-2 md:px-10 ">
          <div onClick={handleNavigate} className="flex items-center gap-16 ">
            <img src={logo} className="cursor-pointer " alt="logo-image" />
            <span className="md:text-lg text-xs cursor-pointer font-semibold">
              Dashboard
            </span>
          </div>

          <span
            onClick={handleSignout}
            className="md:text-lg text-xs font-semibold text-blue-600 underline cursor-pointer "
          >
            Sign out
          </span>
        </nav>
      </header>

      {/* Rest of the body part.  */}
      <div className="md:w-[800px] mt-20 mb-10 flex gap-10 mx-auto flex-col">
        {/* Welcome user.  */}
        <div className="flex flex-col gap-5 ">
          <div className="md:text-5xl text-2xl font-bold md:rounded-md rounded-xl md:py-16 py-5 md:w-[800px] px-2 flex justify-center shadows">
          <div >
            <h1 className="mb-2">Welcome {`User`}</h1>
            <div className="md:text-lg font-semibold">
              Email: {`User Email`}
            </div>
          </div>
        </div>

        <div className=" flex justify-end">
          <button className="bg-blue-500 md:py-2 md:px-4 p-2 md:w-fit w-full text-white rounded-lg cursor-pointer " type="button">Create Note</button>
        </div>
        </div>

        {/* Notes.  */}
        <div className="flex md:gap-3 gap-2 flex-col">
          <h3 className="text-xl font-semibold">Notes</h3>
          <div className="flex justify-between bg-white py-2 px-3 rounded-md border-[1px] border-gray-400 shadows ">
            <span>Note 1</span>
            <img src={delete_btn} alt="delete-button" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
