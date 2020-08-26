import React from 'react';
import styles from './styles.module.css';

const Loader = (props) => (
  <div className={styles.overlay}>
    <div className={styles.loader}></div>
    <div className={styles.loaderLabel}>Please wait...</div>
  </div>
);

export default Loader;