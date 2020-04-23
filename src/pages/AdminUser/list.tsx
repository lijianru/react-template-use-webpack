import { Table, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React, { ReactElement, useEffect, useMemo } from 'react';

import { renderLog } from 'utils/log';
import { AppState } from 'store/index';
import { Link } from 'react-router-dom';
import { getAdminUsers } from 'store/actions/adminUserAction';
import { AdminUser } from 'store/reducers/adminUserReducer';

const AdminUserList = (): ReactElement => {
  const dispatch = useDispatch();
  const adminUsers = useSelector((state: AppState) => state.adminUserState.adminUsers);

  useEffect(() => {
    dispatch(getAdminUsers());
  }, [dispatch]);

  renderLog('Admin User List render!!!');
  const columns = useMemo(
    () => [
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
      {
        title: 'Action',
        key: '_id',
        render: ({ _id }: AdminUser): ReactElement => (
          <span>
            <Button>
              <Link to={`/admin-user/${_id}`}>更新</Link>
            </Button>
          </span>
        ),
      },
    ],
    []
  );
  return (
    <Table dataSource={adminUsers} columns={columns} rowKey={(record): string => record._id} />
  );
};

export default AdminUserList;
