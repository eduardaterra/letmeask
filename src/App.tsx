import { Route, BrowserRouter, Switch } from "react-router-dom";
import NewRoom from "./pages/NewRoom";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";
import Room from "./pages/Room";
import { ThemeProvider } from "./contexts/ThemeContext";
import AdminRoom from "./pages/AdminRoom";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
