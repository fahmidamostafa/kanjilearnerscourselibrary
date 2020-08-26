import React from 'react';
import styles from './styles.module.css';

const CharToggle = (props) => (
  <div className={styles.charToggle}>
    <div className={styles.buttonsContainer}>
      <button
        className={styles.smallSquareButton}
        disabled={props.isPrevDisabled}
        onClick={() => props.onNavigateCharacter(-1)}>
        <i className="fas fa-chevron-left" />
      </button>
      <button
        className={styles.smallSquareButton}
        disabled={props.isNextDisabled}
        onClick={() => props.onNavigateCharacter(1)}>
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  </div>
);

export default CharToggle;