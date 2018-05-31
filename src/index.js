import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterList from './components/router/RouterList';
// import UserTable from './components/UserTable/UserTable';
// import WrappedRegistrationForm from './components/UserInput/UserInput';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RouterList />, document.getElementById('root'));

// ReactDOM.render(<AsideCollapse />, document.getElementById('root'));

// ReactDOM.render(<UserTable />, document.getElementById('root'));

// ReactDOM.render(<WrappedRegistrationForm />, document.getElementById('root'));


registerServiceWorker();
