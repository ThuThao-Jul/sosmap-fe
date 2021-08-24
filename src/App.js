import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
