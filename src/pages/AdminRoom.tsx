import { useHistory, useParams } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import useRoom from "../hooks/useRoom";
import { RoomParams } from "./Room";
import logoImg from "../assets/images/logo.svg";
import RoomCode from "../components/RoomCode";
import Button from "../components/Button";
import Question from "../components/Question";
import deleteImg from "../assets/images/delete.svg";
import { db } from "../services/firebase";
import answerImg from "../assets/images/answer.svg";

const AdminRoom = () => {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  const handleEndRoom = async () => {
    db.ref(`rooms/${roomId}`).update({ endedAt: new Date() });
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm("Tem certeza que deseja deletar essa pergunta?")) {
      await db.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
    history.push("/");
  };

  const handleCheckedQuestion = async (questionId: string) => {
    await db.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  };

  const handleHighlightedQuestion = async (questionId: string) => {
    await db.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask logo" />
          <div>
            <RoomCode code={roomId} />

            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
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
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              <button
                type="button"
                onClick={() => {
                  handleCheckedQuestion(question.id);
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="check-img"
                >
                  <circle
                    cx="12.0003"
                    cy="11.9998"
                    r="9.00375"
                    stroke="#737380"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193"
                    stroke="#737380"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      handleHighlightedQuestion(question.id);
                    }}
                  >
                    <img src={answerImg} alt="Dar destaque a pergunta" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => {
                  handleDeleteQuestion(question.id);
                }}
              >
                <img src={deleteImg} alt="remover pergunta" />
              </button>
            </Question>
          );
        })}
      </main>
    </div>
  );
};
export default AdminRoom;
