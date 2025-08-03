import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/top-2.png";
import delete_btn from "../../assets/delete.png";
import "./Note.css";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface FormData {
  fullName: string;
  email: string;
  dob: string;
  otp: string;
};

interface NoteInput {
  _id: string;
  title: string;
  description: string;
};

interface CreateNotes {
  message: string;
  newNotes: {
    _id: string;
    title: string;
    description: string;
  };
};

interface AccountProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const Note: React.FC<AccountProps> = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  // const [isNotes, setIsNotes] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState(false); // Both syntax will work fine as typscript knows its a boolean value.
  const [notes, setNotes] = useState<NoteInput>({
    _id: "",
    title: "",
    description: "",
  });
  const [addNote, setAddNote] = useState<NoteInput[]>([]);

  const handleNavigate = () => {
    navigate("/Note");
  };

  const handleSignout = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/auth/handle-sign-out`, {
        withCredentials: true,
      });
      toast.success((response.data as { message: string }).message);
      navigate("/");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get<{
        userData: { fullName: string; email: string };
      }>(`${baseUrl}/api/auth/me`, {
        withCredentials: true,
      });
      const { fullName, email } = res.data.userData;
      setFormData((prev) => ({
        ...prev,
        fullName,
        email,
      }));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await axios.get<{
        userNotes: { title: string; description: string }[];
      }>(`${baseUrl}/api/notes/fetch-notes`, { withCredentials: true });
      const fetchedNotes = res.data.userNotes;
      setAddNote(fetchedNotes);
    };

    fetchNotes();
  }, []);

  const handleNotes = async () => {
    try {
      const res = await axios.post<CreateNotes>(
        `${baseUrl}/api/notes/create-notes`,
        notes,
        { withCredentials: true }
      );
      const data = res.data.newNotes;
      setNotes(data);
      setAddNote((prev) => [data, ...prev]);
      setIsCreate(false);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDeleteNotes = async (notesId: string) => {
    try {
      const res = await axios.delete(
        `${baseUrl}/api/notes/delete-notes/${notesId}`,
        { withCredentials: true }
      );
      setAddNote(prev => prev.filter(note => note._id !== notesId));
      toast.success("Note deleted successfully.!");
    } catch (error) {
      toast.error("Failed to delete Notes.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNotes();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNotes({
      ...notes,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* Navbar.  */}
      <header>
        <nav className="flex justify-between py-2 md:px-10 px-2 ">
          <div onClick={handleNavigate} className="flex items-center gap-16 ">
            <img src={logo} className="cursor-pointer " alt="logo-image" />
            <span className="md:text-lg text-sm cursor-pointer font-semibold">
              Dashboard
            </span>
          </div>

          <span
            onClick={handleSignout}
            className="md:text-lg text-sm font-semibold text-blue-600 underline cursor-pointer "
          >
            Sign out
          </span>
        </nav>
      </header>

      {/* Rest of the body part.  */}
      <div className="md:w-[800px] md:mt-16 mt-10 mb-10 flex gap-6 mx-auto flex-col">
        {/* Welcome user.  */}
        <div className="flex flex-col gap-4 px-5">
          <div className="font-bold md:rounded-md rounded-lg md:py-16 py-5 md:w-[760px] px-2 flex justify-center shadows">
            <div>
              <h1 className="mb-2 md:text-4xl text-base">Welcome, {formData.fullName}!</h1>
              <div className="md:text-lg text-xs font-semibold">
                Email: {formData.email}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setIsCreate(true),
                  setNotes((prev) => ({
                    ...prev,
                    title: "",
                    description: "",
                  }));
              }}
              className="bg-blue-500 md:py-2 md:px-4 p-2 md:w-fit w-full text-white rounded-lg cursor-pointer "
              type="button"
            >
              Create Note
            </button>
          </div>
        </div>

        {isCreate && (
          <div className="py-3 px-3 w-full border-[1px] border-gray-400 shadows rounded-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col relative w-full">
                <label
                  className="text-gray-500 absolute text-xs px-1 bg-white top-[-22%] left-[1%] "
                  htmlFor="name"
                >
                  title
                </label>
                <input
                  type="text"
                  name="title"
                  title="title"
                  value={notes.title}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded border-gray-400"
                />
              </div>

              <div className="flex flex-col mb-0 relative ">
                <label
                  className="text-gray-500 absolute text-xs px-1 bg-white top-[-14%] left-[1%] "
                  htmlFor="name"
                >
                  Note
                </label>
                <textarea
                  name="description"
                  title="description"
                  value={notes.description}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded border-gray-400"
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-blue-500 md:py-1 p-2 md:px-3 md:w-fit w-full text-white rounded-lg cursor-pointer"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notes.  */}
        <div className="flex md:gap-3 gap-2 flex-col bg-white p-1 rounded-md px-4">
          <h3 className="text-xl ms-2 font-semibold">Notes</h3>

          {addNote === null ? (
            <p className="py-3 text-center border-[1px] border-gray-400 shadows rounded-md">
              Your notes will appear here.
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {addNote.map((noteList, index) => (
                <div
                  key={index}
                  className="flex justify-between gap-4 px-3 py-2 border-[1px] border-gray-400 shadows rounded-md"
                >
                  <span> {noteList.title} </span>
                  <button
                    onClick={() => handleDeleteNotes(noteList._id)}
                    type="button"
                  >
                    <img src={delete_btn} alt="delete-button" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;
