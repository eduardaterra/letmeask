import { ReactNode } from "react";
import "../styles/questions.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

const Question = ({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) => {
  return (
    <div className="question-list">
      <div
        className={`question ${isAnswered ? "answered" : ""}${
          isHighlighted && !isAnswered ? "highlighted" : ""
        }`}
      >
        <p>{content}</p>
        <footer>
          <div className="user-info">
            <img src={author.avatar} alt={`${author.name} avatar`} />
            <span>{author.name}</span>
          </div>
          <div>{children}</div>
        </footer>
      </div>
    </div>
  );
};
export default Question;
