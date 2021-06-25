import useTheme from "../hooks/useTheme";
import "../styles/toggle-theme.scss";
import sunImg from "../assets/images/sun.svg";
import moonImg from "../assets/images/moon.svg";

const ToggleTheme: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="toggle-container">
      <div className={`toggle-content ${theme}`} onClick={toggleTheme}>
        <img src={sunImg} alt="sun icon represents light mode" />
        <img
          src={moonImg}
          alt="moon icon represents dark mode"
          className="moon"
        />
        <div className={`toggle ${theme}`}></div>
      </div>
    </div>
  );
};

export default ToggleTheme;
