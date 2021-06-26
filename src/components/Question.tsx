import "../styles/questions.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
};

const Question = ({ content, author }: QuestionProps) => {
  return (
    <div className="question-list">
      <div className="question">
        <p>{content}</p>
        <footer>
          <div className="user-info">
            <img src={author.avatar} alt={`${author.name} avatar`} />
            <span>{author.name}</span>
          </div>
          <div></div>
        </footer>
      </div>
    </div>
  );
};
export default Question;
