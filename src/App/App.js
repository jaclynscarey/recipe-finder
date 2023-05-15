import "./App.css";
import NavBar from '../components/NavBar/NavBar'
import ResultsPage from "../pages/ResultsPage/ResultsPage";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          
        </Routes>
        <ResultsPage />
      </main>
    </>
  )
}
