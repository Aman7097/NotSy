import React, { useState, useContext } from "react";
import { NoteContext } from "./NoteContext";

const AddNotes: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { addNote } = useContext(NoteContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNote({
      title,
      body,
      id: Date.now(),
    });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Note"
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNotes;
