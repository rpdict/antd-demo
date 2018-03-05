import { Table } from 'antd';
import reqwest from 'reqwest';
import * as React from 'react';
import './UserTable.css';

const columns = [{
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

class UserTable extends React.Component {
    state = {
      data: [],
      pagination: {},
      loading: false,
    };

    componentDidMount() {
      this.fetch();
    }

    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
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
        // Read total count from server
        pagination.total = data.results.totalElements;
        // pagination.total = 200;
        this.setState({
          loading: false,
          data: data.results.content,
          pagination,
        });
      });
    }

    render() {
      return (
        <Table
          columns={columns}
          rowKey="id"
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      );
    }
}

export default UserTable;
