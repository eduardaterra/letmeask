import { Route, BrowserRouter, Switch } from "react-router-dom";
import NewRoom from "./pages/NewRoom";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";
import Room from "./pages/Room";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
