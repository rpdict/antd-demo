import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AsideCollapse from './components/Navbar/Navbar';
// import UserTable from './components/UserTable/UserTable';
// import WrappedRegistrationForm from './components/UserInput/UserInput';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  (
    <Router>
      <AsideCollapse />
      {/* <div> */}
      {/* <Route exact path="/" component={AsideCollapse} /> */}
      {/* <Route path="/inbox" component={UserTable} /> */}
      {/* <Route path="/about" component={WrappedRegistrationForm} /> */}
      {/* </div> */}
    </Router>
  ), document.getElementById('root'),
);

// ReactDOM.render(<AsideCollapse />, document.getElementById('root'));

// ReactDOM.render(<UserTable />, document.getElementById('root'));

// ReactDOM.render(<WrappedRegistrationForm />, document.getElementById('root'));


registerServiceWorker();
