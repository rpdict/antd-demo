import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from '../../components/login/Login';
import AsideCollapse from '../../components/Navbar/Navbar';


const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>
            (this.props.isAuthenticated ? (<Component {...props} />) : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />))
        }
  />
);

class RouterList extends React.Component {
  render() {
    console.log(this.props);

    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/api" component={AsideCollapse} />
        </Switch>
      </Router>
    );
  }
}

export default RouterList;
