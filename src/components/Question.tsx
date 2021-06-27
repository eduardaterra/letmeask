import { ReactNode } from "react";
import useTheme from "../hooks/useTheme";
import "../styles/questions.scss";
import cx from "classnames";

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
  const { theme } = useTheme();
  return (
    <div
      className={cx(
        `question ${theme}`,
        {
          [`answered-${theme}`]: isAnswered,
        },
        { [`highlighted-${theme}`]: isHighlighted }
      )}
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
  );
};
export default Question;
