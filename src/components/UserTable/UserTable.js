import { Table } from 'antd';
import reqwest from 'reqwest';
import React from 'react';
import './UserTable.css';

// const columns = [{
//   title: 'Id',
//   dataIndex: 'id',
//   sorter: true,
// }, {
//   title: 'Email',
//   dataIndex: 'email',
// }, {
//   title: 'Name',
//   dataIndex: 'name',
// }];

class UserTable extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      results: 10,
      page: 1,
    };
    this.columns = [{
      title: 'Id',
      dataIndex: 'id',
      sorter: true,
    }, {
      title: 'Email',
      dataIndex: 'email',
    }, {
      title: 'Name',
      dataIndex: 'name',
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
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    }

    fetch = (params = {}) => {
      console.log('params:', params);
      this.setState({ loading: true });
      reqwest({
        url: 'http://10.2.4.18:8080/demo/all',
        method: 'get',
        data: {
          results: 10,
          ...params,
        },
        type: 'json',
      }).then((data) => {
        const pagination = { ...this.state.pagination };
        pagination.total = data.results.totalElements;
        this.setState({
          loading: false,
          data: data.results.content,
          pagination,
        });
      });
    }

    render() {
      return (
        <div>
          <Table
            columns={this.columns}
            rowKey="id"
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
