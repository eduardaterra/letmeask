import { Route, BrowserRouter } from "react-router-dom";
import NewRoom from "./pages/NewRoom";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
