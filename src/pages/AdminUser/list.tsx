import { Table } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { renderLog } from 'utils/log';
import { AppState } from 'store/index';
import { getAdminUsers } from 'store/actions/adminUserAction';

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

  renderLog('Admin User List render!!!');
  return (
    <Table dataSource={adminUsers} columns={columns} rowKey={(record): string => record._id} />
  );
};

export default AdminUserList;
