import React from "react";
import { NoteContextProvider } from "./components/NoteContext";
import NotesList from "./pages/NotesList";

const App: React.FC = () => {
  return (
    <NoteContextProvider>
      <div className="App">
        <div className="sticky top-0 bg-[#ea580c] py-6 text-center">
          <h3 className="font-bold text-4xl">Note Taking App</h3>
        </div>

        <NotesList />
      </div>
    </NoteContextProvider>
  );
};

export default App;
