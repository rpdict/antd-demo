import React from 'react';

function requireAuthentication(Component) {
  // 组件有已登陆的模块 直接返回 (防止从新渲染)
  if (Component.AuthenticatedComponent) {
    return Component.AuthenticatedComponent;
  }

  // 创建验证组件
  class AuthenticatedComponent extends React.Component {
        static contextTypes = {
          router: React.PropTypes.object.isRequired,
        };

        state = {
          login: true,
        };

        componentWillMount() {
          this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
          this.checkAuth();
        }

        checkAuth() {
          // 判断登陆
          const token = this.props.token;
          const login = token ? token.login : null;


          // 未登陆重定向到登陆页面
          if (!login) {
            const redirect = this.props.location.pathname + this.props.location.search;
            this.context.router.push(`/login?message=401&redirect_uri=${encodeURIComponent(redirect)}`);
            return;
          }

          this.setState({ login });
        }

        render() {
          if (this.state.login) {
            return <Component {...this.props} />;
          }
          return '';
        }
  }

  // 不使用 react-redux 的话直接返回
  //   const AuthenticatedComponent = AuthenticatedComponent;
  export default AuthenticatedComponent;
}
