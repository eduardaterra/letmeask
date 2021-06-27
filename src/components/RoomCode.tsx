import copyImg from "../assets/images/copy.svg";
import useTheme from "../hooks/useTheme";
import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
};

const RoomCode = (props: RoomCodeProps) => {
  const { theme } = useTheme();
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(props.code);
  };

  return (
    <button className={`room-code ${theme}`} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copie o Código da Room" />
      </div>
      <span>Sala #{props.code} </span>
    </button>
  );
};

export default RoomCode;
