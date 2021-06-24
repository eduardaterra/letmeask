import { Link, useHistory } from "react-router-dom";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import "../styles/auth.scss";
import Button from "../components/Button";
import { FormEvent } from "react";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { db } from "../services/firebase";

const NewRoom = () => {
  const [newRoom, setNewRoom] = useState("");
  const { user } = useAuth();
  const history = useHistory();

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

    history.push(`/rooms/${firebaseRoom.key}`);
  };

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask Logo" />
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
