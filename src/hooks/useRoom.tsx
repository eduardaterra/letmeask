import { useEffect, useState } from "react";
import { db } from "../services/firebase";

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
  }
>;

const useRoom = (roomId: string) => {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = db.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  return { questions, title };
};
export default useRoom;
