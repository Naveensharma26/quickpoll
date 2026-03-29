import { BrowserRouter, Route, Router, Routes } from "react-router";
import "./App.css";
import CreatePollButton from "./components/CreatePollButton";
import CreatePollPopup from "./components/CreatePollPopup";
import Header from "./components/Header";
import LoginInput from "./components/LoginInput";
import Home from "./pages/Home";
import CreatePoll from "./pages/CreatePoll";
import Result from "./pages/SharePoll";
import PollResult from "./pages/PollResult";
import SharePoll from "./pages/SharePoll";
import PollVote from "./pages/PollVote";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/createpoll" element={<CreatePoll />} />
        <Route path="/sharePoll" element={<SharePoll />} />
        <Route path="/pollResult/:id" element={<PollResult />} />
        <Route path="/pollvote/:id" element={<PollVote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
