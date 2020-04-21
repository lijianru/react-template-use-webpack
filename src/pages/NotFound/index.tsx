import React, { ReactElement } from 'react';
import styles from './styles.scss';

const NotFound = (): ReactElement => (
  <div className={styles.container}>
    <h2>404 Not Found!</h2>
  </div>
);

export default NotFound;
