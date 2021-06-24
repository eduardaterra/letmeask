import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleImg from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import Button from "../components/Button";
import { useHistory } from "react-router";
import useAuth from "../hooks/useAuth";
import { FormEvent } from "react";
import { useState } from "react";
import { db } from "../services/firebase";

const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

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

    history.push(`/rooms/${roomCode}`);
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
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleImg} alt="Google logo" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onChange={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
            />
          </form>
          <Button type="submit">Entrar na sala</Button>
        </div>
      </main>
    </div>
  );
};
export default Home;
