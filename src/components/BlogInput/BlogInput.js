/* eslint-disable no-undef */
import { Form, Input, Button } from 'antd';
import React from 'react';
import * as axios from 'axios';
import './BlogInput.css';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
    };
  }
  componentDidMount() {
    // this.props.onSubmitForm();
  }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.fetch(values);
        }
      });
    };

    fetch = (params = {}) => {
      axios({
        method: 'post',
        url: 'http://localhost:8080/api/blogs',
        data: {
          ...params,
        },
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      }).then((response) => {
        console.log(response);
        if (response.status === 201) {
          this.props.onSubmitForm();
        }
      }).catch((error) => {
        console.log(`error: ${error}`);
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 14,
            offset: 6,
          },
        },
      };

      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="Title"
            hasFeedback
          >
            {getFieldDecorator('title', {
                      rules: [{
                          required: true, message: 'Please input your Title!',
                      }],
                  })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Content"
            hasFeedback
          >
            {getFieldDecorator('content', {
                      rules: [{
                          required: true, message: 'Please input your Content!',
                      }],
                  })(<Input />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">提交</Button>
          </FormItem>
        </Form>
      );
    }
}

const AuthForm = Form.create()(RegistrationForm);

export default AuthForm;
