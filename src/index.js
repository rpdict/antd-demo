import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AsideCollapse from './components/Navbar/Navbar';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AsideCollapse />, document.getElementById('root'));

registerServiceWorker();
