import React from 'react';
import styles from './styles.module.css';

const SubHeader = (props) => (
  <div className={styles.topContainer}>
    {props.page !== 1 && (
      <button
        className={styles.goBackButton}
        onClick={props.goBack}>
        <i className="fas fa-angle-double-left" />
        Go Back
      </button>
    )}
    <div className={styles.headingContainer}>
      {props.page === 1 ? (
        <h3 className={styles.courseTitle}>{props.courseTitle}</h3>
      ) : (
        <>
          <h3 className={styles.courseTitle}>{props.courseTitle}:</h3>
          <h4 className={styles.lessonTitle}>{props.lessonTitle}</h4>        
        </>
      )}
    </div>
  </div>
);

export default SubHeader;