/* eslint-disable no-undef */
import React from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Layout,
} from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import * as axios from 'axios';
import AsideCollapse from '../../components/Navbar/Navbar';
import '../login/Login.css';

const AuthExample = () => (
  <Router>
    <Switch>
      <Route path="/login" component={WrappedLoginForm} />
      <PrivateRoute path="/api" component={AsideCollapse} />
    </Switch>
  </Router>
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

// const AuthButton = withRouter(({ history }) =>
//   (fakeAuth.isAuthenticated ? (
//     <p>
//                 Welcome!{' '}
//       <button
//         onClick={() => {
//                         fakeAuth.signout(() => history.push('/'));
//                     }}
//       >
//                     Sign out
//       </button>
//     </p>
//   ) : (
//     <p>You are not logged in.</p>
//   )));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ))
    }
  />
);

const Content = Layout;

const FormItem = Form.Item;

class Login extends React.Component {
    state = {
      redirectToReferrer: false,
    };

    login = () => {
      fakeAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true });
      });
    };

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          this.fetch(values);
        }
      });
    };

    fetch = (params = {}) => {
      axios({
        method: 'post',
        url: 'http://localhost:8080/login',
        data: {
          ...params,
        },
      }).then((response) => {
        console.log(response);
        if (response.data.result === 'success') {
          localStorage.setItem('token', response.data.data);
          this.login();
        }
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;

      const { from } = this.props.location.state || { from: { pathname: '/api' } };
      const { redirectToReferrer } = this.state;

      if (redirectToReferrer) {
        return <Redirect to={from} />;
      }

      return (
        <Layout>
          <Content>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(<Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                  placeholder="Password"
                />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot">Forgot password</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                </Button>
                        Or <a>register now!</a>
              </FormItem>
            </Form>
          </Content>
        </Layout>
      );
    }
}

const WrappedLoginForm = Form.create()(Login);

export default AuthExample;
