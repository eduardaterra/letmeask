import { useHistory, useParams } from "react-router-dom";

import useRoom from "../hooks/useRoom";
import { RoomParams } from "./Room";
import logoImg from "../assets/images/logo.svg";
import RoomCode from "../components/RoomCode";
import Button from "../components/Button";
import Question from "../components/Question";
import { db } from "../services/firebase";
import answerImg from "../assets/images/answer.svg";
import useTheme from "../hooks/useTheme";
import ToggleTheme from "../components/ToggleTheme";
import logoDarkModeImg from "../assets/images/logo-dark-mode.svg";

const AdminRoom = () => {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const { theme } = useTheme();

  const handleEndRoom = async () => {
    db.ref(`rooms/${roomId}`).update({ endedAt: new Date() });
    history.push("/");
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm("Tem certeza que deseja deletar essa pergunta?")) {
      await db.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
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
    <div id="page-room" className={theme}>
      <header>
        <div className="content">
          {theme === "light" ? (
            <img src={logoImg} alt="Letmeask Logo" />
          ) : (
            <img src={logoDarkModeImg} alt="Letmeask Logo" />
          )}
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
            <ToggleTheme />
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="delete-img"
                  >
                    <path
                      d="M3 5.99988H5H21"
                      stroke="#737380"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z"
                      stroke="#737380"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
};
export default AdminRoom;
