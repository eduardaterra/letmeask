import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleImg from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import Button from "../components/Button";

const NewRoom = () => {
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
          <form>
            <input type="text" placeholder="Nome da sala" />
          </form>
          <Button>Criar Sala</Button>
          <p>
            Quer entrar em uma sala já existente? <a href="#">clique aqui</a>
          </p>
        </div>
      </main>
    </div>
  );
};
export default NewRoom;
