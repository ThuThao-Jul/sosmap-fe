import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Router>
      <DashboardPage />
      <Switch>
        {/* <Route exact path="/" component={DashboardPage} /> */}
        {/* <Route exact path="/ticketsList" component={TicketsList} />
          <Route exact path="/itemsType" component={PieChart} />
          <Route exact path="/ticketsDistrict" component={PieChartStatus}/>
          <Route exact path="/ticketsStatus" component={BarChart} />
          <Route exact path="/ticketsDate" component={LineChart} /> */}
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </Router>
  );
}

export default App;
