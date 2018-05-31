import { Form, Icon, Input, Button, Checkbox, Layout } from 'antd';
import React from 'react';
import reqwest from 'reqwest';
import './Login.css';

const Content = Layout;

const FormItem = Form.Item;

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

const AuthButton = withRouter(({ history }) =>
  (fakeAuth.isAuthenticated ? (
    <p>
                Welcome!{' '}
      <button
        onClick={() => {
                        fakeAuth.signout(() => history.push('/'));
                    }}
      >
                    Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )));

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

class NormalLoginForm extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      redirectToReferrer: false,
    };
  }


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
      reqwest({
        url: 'http://localhost:8080/login',
        method: 'post',
        data: {
          ...params,
        },
        type: 'json',
      }).then((data) => {
        console.log(data);
        if (data.result === 'success') {
          // this.state.isAuthenticated = true;
          // this.authenticate();
        }
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;

      if (this.state.redirectToReferrer) {
        return <Redirect to={from} />;
      }
      return (
        <Layout>
          <Content>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('userName', {
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

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
