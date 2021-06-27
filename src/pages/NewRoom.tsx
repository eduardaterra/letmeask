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
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>
      <main>
        <ToggleTheme />
        <div className="main-content">
          {theme === "light" ? (
            <img src={logoImg} alt="Letmeask Logo" />
          ) : (
            <img src={logoDarkMode} alt="Letmeask Logo Dark Mode" />
          )}

          <h2>Crie uma nova sala</h2>

          <form onSubmit={handleCreateNewRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar Sala</Button>
          </form>

          <p>
            Quer entrar em uma sala já existente?{" "}
            <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
export default NewRoom;
