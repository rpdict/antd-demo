import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import AsideCollapse from './components/Navbar/Navbar';
import Login from './components/login/Login';
// import UserTable from './components/UserTable/UserTable';
// import WrappedRegistrationForm from './components/UserInput/UserInput';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/api" component={AsideCollapse} />
      </Switch>
    </Router>
  ), document.getElementById('root'),
);

// ReactDOM.render(<AsideCollapse />, document.getElementById('root'));

// ReactDOM.render(<UserTable />, document.getElementById('root'));

// ReactDOM.render(<WrappedRegistrationForm />, document.getElementById('root'));


registerServiceWorker();
