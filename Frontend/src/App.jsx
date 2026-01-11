import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateNote from "./pages/CreateNotePage";
import NoteDetails from "./pages/NoteDetailsPage";

function App() {
  return (
    <div className="relative min-h-screen w-full">
      
      {/* Background */}
     <div className="absolute inset-0 -z-10 h-full w-full px-5 py-24
        [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]
      " /> 
      

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/notes/:id" element={<NoteDetails />} />
      </Routes>
    </div>
  );
}

export default App;
