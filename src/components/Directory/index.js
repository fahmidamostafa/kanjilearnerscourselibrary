import React from 'react';
import styles from './styles.module.css';

const Directory = (props) => {
  if (props.page === 1) {
    return (
      <ul className={`${styles.charGrid} ${styles.lessonDirectory}`}>
        {props.currentList.map((item, index) => (
          <li key={index}>
            <button
              className={styles.largeSquareButton}
              onClick={() => props.goForward(index)}>
              {item}
            </button>
          </li>
        ))}
      </ul>
    );
  }
  if (props.page === 2) {
    return (
      <ul className={`${styles.charGrid} ${styles.charDirectory}`}>
        {props.currentList.map((item, index) => (
          <li key={item.id}>
            <div className={styles.outerContainer}>
              <button
                className={styles.largeSquareButton}
                title={item.meaning}
                onClick={() => props.goForward(index)}>
                <div className={styles.label}>{item.character}</div>
                <div className={styles.id}>{item.id}</div>
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default Directory;