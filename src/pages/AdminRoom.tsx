import { useParams } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import useRoom from "../hooks/useRoom";
import { RoomParams } from "./Room";
import logoImg from "../assets/images/logo.svg";
import RoomCode from "../components/RoomCode";
import Button from "../components/Button";
import Question from "../components/Question";

const AdminRoom = () => {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask logo" />
          <div>
            <RoomCode code={roomId} />

            <Button isOutlined>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        {questions.map((question) => {
          return (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            />
          );
        })}
      </main>
    </div>
  );
};
export default AdminRoom;
