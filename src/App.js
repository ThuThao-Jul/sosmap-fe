import './App.css';
import { Route, Router, Switch } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
   <Router>
     <Switch>
       <Route exact path="/dashboard" component={DashboardPage} />
       <Route component={NotFoundPage} />
     </Switch>
   </Router>
  );
}

export default App;
