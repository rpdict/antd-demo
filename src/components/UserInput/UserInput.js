import { Form, Input, Button } from 'antd';
import React from 'react';
import reqwest from 'reqwest';
import './UserInput.css';


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
    }

    fetch = (params = {}) => {
      // console.log('params:', params);
      reqwest({
        url: 'http://10.2.4.18:8080/demo/add',
        method: 'get',
        data: {
          ...params,
        },
        type: 'json',
      }).then((data) => {
        if (data.results === 'success') {
          this.props.onSubmitForm();
        }
      }).catch((error) => {
        console.log(`error: ${error}`);
      });
    }

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
            label="Email"
            hasFeedback
          >
            {getFieldDecorator('email', {
                      rules: [{
                          type: 'email', message: 'The input is not valid E-mail!',
                      }, {
                          required: true, message: 'Please input your E-mail!',
                      }],
                  })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Name"
            hasFeedback
          >
            {getFieldDecorator('name', {
                      rules: [{
                          required: true, message: 'Please input your Name!',
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

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
