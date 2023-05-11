import React, { useState } from "react";
import { useNoteContext } from "../components/NoteContext";

type NoteListItemProps = {
  note: {
    title: string;
    body: string;
    id: number;
  };
  color: string;
  onSelectNote: (id: number) => void;
  onDeleteNote: (id: number) => void;
};

const NoteListItem: React.FC<NoteListItemProps> = ({
  note,
  onSelectNote,
  onDeleteNote,
  color,
}) => {
  return (
    <div
      className={`${color} border-2 w-full rounded-lg p-4 m-2 cursor-pointer`}
      onClick={() => onSelectNote(note.id)}
    >
      <div className="font-bold text-lg mb-2">{note.title}</div>
      <div className="text-gray-700">{note.body.slice(0, 50)}</div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => onDeleteNote(note.id)}
      >
        Delete
      </button>
    </div>
  );
};

const NotesList: React.FC = () => {
  const { notes, addNote, deleteNote, editNote } = useNoteContext();
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newNoteMode, setNewNoteMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectNote = (id: number) => {
    setSelectedNoteId(id);
    setIsEditing(false);
  };

  const handleDeleteNote = (id: number) => {
    deleteNote(id);
    setSelectedNoteId(null);
  };

  const handleEditNote = (id: number, title: string, body: string) => {
    editNote(id, title, body);
    setIsEditing(false);
  };

  const handleCreateNote = (title: string, body: string) => {
    addNote({ title, body, id: Date.now() });
    setSelectedNoteId(null);
    setNewNoteMode(false);
  };

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const colors = [
    "bg-green-200",
    "bg-blue-200",
    "bg-purple-200",
    "bg-red-200",
    "bg-yellow-200",
    "bg-pink-200",
    "bg-indigo-200",
    "bg-teal-200",
    "bg-cyan-200",
    "bg-amber-200",
    "bg-lime-200",
    "bg-orange-200",
    "bg-fuchsia-200",
    "bg-emerald-200",
    "bg-emerald-400",
    "bg-violet-400",
  ];

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex justify-between w-full mb-4 px-8">
        <div className="text-3xl font-bold">Notes</div>
        <button
          className="bg-[#b45309] hover:bg-[#f59e0b] text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setNewNoteMode(true)}
        >
          New Note &nbsp; +
        </button>
      </div>
      {newNoteMode ? (
        <div className="bg-[#E8DFCA] w-5/12 h-1/6 border-2 border-gray-200 rounded-lg p-4 m-2">
          <h3 className="text-black font-bold text-2xl text-center mb-4">
            Add A New Note
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateNote(
                (
                  e.currentTarget.elements.namedItem(
                    "title"
                  ) as HTMLInputElement
                ).value,
                (e.currentTarget.elements.namedItem("body") as HTMLInputElement)
                  .value
              );
            }}
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="block mb-4 w-full p-2 border rounded-lg border-gray-300 bg-white text-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontSize: "1.2rem" }}
            />
            <textarea
              name="body"
              placeholder="Body"
              className="block mb-4 w-full p-2 border rounded-lg border-gray-300 bg-white text-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontSize: "1.2rem" }}
            ></textarea>
            <div className="flex justify-end ">
              <button
                className="
                bg-[#b45309] hover:bg-[#f59e0b] text-white font-bold py-2 px-8 rounded-full mr-2"
                type="submit"
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-8 rounded-full"
                onClick={() => setNewNoteMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-gray-100 border-2 border-gray-200 rounded-lg p-4 m-2 w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search notes..."
            className="block w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredNotes.length > 0 ? (
            <div className="flex flex-wrap">
              {filteredNotes.map((note) => (
                <div className="w-full md:w-1/3  p-2">
                  <NoteListItem
                    key={note.id}
                    note={note}
                    color={colors[Math.floor(Math.random() * colors.length)]}
                    onSelectNote={handleSelectNote}
                    onDeleteNote={handleDeleteNote}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-700 text-center">
              No notes found. Try a different search term.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesList;
