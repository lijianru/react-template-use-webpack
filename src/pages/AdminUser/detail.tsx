import { useParams } from 'react-router-dom';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { renderLog } from 'utils/log';
import { AppState } from 'store/index';
import { getAdminUserById } from 'store/actions/adminUserAction';

const AdminUserDetail = (): ReactElement => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const adminUser = useSelector((state: AppState) => state.adminUserState.adminUser);

  useEffect(() => {
    id && dispatch(getAdminUserById(id));
  }, [dispatch, id]);

  renderLog('Admin User Detail render!!!');
  return (
    <>
      <h1>{id}</h1>
      <h3>username: {adminUser.username}</h3>
    </>
  );
};

export default AdminUserDetail;
