import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import logoDarkModeImg from "../assets/images/logo-dark-mode.svg";
import googleImg from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import Button from "../components/Button";
import { useHistory } from "react-router";
import useAuth from "../hooks/useAuth";
import { FormEvent } from "react";
import { useState } from "react";
import { db } from "../services/firebase";
import useTheme from "../hooks/useTheme";
import ToggleTheme from "../components/ToggleTheme";

const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");
  const { theme } = useTheme();

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  };

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();
    if (roomCode.trim() === "") {
      return;
    }
    const roomRef = await db.ref(`/rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }
    if (roomRef.val().endedAt) {
      alert("Room already closed.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  };

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img src={illustrationImg} alt="Questions and Answer illustration" />
        <strong>Create live Q&amp;A rooms</strong>
        <p>Make it easy for you to interact with your audience!</p>
      </aside>
      <main>
        <ToggleTheme />
        <div className="main-content">
          {theme === "light" ? (
            <img src={logoImg} alt="Letmeask Logo" />
          ) : (
            <img src={logoDarkModeImg} alt="Letmeask Logo" />
          )}
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleImg} alt="Google logo" />
            Create room with Google
          </button>
          <div className="separator">or enter a room</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Enter the room code"
              onChange={(event) => setRoomCode(event.target.value)}
            />
            <Button type="submit">Enter room</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
export default Home;
