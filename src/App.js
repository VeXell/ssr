import React from 'react';
import styles from './App.css';
import stylesIndex from './index.css';
import withStyles from 'isomorphic-style-loader/withStyles';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src="/public/assets/logo.svg" className={styles.AppLogo} />
        <p>
          Edit! <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={styles.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          onClick={event => {
            event.preventDefault();
            alert('123');
          }}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withStyles(stylesIndex, styles)(App);
