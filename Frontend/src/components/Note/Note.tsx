// import { useNavigate, useParams } from "react-router-dom";
// import logo from "../../assets/top-2.png";
// import delete_btn from "../../assets/delete.png";
// import "./Note.css";
// import axios from "axios";
// import { toast } from "sonner";
// import { useEffect, useState } from "react";

// const baseUrl = import.meta.env.VITE_BASE_URL;

// interface FormData {
//   fullName: string;
//   email: string;
//   dob: string;
//   otp: string;
// }

// interface NoteInput {
//   _id: string;
//   title: string;
//   description: string;
// }

// interface EditNoteResponse {
//   message: string;
//   updatedNotes: {
//     title: string;
//     description: string;
//   };
// }

// interface CreateNotes {
//   message: string;
//   newNotes: {
//     _id: string;
//     title: string;
//     description: string;
//   };
// }

// interface AccountProps {
//   formData: FormData;
//   setFormData: React.Dispatch<React.SetStateAction<FormData>>;
// }

// const Note: React.FC<AccountProps> = ({ formData, setFormData }) => {
//   const navigate = useNavigate();
//   // const [isNotes, setIsNotes] = useState<boolean>(false);
//   const [isCreate, setIsCreate] = useState(false); // Both syntax will work fine as typscript knows its a boolean value.
//   const [notes, setNotes] = useState<NoteInput>({
//     _id: "",
//     title: "",
//     description: "",
//   });
//   const [addNote, setAddNote] = useState<NoteInput[]>([]);
//   const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
//   const [isEdit, setIsEdit] = useState(true);
//   const [editableNoteId, seteditableNoteId] = useState<string | null>(null);
//   // const [editableNoteId, seteditableNoteId] = useState<NoteInput>({
//   //   _id: "",
//   //   title: "",
//   //   description: "",
//   // });

//   const handleNavigate = () => {
//     navigate("/Note");
//   };

