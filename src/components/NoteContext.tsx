import React, { createContext, useContext, useState } from "react";

type Note = {
  title: string;
  body: string;
  id: number;
};

type NoteContextType = {
  notes: Note[];
  addNote: (note: { title: string; body: string; id: number }) => void;
  deleteNote: (id: number) => void;
  editNote: (id: number, title: string, body: string) => void;
};

const initialNotes: Note[] = [];

export const NoteContext = createContext<NoteContextType>({
  notes: initialNotes,
  addNote: () => {},
  deleteNote: () => {},
  editNote: () => {},
});

type NoteContextProviderProps = {
  children: React.ReactNode;
};

export const NoteContextProvider: React.FC<NoteContextProviderProps> = ({
  children,
}) => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const addNote = (note: { title: string; body: string }) => {
    setNotes([
      ...notes,
      { title: note.title, body: note.body, id: Date.now() },
    ]);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id: number, title: string, body: string) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, title, body };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => useContext(NoteContext);
