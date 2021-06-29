import { Link, useHistory } from "react-router-dom";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import "../styles/auth.scss";
import Button from "../components/Button";
import { FormEvent } from "react";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { db } from "../services/firebase";
import useTheme from "../hooks/useTheme";
import ToggleTheme from "../components/ToggleTheme";
import logoDarkMode from "../assets/images/logo-dark-mode.svg";

const NewRoom = () => {
  const [newRoom, setNewRoom] = useState("");
  const { user } = useAuth();
  const history = useHistory();
  const { theme } = useTheme();

  const handleCreateNewRoom = async (event: FormEvent) => {
    event.preventDefault();
    if (newRoom.trim() === "") {
      return;
    }
    const roomRef = db.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  };

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Create live Q&amp;A rooms</strong>
        <p>Make it easy for you to interact with your audience!</p>
      </aside>
      <main>
        <ToggleTheme />
        <div className="main-content">
          {theme === "light" ? (
            <img src={logoImg} alt="Letmeask Logo" />
          ) : (
            <img src={logoDarkMode} alt="Letmeask Logo Dark Mode" />
          )}

          <h2>Create a new room</h2>

          <form onSubmit={handleCreateNewRoom}>
            <input
              type="text"
              placeholder="Room name"
              onChange={(event) => setNewRoom(event.target.value)}
            />
            <Button type="submit">Create Room</Button>
          </form>

          <p>
            Do you want to enter in an already existing room?{" "}
            <Link to="/">click here</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
export default NewRoom;