//   const handleSignout = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/api/auth/handle-sign-out`, {
//         withCredentials: true,
//       });
//       toast.success((response.data as { message: string }).message);
//       navigate("/");
//     } catch (error) {
//       toast.error("Logout failed.");
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get<{
//         userData: { fullName: string; email: string };
//       }>(`${baseUrl}/api/auth/me`, {
//         withCredentials: true,
//       });
//       const { fullName, email } = res.data.userData;
//       setFormData((prev) => ({
//         ...prev,
//         fullName,
//         email,
//       }));
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchNotes = async () => {
//       const res = await axios.get<{
//         userNotes: { title: string; description: string }[];
//       }>(`${baseUrl}/api/notes/fetch-notes`, { withCredentials: true });
//       const fetchedNotes = res.data.userNotes;
//       setAddNote(fetchedNotes);
//     };

//     fetchNotes();
//   }, []);

//   const handleDeleteNotes = async (notesId: string) => {
//     try {
//       const res = await axios.delete(
//         `${baseUrl}/api/notes/delete-notes/${notesId}`,
//         { withCredentials: true }
//       );
//       setAddNote((prev) => prev.filter((note) => note._id !== notesId));
//       // toast.success("Note deleted successfully.!");
//       toast.success((res.data as { message: string }).message);
//     } catch (error) {
//       toast.error("Failed to delete Notes.");
//     }
//   };

//   const handleCreateNotes = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (notes._id) {
//       try {
//         const res = await axios.patch<EditNoteResponse>(
//           `${baseUrl}/api/notes/edit-notes/${notes._id}`,
//           {
//             _id: notes._id,
//             title: notes.title,
//             description: notes.description,
//           },
//           { withCredentials: true }
//         );
//         const data = res.data.updatedNotes;
//         console.log(data);
//         // seteditableNoteId(data);
//         setNotes(data);
//         toast.success((res.data as { message: string }).message);
//       } catch (error) {
//         console.error("Something went wrong, please try again later.", error);
//         toast.error("Something went wrong, Please try again later.");
//       }
//     }

//     try {
//       const res = await axios.post<CreateNotes>(
//         `${baseUrl}/api/notes/create-notes`,
//         notes,
//         { withCredentials: true }
//       );
//       const data = res.data.newNotes;
//       setNotes(data);
//       toast.success((res.data as { message: string }).message);
//       setAddNote((prev) => [data, ...prev]);
//       setIsCreate(false);
//     } catch (error) {
//       console.error("Error saving note:", error);
//     }
//   };

//   // const handleEdit = async (notesId: string) => {
//   //   // e.preventDefault();
//   //   try {
//   //     const res = await axios.patch<EditNoteResponse>(
//   //       `${baseUrl}/api/notes/edit-notes/${notesId}`,
//   //       { title: notes.title, description: notes.description },
//   //       { withCredentials: true }
//   //     );
//   //     const data = res.data.updatedNotes;
//   //     console.log(data);
//   //     seteditableNoteId(data);
//   //     setNotes(data);
//   //     toast.success((res.data as { message: string }).message);
//   //   } catch (error) {
//   //     console.error("Something went wrong, please try again later.", error);
//   //     toast.error("Something went wrong, Please try again later.");
//   //   }
//   // };

//   const toggleShowNotes = (noteId: string) => {
//     setExpandedNoteId((prevId) => (prevId === noteId ? null : noteId));
//   };

//   const handleToggleEdit = () => {
//     setIsEdit((edit) => (edit = !edit));
//   };

//   const handleChange = (e: React.ChangeEvent<any>) => {
//     setNotes((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   return (
//     <div>
//       {/* Navbar.  */}
//       <header>
//         <nav className="flex justify-between py-2 md:px-10 px-2 ">
//           <div onClick={handleNavigate} className="flex items-center gap-16 ">
//             <img src={logo} className="cursor-pointer " alt="logo-image" />
//             <span className="md:text-lg text-sm cursor-pointer font-semibold">
//               Dashboard
//             </span>
//           </div>

//           <span
//             onClick={handleSignout}
//             className="md:text-lg text-sm font-semibold text-blue-600 underline cursor-pointer "
//           >
//             Sign out
//           </span>
//         </nav>
//       </header>

//       {/* Rest of the body part.  */}
//       <div className="md:w-[800px] md:mt-16 mt-12 mb-16 flex gap-6 mx-auto flex-col">
//         {/* Welcome user.  */}
//         <div className="flex flex-col gap-4 lg:px-0 md:px-10 px-3 w-full">
//           <div className="font-bold md:rounded-md rounded-lg md:py-16 py-5 lg:w-[800px] px-2 flex justify-center shadows">
//             <div>
//               <h1 className="mb-2 md:text-4xl text-base">
//                 Welcome, {formData.fullName}!
//               </h1>
//               <div className="md:text-lg text-xs text-gray-600 font-semibold">
//                 Email: {formData.email}
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <button
//               onClick={() => {
//                 setIsCreate(true),
//                   setNotes((prev) => ({
//                     ...prev,
//                     title: "",
//                     description: "",
//                   }));
//               }}
//               className="bg-blue-500 md:py-2 md:px-4 p-2 md:w-fit w-full text-white rounded-lg cursor-pointer "
//               type="button"
//             >
//               Create Note
//             </button>
//           </div>
//         </div>

//         {/* // Form for creating notes. */}
//         {isCreate && (
//           <div className="py-4 lg:mx-0 md:mx-10 mx-4 border-[1px] border-gray-400 shadows rounded-md">
//             <form
//               onSubmit={handleCreateNotes}
//               className="flex flex-col gap-4 px-3"
//             >
//               <div className="flex flex-col relative">
//                 <label
//                   className="text-gray-500 absolute text-xs px-1 bg-white top-[-22%] md:left-[1%] left-[2%] "
//                   htmlFor="name"
//                 >
//                   title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   title="title"
//                   value={notes.title}
//                   onChange={handleChange}
//                   required
//                   className="border p-2 rounded border-gray-400"
//                 />
//               </div>

//               <div className="flex flex-col mb-0 relative ">
//                 <label
//                   className="text-gray-500 absolute text-xs px-1 bg-white top-[-14%] md:left-[1%] left-[2%] "
//                   htmlFor="name"
//                 >
//                   Note
//                 </label>
//                 <textarea
//                   name="description"
//                   title="description"
//                   value={notes.description}
//                   onChange={handleChange}
//                   required
//                   className="border p-2 rounded border-gray-400"
//                 />
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   className="bg-blue-500 md:py-1 p-2 md:px-3 md:w-fit w-full text-white rounded-lg cursor-pointer"
//                   type="submit"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Notes section.  */}
//         <div className="flex md:gap-3 gap-2 lg:mx-0 md:mx-10 mx-3 flex-col bg-white rounded-md ">
//           <h3 className="text-xl ms-2 font-semibold">Notes</h3>

//           {addNote.length === 0 ? (
//             <p className="py-3 text-center md:text-base text-sm border-[1px] border-gray-400 shadows rounded-md">
//               Your notes will appear here. Create one by clicking "Create note".
//             </p>
//           ) : (
//             <div className="flex flex-col gap-5">
//               {addNote.map((noteList, index) => (
//                 <div
//                   key={index}
//                   className={`flex flex-col gap-4 border-[1px] border-gray-400 ${
//                     expandedNoteId === noteList._id ? "shadows" : "shadow-md"
//                   } rounded-md`}
//                 >
//                   {/* // Show Note Lists. */}
//                   <div
//                     onClick={() => toggleShowNotes(noteList._id)}
//                     className={`flex justify-between cursor-pointer ${
//                       expandedNoteId === noteList._id ? "shadows" : "shadow"
//                     } py-2 px-2`}
//                   >
//                     <span className="font-semibold md:text-base text-sm">
//                       {noteList.title}
//                     </span>
//                     <button
//                       className="cursor-pointer"
//                       onClick={(e: React.ChangeEvent<any>) => {
//                         e.stopPropagation(), handleDeleteNotes(noteList._id);
//                       }}
//                       type="button"
//                     >
//                       <img src={delete_btn} alt="delete-button" />
//                     </button>
//                   </div>

//                   {/* // Show & Edit Notes. */}
//                   <div
//                     className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                       expandedNoteId === noteList._id
//                         ? "max-h-[1000px] opacity-100 scale-100 px-3 pb-2"
//                         : "max-h-0 opacity-0 scale-95 "
//                     }`}
//                   >
//                     {isEdit ? (
//                       <div className=" flex justify-between">
//                         {/* // Show Notes. */}
//                         <div>
//                           {/* <p className="font-semibold"> {noteList.title} </p> */}
//                           <p> {noteList.description} </p>
//                         </div>

//                         <button
//                           type="button"
//                           onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
//                             e.stopPropagation();
//                             handleToggleEdit();
//                           }}
//                           className="flex items-start cursor-pointer"
//                         >
//                           <span className="material-symbols-outlined">
//                             edit
//                           </span>
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="bg-gray-50 rounded-md p-1 pb-2">
//                         {/* Edit Notes. */}
//                         {!editableNoteId && (
//                           <form
//                             onSubmit={handleCreateNotes}
//                             className="flex flex-col gap-4 md:px-3"
//                           >
//                             <p>Edit Note.</p>

//                             <div className="flex flex-col relative">
//                               <label className="text-gray-500 absolute text-xs px-1 bg-white top-[-22%] md:left-[1%] left-[2%]">
//                                 Title
//                               </label>
//                               <input
//                                 type="text"
//                                 title="title"
//                                 value={noteList.title}
//                                 onChange={(e) =>
//                                   setNotes((prev) => ({
//                                     ...prev,
//                                     [e.target.name]: e.target.value,
//                                   }))
//                                 }
//                                 required
//                                 className="border p-2 rounded border-gray-400"
//                               />
//                             </div>

//                             <div className="flex flex-col relative">
//                               <label className="text-gray-500 absolute text-xs px-1 bg-white top-[-14%] md:left-[1%] left-[2%]">
//                                 Note
//                               </label>
//                               <textarea
//                                 title="description"
//                                 value={noteList.description}
//                                 onChange={(e) => handleChange(e)}
//                                 required
//                                 className="border p-2 rounded border-gray-400"
//                               />
//                             </div>

//                             <div className="flex justify-end">
//                               <button
//                                 type="submit"
//                                 className="bg-blue-500 md:py-1 p-2 md:px-3 md:w-fit w-full text-white rounded-lg"
//                               >
//                                 Save
//                               </button>
//                             </div>
//                           </form>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Note;




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
}

interface NoteInput {
  _id: string;
  title: string;
  description: string;
}

interface EditNoteResponse {
  message: string;
  updatedNotes: {
    title: string;
    description: string;
  };
}

interface CreateNotes {
  message: string;
  newNotes: {
    _id: string;
    title: string;
    description: string;
  };
}

interface AccountProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Note: React.FC<AccountProps> = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [isCreate, setIsCreate] = useState(false);
  const [notes, setNotes] = useState<NoteInput>({
    _id: "",
    title: "",
    description: "",
  });
  const [addNote, setAddNote] = useState<NoteInput[]>([]);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [editableNoteId, setEditableNoteId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState<NoteInput>({
    _id: "",
    title: "",
    description: "",
  });

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

  const handleDeleteNotes = async (notesId: string) => {
    try {
      const res = await axios.delete(
        `${baseUrl}/api/notes/delete-notes/${notesId}`,
        { withCredentials: true }
      );
      setAddNote((prev) => prev.filter((note) => note._id !== notesId));
      toast.success((res.data as { message: string }).message);
    } catch (error) {
      toast.error("Failed to delete Notes.");
    }
  };

  const handleCreateNotes = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post<CreateNotes>(
        `${baseUrl}/api/notes/create-notes`,
        notes,
        { withCredentials: true }
      );
      const data = res.data.newNotes;
      setNotes({ _id: "", title: "", description: "" });
      toast.success((res.data as { message: string }).message);
      setAddNote((prev) => [data, ...prev]);
      setIsCreate(false);
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to create note. Please try again.");
    }
  };

  const handleEditNotes = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.patch<EditNoteResponse>(
        `${baseUrl}/api/notes/edit-notes/${editNotes._id}`,
        {
          title: editNotes.title,
          description: editNotes.description,
        },
        { withCredentials: true }
      );
      
      // Update the note in the local state
      setAddNote((prev) =>
        prev.map((note) =>
          note._id === editNotes._id
            ? { ...note, title: editNotes.title, description: editNotes.description }
            : note
        )
      );
      
      toast.success((res.data as { message: string }).message);
      setEditableNoteId(null);
      setEditNotes({ _id: "", title: "", description: "" });
    } catch (error) {
      console.error("Something went wrong, please try again later.", error);
      toast.error("Something went wrong, Please try again later.");
    }
  };

  const toggleShowNotes = (noteId: string) => {
    setExpandedNoteId((prevId) => (prevId === noteId ? null : noteId));
  };

  const handleToggleEdit = (note: NoteInput) => {
    if (editableNoteId === note._id) {
      // Cancel edit mode
      setEditableNoteId(null);
      setEditNotes({ _id: "", title: "", description: "" });
    } else {
      // Enter edit mode
      setEditableNoteId(note._id);
      setEditNotes({
        _id: note._id,
        title: note.title,
        description: note.description,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNotes((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditNotes((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      <div className="md:w-[800px] md:mt-16 mt-12 mb-16 flex gap-6 mx-auto flex-col">
        {/* Welcome user.  */}
        <div className="flex flex-col gap-4 lg:px-0 md:px-10 px-3 w-full">
          <div className="font-bold md:rounded-md rounded-lg md:py-16 py-5 lg:w-[800px] px-2 flex justify-center shadows">
            <div>
              <h1 className="mb-2 md:text-4xl text-base">
                Welcome, {formData.fullName}!
              </h1>
              <div className="md:text-lg text-xs text-gray-600 font-semibold">
                Email: {formData.email}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setIsCreate(true);
                setNotes({
                  _id: "",
                  title: "",
                  description: "",
                });
              }}
              className="bg-blue-500 md:py-2 md:px-4 p-2 md:w-fit w-full text-white rounded-lg cursor-pointer "
              type="button"
            >
              Create Note
            </button>
          </div>
        </div>

        {/* // Form for creating notes. */}
        {isCreate && (
          <div className="py-4 lg:mx-0 md:mx-10 mx-4 border-[1px] border-gray-400 shadows rounded-md">
            <form
              onSubmit={handleCreateNotes}
              className="flex flex-col gap-4 px-3"
            >
              <div className="flex flex-col relative">
                <label
                  className="text-gray-500 absolute text-xs px-1 bg-white top-[-22%] md:left-[1%] left-[2%] "
                  htmlFor="title"
                >
                  title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={notes.title}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded border-gray-400"
                />
              </div>

              <div className="flex flex-col mb-0 relative ">
                <label
                  className="text-gray-500 absolute text-xs px-1 bg-white top-[-14%] md:left-[1%] left-[2%] "
                  htmlFor="description"
                >
                  Note
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={notes.description}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded border-gray-400"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreate(false)}
                  className="bg-gray-500 md:py-1 p-2 md:px-3 md:w-fit w-full text-white rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
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

        {/* Notes section.  */}
        <div className="flex md:gap-3 gap-2 lg:mx-0 md:mx-10 mx-3 flex-col bg-white rounded-md ">
          <h3 className="text-xl ms-2 font-semibold">Notes</h3>

          {addNote.length === 0 ? (
            <p className="py-3 text-center md:text-base text-sm border-[1px] border-gray-400 shadows rounded-md">
              Your notes will appear here. Create one by clicking "Create note".
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {addNote.map((noteList, index) => (
                <div
                  key={noteList._id}
                  className={`flex flex-col gap-4 border-[1px] border-gray-400 ${
                    expandedNoteId === noteList._id ? "shadows" : "shadow-md"
                  } rounded-md`}
                >
                  {/* // Show Note Lists. */}
                  <div
                    onClick={() => toggleShowNotes(noteList._id)}
                    className={`flex justify-between cursor-pointer ${
                      expandedNoteId === noteList._id ? "shadows" : "shadow"
                    } py-2 px-2`}
                  >
                    <span className="font-semibold md:text-base text-sm">
                      {noteList.title}
                    </span>
                    <button
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNotes(noteList._id);
                      }}
                      type="button"
                    >
                      <img src={delete_btn} alt="delete-button" />
                    </button>
                  </div>

                  {/* // Show & Edit Notes. */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedNoteId === noteList._id
                        ? "max-h-[1000px] opacity-100 scale-100 px-3 pb-2"
                        : "max-h-0 opacity-0 scale-95 "
                    }`}
                  >
                    {editableNoteId === noteList._id ? (
                      <div className="bg-gray-50 rounded-md p-1 pb-2">
                        {/* Edit Notes Form */}
                        <form
                          onSubmit={handleEditNotes}
                          className="flex flex-col gap-4 md:px-3"
                        >
                          <p>Edit Note.</p>

                          <div className="flex flex-col relative">
                            <label className="text-gray-500 absolute text-xs px-1 bg-white top-[-22%] md:left-[1%] left-[2%]">
                              Title
                            </label>
                            <input
                              type="text"
                              name="title"
                              value={editNotes.title}
                              onChange={handleEditChange}
                              required
                              className="border p-2 rounded border-gray-400"
                            />
                          </div>

                          <div className="flex flex-col relative">
                            <label className="text-gray-500 absolute text-xs px-1 bg-white top-[-14%] md:left-[1%] left-[2%]">
                              Note
                            </label>
                            <textarea
                              name="description"
                              value={editNotes.description}
                              onChange={handleEditChange}
                              required
                              className="border p-2 rounded border-gray-400"
                            />
                          </div>

                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleEdit(noteList)}
                              className="bg-gray-500 md:py-1 p-2 md:px-3 md:w-fit text-white rounded-lg"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="bg-blue-500 md:py-1 p-2 md:px-3 md:w-fit text-white rounded-lg"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        {/* Show Notes. */}
                        <div>
                          <p>{noteList.description}</p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleEdit(noteList);
                          }}
                          className="flex items-start cursor-pointer"
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
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