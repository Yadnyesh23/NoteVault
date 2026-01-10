import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreateNote from "./pages/CreateNotePage"
import NoteDetails from "./pages/NoteDetailsPage"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreateNote/>} />
        <Route path="/note/:id" element={<NoteDetails/>} />
      </Routes>
    </>
  )
}

export default App
