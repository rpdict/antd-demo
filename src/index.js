import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AsideCollapse from './components/Navbar/Navbar';
// import WrappedRegistrationForm from './components/UserInput/UserInput';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AsideCollapse />, document.getElementById('root'));

// ReactDOM.render(<WrappedRegistrationForm />, document.getElementById('root'));


registerServiceWorker();
