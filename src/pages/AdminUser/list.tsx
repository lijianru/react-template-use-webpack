import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';

import { getAdminUsers } from 'store/actions/adminUserAction';
import { AppState } from 'store/index';

const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
];

const AdminUserList = (): ReactElement => {
  const dispatch = useDispatch();
  const adminUsers = useSelector((state: AppState) => state.adminUserState.adminUsers);

  useEffect(() => {
    dispatch(getAdminUsers());
  }, [dispatch]);

  return (
    <Table dataSource={adminUsers} columns={columns} rowKey={(record): string => record._id} />
  );
};

export default AdminUserList;
