/* eslint-disable no-underscore-dangle,no-undef */
import { Table } from 'antd';
import * as axios from 'axios';
import React from 'react';
import './BlogTable.css';

class BlogTable extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      data: [],
      pagination: {
        pageSize: 10,
      },
      loading: false,
      page: 0,
    };
    this.columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        sorter: true,
        width: '10%',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        width: '20%',
      }, {
        title: 'Content',
        dataIndex: 'content',
        width: '20%',
      }];
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillReceiveProps() {
    this.fetch({
      size: this.state.size,
      page: this.state.page,
      sort: this.state.sort,
      filters: this.state.filters,
    });
  }

    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
        size: pagination.pageSize,
        page: pagination.current - 1,
        sort: `${sorter.field},desc`,
        ...filters,
      });
      this.fetch({
        size: pagination.pageSize,
        page: pagination.current - 1,
        sort: `${sorter.field},desc`,
        ...filters,
      });
    };

    fetch = (params = {}) => {
      this.setState({ loading: true });
      axios({
        method: 'get',
        url: 'http://localhost:8080/api/blogs',
        data: {
          size: this.state.pagination.pageSize,
          ...params,
        },
        headers: {
          authorization: sessionStorage.getItem('token'),
        },
      }).then((response) => {
        // console.log(response);
        const pagination = { ...this.state.pagination };
        pagination.total = response.data.page.totalElements;
        this.setState({
          loading: false,
          data: response.data._embedded.blogs,
          pagination,
        });
      });
    };

    render() {
      return (
        <div>
          <Table
            columns={this.columns}
            rowKey={record => record.id}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </div>
      );
    }
}

export default BlogTable;
