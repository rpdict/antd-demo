import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TableTest from './TableTest';
import AsideCollapse from './Navbar';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<TableTest />, document.getElementById('root'));

ReactDOM.render(<AsideCollapse />, document.getElementById('root'));

registerServiceWorker();
