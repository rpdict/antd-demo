/* eslint-disable no-underscore-dangle */
import { Table } from 'antd';
import reqwest from 'reqwest';
import React from 'react';
import './UserTable.css';

class UserTable extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      results: 10,
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
        title: 'Email',
        dataIndex: 'email',
        width: '20%',
      }, {
        title: 'Name',
        dataIndex: 'name',
        width: '20%',
      }];
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillReceiveProps() {
    this.fetch({
      results: this.state.results,
      page: this.state.page,
      sortField: this.state.sortField,
      sortOrder: this.state.sortOrder,
      filters: this.state.filters,
    });
  }

    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
        results: pagination.pageSize,
        page: pagination.current - 1,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current - 1,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    }

    fetch = (params = {}) => {
      this.setState({ loading: true });
      reqwest({
        url: 'http://10.2.4.18:8080/api/users',
        method: 'get',
        data: {
          size: 10,
          ...params,
        },
        type: 'json',
      }).then((data) => {
        const pagination = { ...this.state.pagination };
        pagination.total = data.page.totalElements;
        this.setState({
          loading: false,
          data: data._embedded.users,
          pagination,
        });
      });
    }

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

export default UserTable;
