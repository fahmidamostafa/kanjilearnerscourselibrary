import React from 'react';
import styles from './styles.module.css';

const Header = (props) => (
  <div className={styles.header}>
    <div className={styles.container}>
      <h1
        className={styles.mainHeading}
        onClick={() => window.location.reload()}>
        Kanji Learner's Course Library
      </h1>
      <h2
        className={styles.subHeading}>
        A companion website to Andrew Scott Conning's &laquo; Kodansha Kanji Learner's Guide: A Step-by-Step Guide to Mastering 2300 Characters <i className="far fa-copyright" /> &raquo;
      </h2>
    </div>
    <div className={styles.socialLinks}>
      <ul>
        <li key="github">
          <a
            href="https://github.com/fahmidamostafa/kanjilearnerscourselibrary"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fas fa-code" />
          </a>
        </li>
        <li key="portfolio">
          <a
            href="http://www.fahmidamostafa.com/"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fas fa-briefcase" />
          </a>
        </li>
        <li key="linkedin">
          <a
            href="https://www.linkedin.com/in/fahmida-mostafa-2a465789/"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-linkedin" />
          </a>
        </li>
        <li key="email">
          <form action="mailto:fahmida.mostafa@gmail.com">
            <button>
              <i className="fas fa-envelope" />
            </button>
          </form>
        </li>
        <li
          key="credits"
          className={styles.credits}>
          <div className={styles.preHover}>
            <i className="far fa-copyright" />          
          </div>
          <div className={styles.postHover}>
            <p>© 2020 Fahmida Mostafa</p>
            <p>Original course property of Andrew Scott Conning</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
);

export default Header;