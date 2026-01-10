import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateNote from "./pages/CreateNotePage";
import NoteDetails from "./pages/NoteDetailsPage";
// import toast from "react-hot-toast"

function App() {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/note/:id" element={<NoteDetails />} />
      </Routes>
    </div>
  );
}

export default App;
